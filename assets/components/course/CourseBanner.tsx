// imports

import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineSparkles } from 'react-icons/hi2';
import { PiTargetBold } from 'react-icons/pi';

export default function CourseBanner() {
    return (
        <section className="max-w-7xl">
            <div className="from-primary-light/40 to-secondary-lighter/20 text-primary-dark relative overflow-hidden rounded-xl border border-white/60 bg-linear-to-r via-[#e0eaff] py-6 shadow-sm">
                <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
                <div className="bg-secondary-light/10 absolute -right-12 -bottom-12 h-40 w-40 rounded-full blur-2xl" />

                <div className="relative z-10 px-6 lg:px-12">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-primary-base rounded-full border border-white/80 bg-white/60 px-2 py-0.5 text-[9px] font-bold tracking-tighter uppercase">
                                    Course Finder
                                </span>
                                <div className="bg-secondary-base h-1 w-1 animate-ping rounded-full" />
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                Explore{' '}
                                <span className="from-primary-base to-secondary-light bg-linear-to-r bg-clip-text text-transparent">
                                    Career Opportunities
                                </span>
                            </h1>

                            <div className="text-primary-dark/70 mt-3 flex items-center gap-4 text-[13px] font-medium">
                                <div className="flex items-center gap-1.5">
                                    <HiOutlineBookOpen className="text-primary-base text-lg" />
                                    <span>5k+ Programs</span>
                                </div>
                                <div className="bg-primary-base/20 h-4 w-px" />
                                <div className="flex items-center gap-1.5">
                                    <HiOutlineAcademicCap className="text-secondary-base text-lg" />
                                    <span>Top Universities</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Horizontal Feature Cards (Thin Layout) */}
                        <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                            <div className="flex min-w-45 items-center gap-3 rounded-xl border border-white/80 bg-white/30 p-3 backdrop-blur-md transition-all hover:bg-white/50">
                                <div className="bg-primary-base/10 rounded-lg p-2">
                                    <PiTargetBold className="text-primary-base text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-primary-dark text-xs leading-none font-bold">Smart Filter</h3>
                                    <p className="text-primary-dark/60 mt-1 text-[10px]">Precision Search</p>
                                </div>
                            </div>

                            <div className="flex min-w-45 items-center gap-3 rounded-xl border border-white/80 bg-white/30 p-3 backdrop-blur-md transition-all hover:bg-white/50">
                                <div className="bg-secondary-base/10 rounded-lg p-2">
                                    <HiOutlineSparkles className="text-secondary-base text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-primary-dark text-xs leading-none font-bold">Smart Match</h3>
                                    <p className="text-primary-dark/60 mt-1 text-[10px]">AI Recommendations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
