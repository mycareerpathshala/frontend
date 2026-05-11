// imports

import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import InlineBanner from '@/assets/components/global/InlineBanner';
import { Metadata } from 'next';
import React from 'react';

// metadata
export const metadata: Metadata = {
    title: 'Study Abroad by Country — Explore Destinations',
    description: 'Explore study abroad destinations by country. Compare universities, costs, visa requirements, and work opportunities to choose the right country for your education.',
    openGraph: {
        title: 'Study Abroad by Country | My Career Pathshala',
        description: 'Compare study abroad destinations — universities, fees, visa requirements, and work opportunities.',
        type: 'website',
    },
};

export default function CountryLayout({ children }: { children: React.ReactNode }) {
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
