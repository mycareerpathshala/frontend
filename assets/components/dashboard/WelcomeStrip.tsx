'use client';

import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { MdSwipeLeft, MdWbTwilight } from 'react-icons/md';

function getGreeting(): { text: string; Icon: React.ElementType } {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', Icon: HiSun };
    if (hour < 17) return { text: 'Good Afternoon', Icon: MdWbTwilight };
    return { text: 'Good Evening', Icon: HiMoon };
}

export default function WelcomeStrip() {
    const { session } = useAppContext();
    const { text, Icon } = getGreeting();

    return (
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                    <Icon className="size-5 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-medium text-slate-400">{text}</p>
                    <h1 className="text-xl font-extrabold text-slate-800">Hello {session?.firstName ?? 'Student'},</h1>
                </div>
            </div>

            <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all select-none hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
            >
                <MdSwipeLeft className="size-4.5 shrink-0" />
                <span className="sm:hidden">Web Portal</span>
                <span className="hidden sm:inline">Go Back To Web Portal</span>
            </Link>
        </div>
    );
}
