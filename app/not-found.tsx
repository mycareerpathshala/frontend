'use client';

// imports
import Image from 'next/image';
import Link from 'next/link';
import MCPLogo from '@/public/img/mcp_logo.svg';
import StudyImage from '@/public/img/placeholders/stream_placeholder.jpg';

import { HiMagnifyingGlass, HiAcademicCap, HiMapPin, HiArrowRight, HiExclamationTriangle } from 'react-icons/hi2';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-sky-100">
            {/* 1. LOGO SECTION */}
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
                <Link href="/" className="transition-transform active:scale-95">
                    <Image src={MCPLogo} className="h-12 w-auto md:h-14" alt="My Career Pathshala" priority />
                </Link>
                <Link
                    href="/contact"
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-sky-600"
                >
                    Need Help?
                </Link>
            </nav>

            <div className="mx-auto max-w-7xl px-6 pt-10 pb-24">
                <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
                    {/* 2. 404 MESSAGE SECTION (Left 5 columns) */}
                    <div className="lg:col-span-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-lg font-bold text-red-600">
                            <HiExclamationTriangle className="size-8" />
                            <span>Not Found 404</span>
                        </div>

                        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
                            Lost in the <br />
                            <span className="text-sky-600">Right Place.</span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            The page you requested took a gap year! It&apos;s no longer here, but your career
                            shouldn&apos;t have to wait. Let&apos;s get you back on track.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
                            >
                                Take me Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>

                    {/* 3. MARKETING SECTION (Right 7 columns) */}
                    <div className="lg:col-span-7">
                        <div className="relative">
                            {/* Background Decorative Gradients */}
                            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
                            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

                            <div className="relative grid gap-6 sm:grid-cols-2">
                                {/* University Card */}
                                <Link
                                    href="/universities"
                                    className="group relative overflow-hidden rounded-3xl border border-white bg-white/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-100/50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200">
                                        <HiMapPin className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-slate-900">Find Universities</h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Explore 500+ top-rated medical colleges worldwide for 2026.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-sky-600">
                                        <span>Browse List</span>
                                        <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                {/* Courses Card */}
                                <Link
                                    href="/courses"
                                    className="group relative overflow-hidden rounded-3xl border border-white bg-white/60 p-8 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                                        <HiAcademicCap className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-slate-900">Explore Courses</h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        From MBBS to MD, find the curriculum that matches your ambition.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-600">
                                        <span>View Courses</span>
                                        <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>

                                {/* Featured Image Card */}
                                <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-lg transition-transform hover:scale-[1.01] sm:col-span-2">
                                    <Image
                                        src={StudyImage}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                        alt="Career Pathshala Marketing"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="text-xs font-bold tracking-widest text-sky-400 uppercase">
                                            Join the Elite
                                        </p>
                                        <h4 className="mt-1 text-2xl font-bold italic">
                                            Are you searching for MBBS Universitiess?
                                        </h4>
                                    </div>
                                    <Link
                                        href="/mbbs"
                                        className="absolute right-6 bottom-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <HiMagnifyingGlass className="h-6 w-6" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
