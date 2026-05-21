'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaBlogger, FaGlobeAsia, FaSchool } from 'react-icons/fa';
import { GiMedicalPack } from 'react-icons/gi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { MdKeyboardArrowRight, MdSchool } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

// types
type SearchResultItem = {
    documentId: string;
    label: string;
    href: string;
};

type SearchResults = {
    universities: SearchResultItem[];
    courses: SearchResultItem[];
    mbbs: SearchResultItem[];
    countries: SearchResultItem[];
    blogs: SearchResultItem[];
};

type CategoryConfig = {
    title: string;
    Icon: IconType;
    iconBg: string;
    iconColor: string;
    chipBg: string;
    chipText: string;
    chipHover: string;
    rowHover: string;
    dotColor: string;
};

// category config — all tailwind classes written in full so they aren't purged
const CATEGORIES: Record<keyof SearchResults, CategoryConfig> = {
    universities: {
        title: 'Universities',
        Icon: FaSchool,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        chipBg: 'bg-blue-50',
        chipText: 'text-blue-600',
        chipHover: 'hover:bg-blue-100',
        rowHover: 'hover:bg-blue-50',
        dotColor: 'bg-blue-500',
    },
    courses: {
        title: 'Courses',
        Icon: MdSchool,
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-600',
        chipBg: 'bg-violet-50',
        chipText: 'text-violet-600',
        chipHover: 'hover:bg-violet-100',
        rowHover: 'hover:bg-violet-50',
        dotColor: 'bg-violet-500',
    },
    mbbs: {
        title: 'MBBS',
        Icon: GiMedicalPack,
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        chipBg: 'bg-emerald-50',
        chipText: 'text-emerald-600',
        chipHover: 'hover:bg-emerald-100',
        rowHover: 'hover:bg-emerald-50',
        dotColor: 'bg-emerald-500',
    },
    countries: {
        title: 'Countries',
        Icon: FaGlobeAsia,
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        chipBg: 'bg-amber-50',
        chipText: 'text-amber-600',
        chipHover: 'hover:bg-amber-100',
        rowHover: 'hover:bg-amber-50',
        dotColor: 'bg-amber-500',
    },
    blogs: {
        title: 'Blogs',
        Icon: FaBlogger,
        iconBg: 'bg-rose-100',
        iconColor: 'text-rose-600',
        chipBg: 'bg-rose-50',
        chipText: 'text-rose-600',
        chipHover: 'hover:bg-rose-100',
        rowHover: 'hover:bg-rose-50',
        dotColor: 'bg-rose-500',
    },
};

const CHIP_LINKS: { key: keyof SearchResults; href: string }[] = [
    { key: 'universities', href: '/universities' },
    { key: 'courses', href: '/courses' },
    { key: 'mbbs', href: '/mbbs' },
    { key: 'countries', href: '/countries' },
    { key: 'blogs', href: '/blogs' },
];

