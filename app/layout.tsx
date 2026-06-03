// imports
import React from 'react';
import { Metadata } from 'next';
import '@/assets/styles/globals.css';
import Poppins from '@/assets/utilities/localFontConfig';
import { AppProvider } from '@/assets/context/AppContext';
import AuthModal from '@/assets/components/global/AuthModal';
import InviteAd from '@/assets/components/global/InviteAd';
import SearchModal from '@/assets/components/global/SearchModal';

// metadata
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycareerpathshala.com'),
    title: {
        template: '%s | My Career Pathshala',
        default: 'My Career Pathshala — Study Abroad Guidance',
    },
    description: 'My Career Pathshala helps students find top universities, MBBS colleges, and international courses. Get expert counselling for your study abroad journey.',
    openGraph: {
        siteName: 'My Career Pathshala',
        type: 'website',
        locale: 'en_IN',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@MyCareerpathshala',
    },
};

// root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={Poppins.className}>
            <body>
                <AppProvider>
                    <SearchModal />
                    <AuthModal />
                    <InviteAd />
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}
