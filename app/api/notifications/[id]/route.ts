import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { notifications } from '@/assets/lib/database/schema';
import { and, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    await db
        .update(notifications)
        .set({ isRead: true })
        .where(and(eq(notifications.id, id), eq(notifications.userId, session.userId)));

    return NextResponse.json({ success: true });
}
