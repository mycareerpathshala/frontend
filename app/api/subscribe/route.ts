import { db } from '@/assets/lib/database/db';
import { subscribers } from '@/assets/lib/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        if (!name?.trim() || !email?.trim()) {
            return NextResponse.json({ status: 'error', message: 'Name and email are required.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ status: 'error', message: 'Please enter a valid email address.' }, { status: 400 });
        }

        // Check for existing subscriber
        const [existing] = await db
            .select({ id: subscribers.id })
            .from(subscribers)
            .where(eq(subscribers.email, email.toLowerCase().trim()))
            .limit(1);

        if (existing) {
            return NextResponse.json({ status: 'error', message: 'This email is already subscribed.' }, { status: 409 });
        }

        await db.insert(subscribers).values({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone?.trim() || null,
        });

        return NextResponse.json({ status: 'success', message: 'Subscribed successfully!' }, { status: 201 });
    } catch {
        return NextResponse.json({ status: 'error', message: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
