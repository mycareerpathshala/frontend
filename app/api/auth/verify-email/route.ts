import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { jwtVerify } from 'jose';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return new TextEncoder().encode(secret);
}

export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get('token');
        if (!token) {
            return NextResponse.redirect(new URL('/auth/verify-email?error=missing', request.url));
        }

        let userId: string;
        try {
            const { payload } = await jwtVerify(token, getSecret());
            if (payload.purpose !== 'email-verification' || typeof payload.userId !== 'string') {
                throw new Error('Invalid token');
            }
            userId = payload.userId;
        } catch {
            return NextResponse.redirect(new URL('/auth/verify-email?error=invalid', request.url));
        }

        const [user] = await db
            .select({ isVerified: users.isVerified })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return NextResponse.redirect(new URL('/auth/verify-email?error=invalid', request.url));
        }

        if (!user.isVerified) {
            await db.update(users).set({ isVerified: true }).where(eq(users.id, userId));
        }

        return NextResponse.redirect(new URL('/auth/verify-email?success=1', request.url));
    } catch (err) {
        console.error('[verify-email]', err);
        return NextResponse.redirect(new URL('/auth/verify-email?error=server', request.url));
    }
}
