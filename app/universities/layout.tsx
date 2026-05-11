// imports
import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import InlineBanner from '@/assets/components/global/InlineBanner';
import React from 'react';

export default function UniversityLayout({ children }: { children: React.ReactNode }) {
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
