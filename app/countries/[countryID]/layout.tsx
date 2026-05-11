// imports

import SideNavCountry from '@/assets/components/country/SideNavCountry';
import { getSingleCountryData } from '@/assets/lib/cms/fetchCountry';
import { QueryObjectType } from '@/assets/types/responseTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function SingleCountryLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ countryID: string }>;
}) {
    const { countryID } = await params;

    const queryObject: QueryObjectType = {
        populate: {
            countryFlag: true,
            coverImage: true,
            estimatedPopulation: true,
            countryGDB: true,
            costOfLiving: true,
            feesPerYear: true,
            docsAndCertification: true,
            visaCategories: true,
            workOpportunities: true,
            faqList: true,
            monthlyExpenseRange: {
                populate: {
                    expenseRange: true,
                },
            },
        },
    };
    const countryDataResponse = await getSingleCountryData(countryID, queryObject, true);

    // 2. Production Check: If no data or null, trigger 404
    if (!countryDataResponse || !countryDataResponse.data) {
        notFound();
    }

    // get the countryData only
    const { data: countryData } = countryDataResponse;

    return (
        <main>
            <section
                style={{
                    height: '540px',
                    width: '100%',
                    backgroundImage: countryData.coverImage?.formats?.medium?.url
                        ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${countryData.coverImage.formats.medium.url})`
                        : 'background: linear-gradient(90deg, rgba(80, 10, 0, 1) 0%, rgba(0, 48, 113, 1) 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="relative z-50"
            >
                <div className="absolute inset-0 -z-50 h-full w-full bg-black/35"></div>
                <div className="z-50 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4">
                    <h1 className="text-3xl font-black text-white">Study in {countryData.name}</h1>
                    <Link
                        href="#"
                        className="bg-primary-base border-primary-base hover:text-primary-base mt-4 w-fit cursor-pointer rounded-xl border px-6 py-3 text-white transition-colors duration-200 ease-in-out select-none hover:bg-white"
                    >
                        Talk to Counsellor
                    </Link>
                    <p className="mt-5 w-full max-w-175 leading-loose text-white">
                        Get expert counselling for studying in {countryData.name} with 50% off on Student VISA fees,
                        Explore over 500 college and 1200+ courses
                    </p>
                </div>
            </section>

            <section className="mx-auto flex w-full max-w-7xl items-start gap-4 px-4 max-[1160px]:flex-col max-[1160px]:gap-0 xl:gap-6">
                {/* content */}
                <div className="w-[80%] pb-8 max-[1160px]:w-full">{children}</div>

                {/* nav */}
                <SideNavCountry className="sticky top-22 mt-8 flex w-[20%] flex-col items-center gap-1 rounded-lg bg-sky-100 p-4 text-xs shadow-xl max-[1160px]:top-16 max-[1160px]:z-40 max-[1160px]:order-first max-[1160px]:mt-0 max-[1160px]:w-full max-[1160px]:flex-row max-[1160px]:flex-nowrap max-[1160px]:items-stretch max-[1160px]:gap-0 max-[1160px]:rounded-none max-[1160px]:border-b-2 max-[1160px]:border-gray-100 max-[1160px]:bg-white max-[1160px]:p-0 max-[1160px]:px-2 max-[1160px]:shadow-sm" />
            </section>
        </main>
    );
}
