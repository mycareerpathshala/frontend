import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { counsellings } from '@/assets/lib/database/schema';
import { type NewCounsellingRequestPayload } from '@/assets/lib/counselling';
import { desc, eq } from 'drizzle-orm';
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

        const body = await request.json() as Partial<NewCounsellingRequestPayload>;

        const { name, email, phone, studyLevel, message, preferredDays, preferredTimeRanges } = body;

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
            })
            .returning();

        return NextResponse.json({ data: created }, { status: 201 });
    } catch (err) {
        console.error('[counselling POST]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
