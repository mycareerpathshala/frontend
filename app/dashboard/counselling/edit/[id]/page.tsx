import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { counsellings } from '@/assets/lib/database/schema';
import { and, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getStreamsData } from '@/assets/lib/cms/fetchStream';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';
import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import CounsellingEditForm from '@/assets/components/dashboard/CounsellingEditForm';
import type { CounsellingRequest, WeekDay, TimeRange } from '@/assets/lib/counselling';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Counselling Request — Dashboard',
    robots: { index: false, follow: false },
};

export default async function CounsellingEditRoute({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await getSession();
    if (!session) redirect('/auth/login');

    const [row] = await db
        .select()
        .from(counsellings)
        .where(and(eq(counsellings.id, id), eq(counsellings.userId, session.userId)))
        .limit(1);

    if (!row || row.status !== 'pending') redirect('/dashboard/counselling');

    const existing: CounsellingRequest = {
        ...row,
        preferredDays:       row.preferredDays       as WeekDay[],
        preferredTimeRanges: row.preferredTimeRanges as TimeRange[],
        scheduledTime: row.scheduledTime?.toISOString() ?? null,
        createdAt:     row.createdAt.toISOString(),
        updatedAt:     row.updatedAt.toISOString(),
    };

    const [streamsRes, countriesRes] = await Promise.all([
        getStreamsData({ fields: ['name'], pagination: { pageSize: 100 } }, true),
        getCountriesData({ fields: ['name'], pagination: { pageSize: 100 } }, true),
    ]);

    const streamOptions   = streamsRes?.data?.map((s) => s.name)   ?? [];
    const countryOptions  = countriesRes?.data?.map((c) => c.name) ?? [];

    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <CounsellingEditForm
                    existing={existing}
                    streamOptions={streamOptions}
                    countryOptions={countryOptions}
                />
            </main>
        </>
    );
}
