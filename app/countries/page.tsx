// imports
import { Metadata } from 'next';
import SingleCountryCard from '@/assets/components/country/CountryCard';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';

export const metadata: Metadata = {
    title: 'Study Destinations — Explore Countries to Study Abroad',
    description: 'Discover the best countries to study abroad — UK, Germany, Italy, Australia, USA, France and more. Compare universities, scholarships, and visa requirements.',
    keywords: ['study abroad countries', 'best countries to study', 'overseas education', 'study in Europe', 'study in UK', 'study in Germany'],
};
import { CountryType } from '@/assets/types/countryTypes';
import { QueryObjectType, StrapiDataType } from '@/assets/types/responseTypes';
import { HiSparkles, HiGlobeAlt, HiAcademicCap } from 'react-icons/hi2';
import Image from 'next/image';

export default async function CountryPage() {
    const queryObject: QueryObjectType = {
        populate: {
            coverImage: true,
            countryFlag: true,
            feesPerYear: true,
            estimatedPopulation: true,
        },
    };
    const countryDataResponse = await getCountriesData(queryObject, true);

    return (
        <main className="px-4 pt-6">
            {/* header */}
            <section className="relative mx-auto flex w-full max-w-7xl items-center overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-indigo-700 to-violet-800 shadow-lg">
                {/* decorative blobs */}
                <div className="pointer-events-none absolute -top-10 left-1/3 size-52 rounded-full bg-white/5 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-12 left-8 size-40 rounded-full bg-indigo-300/20 blur-2xl" />

                <div className="flex flex-1 items-center justify-between gap-6 px-8 py-5">
                    <div>
                        {/* badge */}
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-violet-100 backdrop-blur-sm">
                            <HiSparkles className="size-3" />
                            Study Abroad Made Simple
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                            Countries
                            <span className="text-violet-200"> — Study Abroad</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-violet-100/80">
                            Compare 100+ countries, top universities, scholarships, and living costs — all in one place.
                        </p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiGlobeAlt className="size-3.5 text-violet-200" />
                            100+ Countries
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                            <HiAcademicCap className="size-3.5 text-violet-200" />
                            Top Universities
                        </div>
                    </div>
                </div>

                {/* banner image */}
                <div className="relative hidden w-48 self-stretch shrink-0 lg:block">
                    <Image
                        src="/img/country/country_banner.jpg"
                        alt="Countries Banner"
                        fill
                        className="object-cover opacity-90"
                    />
                </div>
            </section>

            {/* country grid */}
            <section className="mx-auto my-14 w-full max-w-7xl">
                <div className="grid grid-cols-3 gap-8 max-xl:gap-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-6">
                    {countryDataResponse?.data?.length ? (
                        countryDataResponse.data.map((countryData: CountryType & StrapiDataType, index) => {
                            return <SingleCountryCard key={index} countryData={countryData} />;
                        })
                    ) : (
                        <p>No countries found</p>
                    )}
                </div>
            </section>
        </main>
    );
}
