// imports
import SpinnerMini from '@/assets/components/global/SpinnerMini';
import MedicalListing from '@/assets/components/mbbs/MedicalListing';
import Image from 'next/image';
import { HiChartBar, HiSparkles, HiUserGroup } from 'react-icons/hi2';
import { Suspense } from 'react';

export default function MbbsPage() {
    return (
        <main className="relative mx-auto w-full max-w-7xl bg-white px-4 pt-6">
            {/* header */}
            <section className="relative flex w-full items-center overflow-hidden rounded-2xl bg-linear-to-br from-emerald-600 via-teal-700 to-cyan-800 shadow-lg">
                {/* decorative blobs */}
                <div className="pointer-events-none absolute -top-10 left-1/3 size-52 rounded-full bg-white/5 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 left-8 size-40 rounded-full bg-teal-300/20 blur-2xl" />

                <div className="flex flex-1 items-center justify-between gap-6 px-8 py-5">
                    <div>
                        {/* badge */}
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur-sm">
                            <HiSparkles className="size-3" />
                            Your Medical Career Starts Here
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                            MBBS Abroad
                            <span className="text-emerald-200"> — Find Your College</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-emerald-100/80">
                            FMGE rates, tuition fees, eligibility, and more — all in one place.
                        </p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiChartBar className="size-3.5 text-emerald-200" />
                            FMGE Pass Rates
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiUserGroup className="size-3.5 text-emerald-200" />
                            Student Insights
                        </div>
                    </div>
                </div>

                {/* banner image */}
                <div className="relative hidden w-48 self-stretch shrink-0 lg:block">
                    <Image
                        src="/img/mbbs/mbbs_banner.jpg"
                        alt="MBBS Banner"
                        fill
                        className="object-cover opacity-90"
                    />
                </div>
            </section>

            {/* mbbs listing */}
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center py-40">
                        <SpinnerMini />
                        <p className="mt-4 text-slate-400">Loading search filters...</p>
                    </div>
                }
            >
                <MedicalListing />
            </Suspense>
        </main>
    );
}
