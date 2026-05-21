import { and, eq, gt, isNull } from 'drizzle-orm';
import { db } from '../database/db';
import { otpTokens } from '../database/schema';

export function generateOTPCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
}

export async function createOTP(userId: string): Promise<string> {
    const code = generateOTPCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await db.insert(otpTokens).values({ userId, code, expiresAt });
    return code;
}

export async function verifyOTP(userId: string, code: string): Promise<boolean> {
    const [token] = await db
        .select()
        .from(otpTokens)
        .where(
            and(
                eq(otpTokens.userId, userId),
                eq(otpTokens.code, code),
                gt(otpTokens.expiresAt, new Date()),
                isNull(otpTokens.usedAt),
            ),
        )
        .limit(1);

    if (!token) return false;

    await db
        .update(otpTokens)
        .set({ usedAt: new Date() })
        .where(eq(otpTokens.id, token.id));

    return true;
}
