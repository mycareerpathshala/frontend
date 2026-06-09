import { createOTP } from '@/assets/lib/auth/otp';
import { SESSION_COOKIE_OPTIONS } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { sendEmail, EMAIL_FROM_AUTH } from '@/assets/lib/email';
import { otpEmailHtml } from '@/assets/lib/email/templates/otp';
import { compare } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// Short-lived cookie that carries the half-authenticated user between the
// password step and the OTP step. The OTP code itself lives in the database
// (otp_tokens); this cookie only identifies who is mid-login.
const OTP_PENDING_COOKIE = 'mcp_otp_pending';
const OTP_PENDING_TTL = 60 * 10; // 10 minutes, matches the OTP lifetime

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return new TextEncoder().encode(secret);
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const valid = await compare(password, user.passwordHash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Password is correct — start the second factor. Generate a one-time code,
        // email it from the auth (noreply) sender, and hand the browser a signed
        // pending token. The real session is only issued in /api/auth/verify-otp.
        const code = await createOTP(user.id);

        try {
            await sendEmail({
                to:      user.email,
                from:    EMAIL_FROM_AUTH,
                subject: 'Your My Career Pathshala login code',
                html:    otpEmailHtml({ firstName: user.firstName, code }),
            });
        } catch (mailErr) {
            console.error('[login] failed to send OTP email', mailErr);
            return NextResponse.json(
                { error: 'We could not send your login code. Please try again in a moment.' },
                { status: 502 },
            );
        }

        const pendingToken = await new SignJWT({
            userId:    user.id,
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email,
            avatar:    user.avatar,
            purpose:   'otp-pending',
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('10m')
            .sign(getSecret());

        const response = NextResponse.json({ requires2fa: true });
        response.cookies.set(OTP_PENDING_COOKIE, pendingToken, {
            httpOnly: true,
            secure:   SESSION_COOKIE_OPTIONS.secure,
            sameSite: 'lax',
            maxAge:   OTP_PENDING_TTL,
            path:     '/',
        });
        return response;
    } catch (err) {
        console.error('[login]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
