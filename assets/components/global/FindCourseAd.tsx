// imports
import { HiAcademicCap, HiOutlineClock } from 'react-icons/hi2';
import Link from 'next/link';

export default function FindCourseAd() {
    return (
        <div className="mt-12 flex w-full items-center gap-8 rounded-lg border border-gray-400 bg-[linear-gradient(97deg,#F0F5FD_27.19%,rgba(195,212,255,0.54)_111.29%)] px-10 py-6 max-sm:flex-col max-sm:gap-4 max-sm:p-4">
            <div>
                <HiAcademicCap className="size-24 text-amber-400" />
            </div>
            <div className="w-full">
                <h2 className="text-xl font-medium max-sm:mt-3 max-sm:text-center">
                    Find Course that matches your Dream and Goal
                </h2>
                <p className="mt-0.5 text-sm max-sm:mt-2">
                    Tell us about your study plans, and we will show you the best course for you
                </p>
                <div className="mt-6 flex w-full items-end justify-between text-sm max-sm:flex-col max-sm:items-stretch max-sm:gap-6">
                    <div className="space-y-1.5">
                        <p className="flex items-center gap-1.5">
                            <span>
                                <HiOutlineClock className="size-6" />
                            </span>
                            <span>It takes few minutes only</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                            <span>
                                <HiOutlineClock className="size-6" />
                            </span>
                            <span>See results with no obligations</span>
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/courses"
                            className="text-primary-light border-primary-light hover:bg-primary-light block rounded-lg border-2 px-4 py-2 font-semibold transition-colors duration-200 ease-in-out hover:text-white max-sm:py-3 max-sm:text-center max-sm:text-sm"
                        >
                            Find Perfect Course
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
