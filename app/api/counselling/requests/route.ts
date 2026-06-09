import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { counsellings, users } from '@/assets/lib/database/schema';
import { sendEmail, EMAIL_FROM_ADMISSION } from '@/assets/lib/email';
import { counsellingConfirmEmailHtml } from '@/assets/lib/email/templates/counsellingConfirm';
import { type NewCounsellingRequestPayload } from '@/assets/lib/counselling';
import { and, desc, eq, inArray } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── GET /api/counselling/requests ─────────────────────────────────────────────

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const requests = await db
            .select()
            .from(counsellings)
            .where(eq(counsellings.userId, session.userId))
            .orderBy(desc(counsellings.createdAt));

        return NextResponse.json({ data: requests });
    } catch (err) {
        console.error('[counselling GET]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── POST /api/counselling/requests ────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // One-active-counselling rule
        const [existing] = await db
            .select({ id: counsellings.id })
            .from(counsellings)
            .where(
                and(
                    eq(counsellings.userId, session.userId),
                    inArray(counsellings.status, ['pending', 'scheduled']),
                ),
            )
            .limit(1);

        if (existing) {
            return NextResponse.json(
                { error: 'You already have an active counselling request. Please wait until it is completed or cancelled before applying again.' },
                { status: 409 },
            );
        }

        const body = await request.json() as Partial<NewCounsellingRequestPayload>;

        const { name, email, phone, studyLevel, message, preferredDays, preferredTimeRanges, nationality, streams, countries, courses } = body;

        if (!name || !email || !phone || !studyLevel || !message) {
            return NextResponse.json({ error: 'name, email, phone, studyLevel and message are required' }, { status: 400 });
        }
        if (!preferredDays?.length) {
            return NextResponse.json({ error: 'At least one preferred day is required' }, { status: 400 });
        }
        if (!preferredTimeRanges?.length) {
            return NextResponse.json({ error: 'At least one preferred time range is required' }, { status: 400 });
        }

        const [created] = await db
            .insert(counsellings)
            .values({
                userId:              session.userId,
                name:                name.trim(),
                email:               email.trim(),
                phone:               phone.trim(),
                studyLevel:          studyLevel as 'Undergraduate' | 'Postgraduate' | 'MBBS',
                message:             message.trim(),
                preferredDays,
                preferredTimeRanges,
                nationality: nationality ?? null,
                streams:     streams    ?? null,
                countries:   countries  ?? null,
                courses:     courses    ?? null,
            })
            .returning();

        // Confirmation email — fetch student name (session has email but not firstName)
        db.select({ firstName: users.firstName })
            .from(users)
            .where(eq(users.id, session.userId))
            .limit(1)
            .then(([user]) => {
                if (!user) return;
                return sendEmail({
                    to:      created.email,
                    from:    EMAIL_FROM_ADMISSION,
                    subject: 'Counselling request received — My Career Pathshala',
                    html:    counsellingConfirmEmailHtml({
                        firstName:          user.firstName,
                        studyLevel:         created.studyLevel,
                        preferredDays:      created.preferredDays,
                        preferredTimeRanges: created.preferredTimeRanges,
                    }),
                });
            })
            .catch(() => {});

        return NextResponse.json({ data: created }, { status: 201 });
    } catch (err) {
        console.error('[counselling POST]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
