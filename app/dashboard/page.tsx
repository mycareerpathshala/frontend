import DashboardHeader from '@/assets/components/dashboard/DashboardHeader';
import WelcomeStrip from '@/assets/components/dashboard/WelcomeStrip';
import ProfileCard from '@/assets/components/dashboard/ProfileCard';
import CounsellorCard from '@/assets/components/dashboard/CounsellorCard';
import CalendarWidget from '@/assets/components/dashboard/CalendarWidget';
import PreferencesSection from '@/assets/components/dashboard/PreferencesSection';
import ApplicationBanner from '@/assets/components/dashboard/ApplicationBanner';

export default function DashboardPage() {
    return (
        <>
            {/* Sticky top header with logo + tabs */}
            <DashboardHeader />

            {/* Page body */}
            <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-8">
                {/* Greeting + back-to-portal link */}
                <WelcomeStrip />

                <div className="grid grid-cols-12 gap-6">
                    {/* ── Left column: Profile card ── */}
                    <div className="col-span-12 lg:col-span-3">
                        <ProfileCard />
                    </div>

                    {/* ── Right column: main dashboard content ── */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
                        {/* Row 1: Counsellor CTA + Calendar */}
                        <div className="grid grid-cols-5 gap-6">
                            <div className="col-span-5 md:col-span-3">
                                <CounsellorCard />
                            </div>
                            <div className="col-span-5 md:col-span-2">
                                <CalendarWidget />
                            </div>
                        </div>

                        {/* Row 2: Saved study preferences */}
                        <PreferencesSection />

                        {/* Row 3: Application banner */}
                        <ApplicationBanner />
                    </div>
                </div>
            </main>
        </>
    );
}
