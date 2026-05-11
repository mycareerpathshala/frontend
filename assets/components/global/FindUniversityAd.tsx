// imports
import Link from 'next/link';
import { HiAcademicCap, HiClock } from 'react-icons/hi2';

export default function FindUniversityAd() {
    return (
        <section className="flex w-full max-w-7xl items-center gap-8 rounded-lg border border-gray-400 bg-[linear-gradient(97deg,#F0F5FD_27.19%,rgba(195,212,255,0.54)_111.29%)] px-10 py-6 max-sm:flex-col max-sm:p-4">
            <div>
                <HiAcademicCap className="size-24 text-amber-400" />
            </div>
            <div className="w-full">
                <h2 className="text-xl font-medium max-sm:text-center">
                    Find University that matches your Dream and Goal
                </h2>
                <p className="mt-0.5 text-sm max-sm:mt-2">
                    Tell us about your study plans, and we will show you the best university for you
                </p>
                <div className="mt-6 flex w-full items-end justify-between text-sm max-sm:flex-col max-sm:items-stretch max-sm:gap-6">
                    <div className="space-y-1.5">
                        <p className="flex items-center gap-1.5">
                            <span>
                                <HiClock className="size-6" />
                            </span>
                            <span>It takes few minutes only</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <span>
                                <HiClock className="size-6" />
                            </span>
                            <span>See results with no obligations</span>
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/universities"
                            className="text-primary-base border-primary-base hover:bg-primary-bg block rounded-lg border-2 px-4 py-2 font-semibold whitespace-nowrap transition-colors duration-200 ease-in-out max-sm:py-3 max-sm:text-center"
                        >
                            Find Best University
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
