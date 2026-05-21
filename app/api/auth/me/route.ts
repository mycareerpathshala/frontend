import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json(null);

    const [user] = await db
        .select({ isVerified: users.isVerified, phone: users.phone })
        .from(users)
        .where(eq(users.id, session.userId))
        .limit(1);

    return NextResponse.json({
        ...session,
        isVerified: user?.isVerified ?? false,
        phone:      user?.phone ?? null,
    });
}
