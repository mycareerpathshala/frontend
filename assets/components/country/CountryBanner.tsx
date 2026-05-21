'use client';

import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';

interface CountryBannerProps {
    countryName: string;
    flagUrl: string;
}

export default function CountryBanner({ countryName, flagUrl }: CountryBannerProps) {
    const { session } = useAppContext();

    return (
        <div className="mx-auto mt-8 w-full rounded-xl bg-linear-to-tr from-[#E5C3EB] via-[#E5C3EB] to-[#B5D3FF] px-6 py-7 max-sm:px-4 max-sm:py-5">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 max-[1160px]:grid-cols-[auto_1fr] max-[1160px]:gap-4">
                <div className="relative size-16 overflow-hidden rounded-full border max-[1160px]:size-12">
                    <img
                        src={flagUrl}
                        alt={`${countryName} Flag`}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                {session ? (
                    <>
                        <div className="flex flex-col items-start gap-2">
                            <h3 className="text-lg font-semibold max-[1160px]:text-base">
                                Explore study options in {countryName}
                            </h3>
                            <p className="max-[1160px]:text-sm">
                                Browse universities and courses, apply directly, or speak with a counsellor to find the
                                right program for you.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 max-[1160px]:col-span-2 max-[1160px]:gap-3">
                            <Link
                                href="/universities"
                                className="bg-primary-base hover:text-primary-base border-primary-base cursor-pointer rounded-lg border px-4 py-2 text-white transition-all duration-200 ease-in-out select-none hover:bg-transparent max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                            >
                                Browse Universities
                            </Link>
                            <Link
                                href="/dashboard/counselling"
                                className="border-primary-base text-primary-base hover:bg-primary-base cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-200 ease-in-out select-none hover:text-white max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                            >
                                Talk to Counsellor
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-start gap-2">
                            <h3 className="text-lg font-semibold max-[1160px]:text-base">
                                Curious about Studying in {countryName}?
                            </h3>
                            <p className="max-[1160px]:text-sm">
                                Create an account and get your ideal study options, access personalized recommendations,
                                save your favourite courses and providers, and manage all your enquiries in one place.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 max-[1160px]:col-span-2 max-[1160px]:gap-3">
                            <Link
                                href="/auth/register"
                                className="bg-primary-base hover:text-primary-base border-primary-base cursor-pointer rounded-lg border px-4 py-2 text-white transition-all duration-200 ease-in-out select-none hover:bg-transparent max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                            >
                                Register
                            </Link>
                            <Link
                                href="/auth/login"
                                className="border-primary-base text-primary-base hover:bg-primary-base cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-200 ease-in-out select-none hover:text-white max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                            >
                                Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
