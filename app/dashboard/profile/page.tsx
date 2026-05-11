import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import ProfilePageContent from '@/assets/components/dashboard/ProfilePage';

export default function ProfilePage() {
    return (
        <>
            <DashboardHeader />
            <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
                <ProfilePageContent />
            </main>
        </>
    );
}
