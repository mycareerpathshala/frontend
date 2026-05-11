import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'mcp_session';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET environment variable is not set');
    return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        await jwtVerify(token, getSecret());
        return NextResponse.next();
    } catch {
        // Token is expired or tampered — clear it and redirect
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete(COOKIE_NAME);
        return response;
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
