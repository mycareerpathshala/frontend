import BeSubscriber from '@/assets/components/global/BeSubscriber';
import Footer from '@/assets/components/global/Footer';
import Header from '@/assets/components/global/Header';
import React from 'react';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <BeSubscriber />
            <Footer />
        </>
    );
}