// local components
function ResultGroup({
    categoryKey,
    items,
    onClose,
}: {
    categoryKey: keyof SearchResults;
    items: SearchResultItem[];
    onClose: () => void;
}) {
    if (items.length === 0) return null;

    const cfg = CATEGORIES[categoryKey];

    return (
        <div className="mb-4">
            {/* section header */}
            <div className="mb-1.5 flex items-center gap-2 px-1">
                <span className={`size-2 rounded-full ${cfg.dotColor}`} />
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">{cfg.title}</span>
                <span className="ml-auto rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400">
                    {items.length}
                </span>
            </div>

            {/* result rows */}
            <div className="overflow-hidden rounded-xl border border-gray-100">
                {items.map((item, index) => (
                    <Link
                        key={item.documentId}
                        href={item.href}
                        onClick={onClose}
                        className={`group flex w-full items-center gap-3 px-3 py-2.5 transition-colors duration-150 ${cfg.rowHover} ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                        {/* category icon */}
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${cfg.iconBg}`}>
                            <cfg.Icon className={`size-4 ${cfg.iconColor}`} />
                        </div>

                        {/* label */}
                        <span className="flex-1 truncate text-sm font-medium text-gray-700">{item.label}</span>

                        {/* arrow — appears on hover */}
                        <MdKeyboardArrowRight className="size-4 text-gray-300 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-gray-500" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function SearchModal() {
    const [searchInput, setSearchInput] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    // context
    const { searchEnabled, setSearchEnabled } = useAppContext();

    // mount → wait one frame → show (enter); hide → wait 300ms → unmount (exit)
    useEffect(() => {
        if (searchEnabled) {
            setMounted(true);
            const raf = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(raf);
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(t);
        }
    }, [searchEnabled]);

    // debounce: wait 300ms after user stops typing before fetching
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchInput.trim()), 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // fetch from /api/search whenever the debounced query changes
    useEffect(() => {
        if (debouncedQuery.length < 2) {
            setResults(null);
            return;
        }

        const controller = new AbortController();

        const fetchResults = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`, {
                    signal: controller.signal,
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setResults(data.results);
                }
            } catch (err: unknown) {
                if (err instanceof Error && err.name === 'AbortError') return;
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
        return () => controller.abort();
    }, [debouncedQuery]);

    // reset state when modal closes
    useEffect(() => {
        if (!searchEnabled) {
            setSearchInput('');
            setResults(null);
            setDebouncedQuery('');
        }
    }, [searchEnabled]);

    const totalResults = results
        ? results.universities.length +
          results.courses.length +
          results.mbbs.length +
          results.countries.length +
          results.blogs.length
        : 0;

    if (!mounted) return null;

    return (
        <div
            onClick={() => setSearchEnabled(false)}
            className={`fixed inset-0 z-110 flex h-screen w-screen items-center justify-center px-4 transition-opacity duration-300 sm:items-start sm:px-0 sm:pt-[12vh] ${
                visible ? 'bg-black/50 opacity-100 backdrop-blur-sm' : 'opacity-0'
            }`}
        >
            {/* modal — centered on mobile, card near top on desktop */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`flex w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 transition-transform duration-300 ease-out sm:mx-4 sm:max-w-2xl sm:rounded-2xl ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                {/* ── search input row ── */}
                <div className="flex items-center gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
                    {/* icon */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-sm sm:size-10 sm:rounded-xl">
                        {isLoading ? (
                            <div className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white sm:size-5" />
                        ) : (
                            <HiMagnifyingGlass className="size-4 text-white sm:size-5" />
                        )}
                    </div>

                    {/* input */}
                    <input
                        autoFocus
                        type="text"
                        name="search"
                        id="search"
                        value={searchInput}
                        placeholder="Search..."
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 min-w-0 bg-transparent text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none sm:text-lg sm:placeholder:content-['Search_universities,_courses,_countries...']"
                    />
                    <label htmlFor="search" className="hidden">
                        Search
                    </label>

                    {/* ESC hint — desktop only */}
                    <kbd className="hidden items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 font-mono text-xs text-gray-400 sm:flex">
                        ESC
                    </kbd>

                    {/* close button */}
                    <button
                        type="button"
                        onClick={() => setSearchEnabled(false)}
                        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors select-none hover:bg-red-100 hover:text-red-500 sm:size-8"
                    >
                        <span className="hidden">Close</span>
                        <RxCross2 className="size-3.5 sm:size-4" />
                    </button>
                </div>

                {/* ── divider ── */}
                <div className="mx-4 border-t border-gray-100" />

                {/* ── quick navigate chips ── */}
                <div className="px-4 py-2 sm:py-3">
                    <p className="mb-2 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                        Quick Navigate
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {CHIP_LINKS.map(({ key, href }) => {
                            const cfg = CATEGORIES[key];
                            return (
                                <Link
                                    key={key}
                                    href={href}
                                    onClick={() => setSearchEnabled(false)}
                                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${cfg.chipBg} ${cfg.chipText} ${cfg.chipHover}`}
                                >
                                    <cfg.Icon className="size-3" />
                                    {cfg.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ── divider ── */}
                <div className="mx-4 border-t border-gray-100" />

                {/* ── results area ── */}
                <div className="px-4 py-3">
                    {/* results header */}
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Results</p>
                        {results && totalResults > 0 && (
                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                                {totalResults} found
                            </span>
                        )}
                    </div>

                    {/* scrollable results */}
                    <div className="h-56 overflow-y-auto pr-0.5 sm:h-72">
                        {/* idle state */}
                        {!debouncedQuery || debouncedQuery.length < 2 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-3">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-100">
                                    <HiMagnifyingGlass className="size-7 text-gray-400" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500">Start searching</p>
                                    <p className="mt-0.5 text-xs text-gray-400">Type at least 2 characters</p>
                                </div>
                            </div>
                        ) : isLoading ? (
                            <div className="flex h-full flex-col items-center justify-center gap-3">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50">
                                    <div className="size-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                                </div>
                                <p className="text-sm text-gray-400">Searching...</p>
                            </div>
                        ) : results && totalResults > 0 ? (
                            (Object.keys(CATEGORIES) as (keyof SearchResults)[]).map((key) => (
                                <ResultGroup
                                    key={key}
                                    categoryKey={key}
                                    items={results[key]}
                                    onClose={() => setSearchEnabled(false)}
                                />
                            ))
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-3">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-100">
                                    <HiMagnifyingGlass className="size-7 text-gray-300" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-gray-500">No results found</p>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        Nothing matched &quot;{debouncedQuery}&quot;
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── footer — hidden on mobile to save space ── */}
                <div className="hidden border-t border-gray-100 bg-gray-50 px-4 py-2 sm:block">
                    <div className="flex items-center justify-center gap-4 sm:justify-start">
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-gray-500 shadow-sm">
                                ↵
                            </kbd>
                            to open
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-gray-500 shadow-sm">
                                ESC
                            </kbd>
                            to close
                        </span>
                        <span className="hidden items-center gap-1 text-[11px] text-gray-400 sm:flex">
                            <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-gray-500 shadow-sm">
                                ⌘K
                            </kbd>
                            to reopen
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
