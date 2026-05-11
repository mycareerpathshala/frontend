/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import { useState, useEffect } from 'react';
import { HiBars3, HiXMark, HiPhone } from 'react-icons/hi2';
import { BiSolidUserCircle } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/assets/context/AppContext';
import SearchButton from './SearchButton';

const navItems = [
    { title: 'Countries', path: '/countries', current: 'countries' },
    { title: 'MBBS Abroad', path: '/mbbs', current: 'mbbs' },
    { title: 'Universities', path: '/universities', current: 'universities' },
    { title: 'Courses', path: '/courses', current: 'courses' },
    { title: 'Blogs', path: '/blogs', current: 'blogs' },
];

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { authPopupEnabled, setAuthPopupEnabled, session } = useAppContext();
    const pathname = usePathname();
    const currentSection = pathname.split(/\/+/).filter(Boolean)[0];

    // lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Hamburger button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation"
                className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
            >
                <HiBars3 className="size-7" />
            </button>

            {/* Full-screen slide-down overlay */}
            <div
                className={`fixed inset-x-0 top-0 z-200 flex h-screen flex-col overflow-hidden bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                {/* Top bar: logo left, close button right */}
                <div className="flex shrink-0 items-center justify-between px-4 py-3.5 shadow-sm">
                    <Link href="/" onClick={() => setIsOpen(false)} className="relative h-10 w-48">
                        <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" fill className="object-contain" />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close navigation"
                        className="bg-primary-base flex items-center justify-center rounded-lg p-2 text-white transition-all active:scale-95"
                    >
                        <HiXMark className="size-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="shrink-0 px-4 py-3">
                    <SearchButton />
                </div>

                {/* Nav links — scrollable if content overflows */}
                <ul className="mt-12 flex flex-col gap-8 px-4">
                    {navItems.map((item) => (
                        <li key={item.path} className="flex flex-col">
                            <Link
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex h-full w-full items-center justify-center text-lg transition-colors ${
                                    currentSection === item.current
                                        ? 'text-primary-base font-semibold'
                                        : 'hover:text-primary-base font-medium text-gray-700'
                                }`}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Bottom actions — always visible */}
                <div className="mt-auto flex shrink-0 flex-row gap-3 px-4 py-4 max-sm:flex-col">
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="bg-primary-base hover:bg-primary-light flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all active:scale-95"
                    >
                        <HiPhone className="size-5" />
                        <span>Contact Support</span>
                    </Link>

                    {session ? (
                        <button
                            type="button"
                            onClick={() => setAuthPopupEnabled(!authPopupEnabled)}
                            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-blue-50 px-4 py-3 transition-all hover:bg-blue-100 active:scale-95"
                        >
                            <img
                                src={`/img/auth/avatars/${session.avatar}`}
                                className="size-8 rounded-full"
                                alt="User avatar"
                            />
                            <span className="text-primary-base font-semibold">{session.firstName}</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setAuthPopupEnabled(!authPopupEnabled)}
                            className="bg-primary-base hover:bg-primary-light flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition-all active:scale-95"
                        >
                            <BiSolidUserCircle className="size-6" />
                            <span>Sign In / Register</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
