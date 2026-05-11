import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { notifications } from '@/assets/lib/database/schema';
import { and, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const rows = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, session.userId))
        .orderBy(desc(notifications.createdAt))
        .limit(50);

    return NextResponse.json({ data: rows });
}

export async function POST() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await db
        .update(notifications)
        .set({ isRead: true })
        .where(and(eq(notifications.userId, session.userId), eq(notifications.isRead, false)));

    return NextResponse.json({ success: true });
}
