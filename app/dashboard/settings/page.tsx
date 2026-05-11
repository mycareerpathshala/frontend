import { Metadata } from 'next';
import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import SettingsPageContent from '@/assets/components/dashboard/SettingsPage';

export const metadata: Metadata = {
    title: 'Settings — Dashboard',
};

export default function SettingsPage() {
    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <SettingsPageContent />
            </main>
        </>
    );
}
