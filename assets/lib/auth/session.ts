import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'mcp_session';
const EXPIRES_IN = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET environment variable is not set');
    return new TextEncoder().encode(secret);
}

// session payload type
export interface SessionPayloadType {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
}

export const SESSION_COOKIE_OPTIONS = {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: EXPIRES_IN,
    path: '/',
};

export async function signSession(payload: SessionPayloadType): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getSecret());
}

export async function createSession(payload: SessionPayloadType): Promise<void> {
    const token = await signSession(payload);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
}

export async function getSession(): Promise<SessionPayloadType | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, getSecret());
        return payload as unknown as SessionPayloadType;
    } catch {
        return null;
    }
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
