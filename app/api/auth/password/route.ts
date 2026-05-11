import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { compare, hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── POST /api/auth/password ───────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json() as { current?: string; newPassword?: string };
        const { current, newPassword } = body;

        if (!current || !newPassword) {
            return NextResponse.json(
                { error: 'current and newPassword are required' },
                { status: 400 },
            );
        }
        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'New password must be at least 8 characters' },
                { status: 400 },
            );
        }

        const [user] = await db
            .select({ passwordHash: users.passwordHash })
            .from(users)
            .where(eq(users.id, session.userId))
            .limit(1);

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const valid = await compare(current, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
        }

        const newHash = await hash(newPassword, 12);
        await db.update(users).set({ passwordHash: newHash }).where(eq(users.id, session.userId));

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[password]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
