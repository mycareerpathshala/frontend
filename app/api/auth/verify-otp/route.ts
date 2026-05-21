import { verifyOTP } from '@/assets/lib/auth/otp';
import { signSession, SESSION_COOKIE_OPTIONS, SessionPayloadType } from '@/assets/lib/auth/session';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not set');
    return new TextEncoder().encode(secret);
}

export async function POST(request: NextRequest) {
    try {
        const pendingToken = request.cookies.get('mcp_otp_pending')?.value;
        if (!pendingToken) {
            return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
        }

        let pending: SessionPayloadType & { purpose: string };
        try {
            const { payload } = await jwtVerify(pendingToken, getSecret());
            pending = payload as unknown as typeof pending;
        } catch {
            return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 401 });
        }

        if (pending.purpose !== 'otp-pending') {
            return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });
        }

        const { code } = await request.json();
        if (!code || typeof code !== 'string' || code.length !== 6) {
            return NextResponse.json({ error: 'Enter the 6-digit code.' }, { status: 400 });
        }

        const valid = await verifyOTP(pending.userId, code);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid or expired code. Please try again.' }, { status: 401 });
        }

        const sessionToken = await signSession({
            userId:    pending.userId,
            firstName: pending.firstName,
            lastName:  pending.lastName,
            email:     pending.email,
            avatar:    pending.avatar,
        });

        const response = NextResponse.json({ success: true });
        response.cookies.set(SESSION_COOKIE_OPTIONS.name, sessionToken, SESSION_COOKIE_OPTIONS);
        response.cookies.delete('mcp_otp_pending');
        return response;
    } catch (err) {
        console.error('[verify-otp]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
