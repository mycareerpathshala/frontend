'use client';

// imports
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

// local components
function NavItem({ urlTo, itemName, isActive }: { urlTo: string; itemName: string; isActive: boolean }) {
    return (
        <Link
            href={urlTo}
            className={`w-full border-l-4 p-3 font-semibold whitespace-nowrap transition-all duration-200 ease-in-out max-[1160px]:w-auto max-[1160px]:shrink-0 max-[1160px]:border-l-0 max-[1160px]:border-b-[3px] max-[1160px]:px-5 max-[1160px]:py-4 max-[1160px]:text-sm ${
                isActive
                    ? 'border-l-primary-base text-primary-base bg-sky-200 max-[1160px]:border-b-primary-base max-[1160px]:text-primary-base'
                    : 'hover:border-l-primary-dark border-l-transparent text-gray-600 hover:bg-sky-200 max-[1160px]:border-b-transparent max-[1160px]:text-gray-500 max-[1160px]:hover:text-gray-800'
            }`}
        >
            {itemName}
        </Link>
    );
}

export default function SideNavCountry({ className }: { className?: string }) {
    const [activeId, setActiveId] = useState('');

    // List of IDs you've used in your SingleCountryPage
    const navLinks = useMemo(
        () => [
            { id: 'facts', name: 'Facts' },
            { id: 'about', name: 'About' },
            { id: 'university', name: 'University' },
            { id: 'requirements', name: 'Admission Requirements' },
            { id: 'study-cost', name: 'Cost of Study' },
            { id: 'streams', name: 'Popular Streams' },
            { id: 'visa', name: 'Visa' },
            { id: 'work', name: 'Work Opportunities' },
            { id: 'faqs', name: 'Country FAQ' },
        ],
        [],
    );

    // applying the observer option
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // observe each section by id
        navLinks.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        // cleanup function
        return () => observer.disconnect();
    }, [navLinks]);

    return (
        <nav className={`${className} max-[1160px]:overflow-x-auto`}>
            <p className="px-4 py-2 text-[10px] tracking-widest text-sky-600 uppercase max-[1160px]:hidden">On this page</p>
            {navLinks.map((link) => (
                <NavItem key={link.id} urlTo={`#${link.id}`} itemName={link.name} isActive={activeId === link.id} />
            ))}
        </nav>
    );
}
