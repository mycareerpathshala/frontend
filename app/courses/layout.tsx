// imports
import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import React from 'react';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* header */}
            <Header />

            {/* children content */}
            {children}

            {/* be subscriber sections */}
            <BeSubscriber />

            {/* footer */}
            <Footer />
        </>
    );
}
