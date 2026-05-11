import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { counsellings } from '@/assets/lib/database/schema';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

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
