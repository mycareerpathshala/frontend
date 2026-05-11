import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { signSession, SESSION_COOKIE_OPTIONS } from '@/assets/lib/auth/session';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        // use same error message for both "not found" and "wrong password" to avoid user enumeration
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const valid = await compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = await signSession({ userId: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, avatar: user.avatar });

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE_OPTIONS.name, token, SESSION_COOKIE_OPTIONS);
        return response;
    } catch (err) {
        console.error('[login]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
