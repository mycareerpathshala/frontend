import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { preferences } from '@/assets/lib/database/schema';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── PATCH /api/user/preferences/[id] — rename ─────────────────────────────────

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const { name } = await request.json() as { name?: string };
        const trimmed = name?.trim();
        if (!trimmed) return NextResponse.json({ error: 'name is required' }, { status: 400 });

        const [updated] = await db
            .update(preferences)
            .set({ name: trimmed })
            .where(and(eq(preferences.id, id), eq(preferences.userId, session.userId)))
            .returning();

        if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json({ data: updated });
    } catch (err) {
        console.error('[preferences PATCH]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── DELETE /api/user/preferences/[id] ────────────────────────────────────────

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        await db
            .delete(preferences)
            .where(and(eq(preferences.id, id), eq(preferences.userId, session.userId)));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[preferences DELETE]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
