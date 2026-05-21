import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import CounsellingApplyForm from '@/assets/components/dashboard/CounsellingApplyForm';
import { getStreamsData } from '@/assets/lib/cms/fetchStream';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Apply for Counselling — Dashboard',
    robots: { index: false, follow: false },
};

export default async function CounsellingApplyRoute() {
    const [streamsRes, countriesRes] = await Promise.all([
        getStreamsData({ fields: ['name'], pagination: { pageSize: 100 } }, true),
        getCountriesData({ fields: ['name'], pagination: { pageSize: 100 } }, true),
    ]);

    const streams   = streamsRes?.data?.map((s) => s.name)   ?? [];
    const countries = countriesRes?.data?.map((c) => c.name) ?? [];

    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <CounsellingApplyForm streamOptions={streams} countryOptions={countries} />
            </main>
        </>
    );
}
