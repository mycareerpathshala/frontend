import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { preferences } from '@/assets/lib/database/schema';
import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── GET /api/user/preferences ─────────────────────────────────────────────────

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const prefs = await db
            .select()
            .from(preferences)
            .where(eq(preferences.userId, session.userId))
            .orderBy(desc(preferences.createdAt));

        return NextResponse.json({ data: prefs });
    } catch (err) {
        console.error('[preferences GET]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── POST /api/user/preferences ────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json() as {
            name?: string;
            countryFilter?: string | null;
            countryName?: string | null;
            streamFilter?: string | null;
            streamName?: string | null;
            levelFilter?: string | null;
            deliveryMethodFilter?: string | null;
            studyLanguageFilter?: string | null;
            courseOfferingFilter?: string | null;
        };

        const name = body.name?.trim() || 'My Preference';

        const [created] = await db
            .insert(preferences)
            .values({
                userId:               session.userId,
                name,
                countryFilter:        body.countryFilter        ?? null,
                countryName:          body.countryName          ?? null,
                streamFilter:         body.streamFilter         ?? null,
                streamName:           body.streamName           ?? null,
                levelFilter:          body.levelFilter          ?? null,
                deliveryMethodFilter: body.deliveryMethodFilter ?? null,
                studyLanguageFilter:  body.studyLanguageFilter  ?? null,
                courseOfferingFilter: body.courseOfferingFilter ?? null,
            })
            .returning();

        return NextResponse.json({ data: created }, { status: 201 });
    } catch (err) {
        console.error('[preferences POST]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
