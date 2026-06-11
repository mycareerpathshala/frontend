import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'My Counselling Sessions',
    robots: { index: false, follow: false },
};

import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import CounsellingPage from '@/assets/components/dashboard/CounsellingPage';

export default function CounsellingRoute() {
    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <CounsellingPage />
            </main>
        </>
    );
}
