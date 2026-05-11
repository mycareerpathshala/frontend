// imports
import { Metadata } from 'next';
import Banner from '@/assets/components/global/Banner';

export const metadata: Metadata = {
    title: 'Study Abroad — Top Universities, MBBS & Courses',
    description: 'Explore top universities, MBBS colleges, and international courses worldwide. Get personalized career counselling and expert study abroad guidance from My Career Pathshala.',
    openGraph: {
        title: 'Study Abroad — Top Universities, MBBS & Courses | My Career Pathshala',
        description: 'Explore top universities, MBBS colleges, and international courses worldwide. Get personalized career counselling.',
        type: 'website',
    },
};
import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import SpinnerMini from '@/assets/components/global/SpinnerMini';
import AIPoweredBox from '@/assets/components/Home/AIPoweredBox';
import ApplicationSteps from '@/assets/components/Home/ApplicationSteps';
import BlogSection from '@/assets/components/Home/BlogSection';
import CountryGrid from '@/assets/components/Home/CountryGrid';
import DiscoverCards from '@/assets/components/Home/DiscoverCards';
import OurServices from '@/assets/components/Home/OurServices';
import StreamSection from '@/assets/components/Home/StreamSection';
import TopUniversities from '@/assets/components/Home/TopUniversities';
import WhoAreWe from '@/assets/components/Home/WhoAreWe';
import { Suspense } from 'react';

export default function Homepage() {
    return (
        <>
            {/* HomePage */}
            <Header />

            {/* main */}
            <main>
                {/* Banner */}
                <Banner bannerUrl="/img/banners/home_banner_1.svg" colorOne="#F0F5FD" colorTwo="rgba(0,95,226,0.23)" />

                {/* top universities section */}
                <TopUniversities />

                {/* discover section */}
                <DiscoverCards />

                {/* who are we section */}
                <WhoAreWe />

                {/* AI Powered box */}
                <AIPoweredBox />

                {/* country grid */}
                <CountryGrid />

                {/* stream grid */}
                <StreamSection />

                {/* our services section */}
                <OurServices />

                {/* application steps sections */}
                <ApplicationSteps />

                {/* blog interact section */}
                <Suspense fallback={<SpinnerMini />}>
                    <BlogSection />
                </Suspense>
            </main>

            {/* be subscriber sections */}
            <BeSubscriber />

            {/* footer */}
            <Footer />
        </>
    );
}
