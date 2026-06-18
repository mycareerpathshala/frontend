import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { sendEmail, EMAIL_FROM_AUTH } from '@/assets/lib/email';
import { verificationEmailHtml } from '@/assets/lib/email/templates/verification';
import { SignJWT } from 'jose';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return new TextEncoder().encode(secret);
}

export async function POST() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const [user] = await db
            .select({ isVerified: users.isVerified, firstName: users.firstName })
            .from(users)
            .where(eq(users.id, session.userId))
            .limit(1);

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        if (user.isVerified) return NextResponse.json({ error: 'Email is already verified' }, { status: 400 });

        const token = await new SignJWT({ userId: session.userId, purpose: 'email-verification' })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(getSecret());

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycareerpathshala.com';
        const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

        if (process.env.NODE_ENV === 'development') {
            console.log(`[dev] Verify email URL for ${session.email}: ${verifyUrl}`);
        } else {
            await sendEmail({
                to: session.email,
                from: EMAIL_FROM_AUTH,
                subject: 'Verify your My Career Pathshala email',
                html: verificationEmailHtml({ firstName: user.firstName, verifyUrl }),
            });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[send-verification]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
