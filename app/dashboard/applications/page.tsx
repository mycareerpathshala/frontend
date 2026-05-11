import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import ApplicationsPage from '@/assets/components/dashboard/ApplicationsPage';

export default function ApplicationsRoute() {
    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <ApplicationsPage />
            </main>
        </>
    );
}
