import { createOTP } from '@/assets/lib/auth/otp';
import { signSession, SESSION_COOKIE_OPTIONS } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users, userSettings } from '@/assets/lib/database/schema';
import { sendEmail } from '@/assets/lib/email';
import { otpEmailHtml } from '@/assets/lib/email/templates/otp';
import { compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

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

        // Check if 2FA is enabled for this user
        const [settings] = await db
            .select({ twoFactorEnabled: userSettings.twoFactorEnabled })
            .from(userSettings)
            .where(eq(userSettings.userId, user.id))
            .limit(1);

        const twoFactorEnabled = settings?.twoFactorEnabled ?? false;

        if (twoFactorEnabled) {
            // Generate OTP and send email
            const code = await createOTP(user.id);

            await sendEmail({
                to: user.email,
                subject: 'Your My Career Pathshala login code',
                html: otpEmailHtml({ firstName: user.firstName, code }),
            });

            // Store a short-lived pending token in a cookie so the verify step
            // knows which user is authenticating without exposing the userId in the URL
            const pendingToken = await new SignJWT({
                userId:    user.id,
                firstName: user.firstName,
                lastName:  user.lastName,
                email:     user.email,
                avatar:    user.avatar,
                purpose:   'otp-pending',
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('10m')
                .sign(getSecret());

            const response = NextResponse.json({ requires2fa: true });
            response.cookies.set('mcp_otp_pending', pendingToken, {
                httpOnly: true,
                secure:   process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge:   600, // 10 minutes
                path:     '/',
            });
            return response;
        }

        // No 2FA — complete login immediately
        const token = await signSession({
            userId:    user.id,
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email,
            avatar:    user.avatar,
        });

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE_OPTIONS.name, token, SESSION_COOKIE_OPTIONS);
        return response;
    } catch (err) {
        console.error('[login]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
