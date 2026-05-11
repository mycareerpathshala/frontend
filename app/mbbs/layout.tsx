// imports
import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import InlineBanner from '@/assets/components/global/InlineBanner';
import { Metadata } from 'next';
import React from 'react';

// metadata
export const metadata: Metadata = {
    title: 'MBBS Abroad — Find Medical Colleges',
    description: 'Explore MBBS medical colleges abroad. Compare FMGE pass rates, tuition fees, eligibility criteria, and more to find the right college for your medical career.',
    openGraph: {
        title: 'MBBS Abroad — Find Medical Colleges | My Career Pathshala',
        description: 'Compare FMGE pass rates, tuition fees, and eligibility criteria for MBBS colleges abroad.',
        type: 'website',
    },
};

export default function MbbsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* header */}
            <Header />

            {/* children content */}
            {children}

            {/* search banner */}
            <InlineBanner />

            {/* be subscriber sections */}
            <BeSubscriber />

            {/* footer */}
            <Footer />
        </>
    );
}
