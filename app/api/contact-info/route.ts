import { db } from '@/assets/lib/database/db';
import { contactInfo } from '@/assets/lib/database/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const rows = await db.select().from(contactInfo).where(eq(contactInfo.id, 1)).limit(1);
    return NextResponse.json({ data: rows[0] ?? null });
}
