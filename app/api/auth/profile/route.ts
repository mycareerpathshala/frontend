import { getSession, signSession, SESSION_COOKIE_OPTIONS } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── GET /api/auth/profile ─────────────────────────────────────────────────────

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const [user] = await db
            .select({
                id:             users.id,
                firstName:      users.firstName,
                lastName:       users.lastName,
                email:          users.email,

                avatar:         users.avatar,
                phone:          users.phone,
                dateOfBirth:    users.dateOfBirth,
                gender:         users.gender,
                country:        users.country,
                secondaryEmail:       users.secondaryEmail,
                userType:             users.userType,
                preferredStudyLevel:  users.preferredStudyLevel,
                isVerified:           users.isVerified,
                createdAt:      users.createdAt,
            })
            .from(users)
            .where(eq(users.id, session.userId))
            .limit(1);

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        return NextResponse.json({ data: user });
    } catch (err) {
        console.error('[profile GET]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── PATCH /api/auth/profile ───────────────────────────────────────────────────

export async function PATCH(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json() as {
            firstName?:           string;
            lastName?:            string;
            phone?:               string | null;
            dateOfBirth?:         string | null;
            gender?:              string | null;
            country?:             string | null;
            secondaryEmail?:      string | null;
            preferredStudyLevel?: string | null;
            userType?:            'student' | 'parent' | 'general';
            avatar?:              string;
        };

        // Build update object with only the fields that were explicitly provided
        const update: Record<string, unknown> = {};
        if (body.firstName           !== undefined) update.firstName           = body.firstName.trim();
        if (body.lastName            !== undefined) update.lastName            = body.lastName.trim();
        if ('phone'               in body) update.phone               = body.phone               || null;
        if ('dateOfBirth'         in body) update.dateOfBirth         = body.dateOfBirth         || null;
        if ('gender'              in body) update.gender              = body.gender              || null;
        if ('country'             in body) update.country             = body.country             || null;
        if ('secondaryEmail'      in body) update.secondaryEmail      = body.secondaryEmail      || null;
        if ('preferredStudyLevel' in body) update.preferredStudyLevel = body.preferredStudyLevel || null;
        if (body.userType            !== undefined) update.userType            = body.userType;
        if (body.avatar              !== undefined) update.avatar              = body.avatar;

        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        const [updated] = await db
            .update(users)
            .set(update)
            .where(eq(users.id, session.userId))
            .returning();

        if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        // Re-issue session JWT so session-stored fields (name, avatar) stay fresh
        const newToken = await signSession({
            userId:    updated.id,
            firstName: updated.firstName,
            lastName:  updated.lastName,
            email:     updated.email,
            avatar:    updated.avatar,
        });

        const response = NextResponse.json({
            success: true,
            data: {
                firstName: updated.firstName,
                lastName:  updated.lastName,
                avatar:    updated.avatar,
            },
        });
        response.cookies.set(SESSION_COOKIE_OPTIONS.name, newToken, SESSION_COOKIE_OPTIONS);
        return response;
    } catch (err) {
        console.error('[profile PATCH]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
