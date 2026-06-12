import { db } from '@/assets/lib/database/db';
import { users } from '@/assets/lib/database/schema';
import { sendEmail, EMAIL_FROM_ADMISSION } from '@/assets/lib/email';
import { welcomeEmailHtml } from '@/assets/lib/email/templates/welcome';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, email, password, userType } = await request.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const validUserTypes = ['student', 'parent', 'general'] as const;
        const resolvedUserType = validUserTypes.includes(userType) ? userType : 'student';

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
        if (existing.length > 0) {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
        }

        const passwordHash = await hash(password, 12);
        await db.insert(users).values({ firstName, lastName, email, passwordHash, userType: resolvedUserType });

        // Welcome email — non-auth, sent from the admission sender.
        // Fire and forget so registration never fails due to email.
        sendEmail({
            to:      email,
            from:    EMAIL_FROM_ADMISSION,
            subject: `Welcome to My Career Pathshala, ${firstName}!`,
            html:    welcomeEmailHtml({ firstName }),
        }).catch(() => {});

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err) {
        console.error('[register]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
