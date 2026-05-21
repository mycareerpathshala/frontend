import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { userSettings } from '@/assets/lib/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULTS = {
    inAppApplications:       true,
    inAppCounselling:        true,
    newCourseAlerts:         false,
    universityUpdates:       false,
    emailAdmissionDeadlines: true,
    emailScholarshipAlerts:  true,
    emailPromotional:        true,
    emailNewsletter:         true,
    emailSpecialOffers:      false,
    emailWeeklyDigest:       false,
    publicProfile:           false,
    showOnlineStatus:        true,
    shareActivityData:       false,
    twoFactorEnabled:        false,
};

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [row] = await db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, session.userId));

    return NextResponse.json({ settings: row ?? { userId: session.userId, ...DEFAULTS } });
}

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    const allowed = Object.keys(DEFAULTS) as (keyof typeof DEFAULTS)[];
    const patch: Partial<typeof DEFAULTS> = {};
    for (const key of allowed) {
        if (typeof body[key] === 'boolean') patch[key] = body[key];
    }

    await db
        .insert(userSettings)
        .values({ userId: session.userId, ...DEFAULTS, ...patch })
        .onConflictDoUpdate({ target: userSettings.userId, set: patch });

    return NextResponse.json({ success: true });
}
