import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Dashboard',
    robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
}
