import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { counsellings } from '@/assets/lib/database/schema';
import { type NewCounsellingRequestPayload } from '@/assets/lib/counselling';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── PATCH /api/counselling/requests/[id] ──────────────────────────────────────

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const [existing] = await db
            .select({ id: counsellings.id, status: counsellings.status })
            .from(counsellings)
            .where(and(eq(counsellings.id, id), eq(counsellings.userId, session.userId)))
            .limit(1);

        if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        if (existing.status !== 'pending') {
            return NextResponse.json(
                { error: 'Only pending requests can be edited.' },
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

        const [updated] = await db
            .update(counsellings)
            .set({
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
            .where(eq(counsellings.id, id))
            .returning();

        return NextResponse.json({ data: updated });
    } catch (err) {
        console.error('[counselling PATCH]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── DELETE /api/counselling/requests/[id] ─────────────────────────────────────

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        await db
            .delete(counsellings)
            .where(and(eq(counsellings.id, id), eq(counsellings.userId, session.userId)));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[counselling DELETE]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
