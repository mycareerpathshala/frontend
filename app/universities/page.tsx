// imports
import { Metadata } from 'next';
import FindCourseAd from '@/assets/components/global/FindCourseAd';

export const metadata: Metadata = {
    title: 'Top Universities Worldwide — Study Abroad',
    description: 'Browse our global network of top-ranked universities. Filter by country, program type, delivery method, and more to find the perfect university for your study abroad journey.',
    openGraph: {
        title: 'Top Universities Worldwide — Study Abroad | My Career Pathshala',
        description: 'Browse top-ranked universities worldwide. Filter by country, program type, and more.',
        type: 'website',
    },
};
import SpinnerMini from '@/assets/components/global/SpinnerMini';
import UniversityListing from '@/assets/components/universities/UniversityListing';
import { HiAcademicCap, HiGlobeAlt, HiSparkles } from 'react-icons/hi2';
import { Suspense } from 'react';

export default function UniversityPage() {
    return (
        <main className="mx-auto w-full max-w-7xl bg-white px-4 py-8">
            {/* header */}
            <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-5 shadow-lg">
                {/* decorative blobs */}
                <div className="pointer-events-none absolute -top-10 -right-10 size-52 rounded-full bg-white/5 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 -left-8 size-40 rounded-full bg-indigo-400/20 blur-2xl" />

                <div className="flex items-center justify-between gap-6">
                    <div>
                        {/* badge */}
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 backdrop-blur-sm">
                            <HiSparkles className="size-3" />
                            Explore Global Education
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                            Discover Universities
                            <span className="text-blue-200"> Across the World</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-blue-100/80">
                            Browse our global network — top-ranked institutions, specialised programs, and more.
                        </p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiGlobeAlt className="size-3.5 text-blue-200" />
                            Multiple Countries
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiAcademicCap className="size-3.5 text-blue-200" />
                            Diverse Programs
                        </div>
                    </div>
                </div>
            </section>

            {/* client wrapper for the content */}
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center py-40">
                        <SpinnerMini />
                        <p className="mt-4 text-slate-400">Loading search filters...</p>
                    </div>
                }
            >
                <UniversityListing />
            </Suspense>

            <section>
                <FindCourseAd />
            </section>
        </main>
    );
}
