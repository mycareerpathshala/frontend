import { SESSION_COOKIE_OPTIONS } from '@/assets/lib/auth/session';
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete(SESSION_COOKIE_OPTIONS.name);
    return response;
}
