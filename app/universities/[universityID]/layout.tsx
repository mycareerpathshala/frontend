/* eslint-disable @next/next/no-img-element */
// imports
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Breadcrumb from '@/assets/components/global/Breadcrumb';
import ApplyNowButton from '@/assets/components/global/ApplyNowButton';
import SideNav from '@/assets/components/universities/SideNav';
import HowToApplyAccordion from '@/assets/components/universities/HowToApplyAccordion';
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import { HiArrowDownTray, HiArrowTopRightOnSquare, HiCalendarDays, HiMapPin } from 'react-icons/hi2';
import UniversityMedia from '@/assets/components/universities/UniversityMedia';
import { UniversityType } from '@/assets/types/universityTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';

// dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ universityID: string }> }): Promise<Metadata> {
    const { universityID } = await params;
    const res = await getSingleUniversityData(universityID);
    if (!res?.data) return { title: 'University' };
    const u = res.data;
    const name = u.acronym ? `${u.name} (${u.acronym})` : u.name;
    const location = u.location?.country?.name ? ` in ${u.location.city ? `${u.location.city}, ` : ''}${u.location.country.name}` : '';
    return {
        title: `${name} — Fees, Admission & Courses`,
        description: `Explore ${u.name}${location}: admission requirements, tuition fees, available programs, rankings, and more. Apply through My Career Pathshala.`,
        openGraph: {
            title: `${name} | My Career Pathshala`,
            description: `Fees, admission requirements, and courses at ${u.name}${location}.`,
            type: 'website',
        },
    };
}

// generate static params
export async function generateStaticParams() {
    const query = {
        fields: ['documentId', 'name'],
        pagination: {
            pageSize: 100,
        },
    };
    const universitiesResponse = await getUniversitiesId(query, true);

    if (!universitiesResponse) {
        return [];
    }

    return universitiesResponse.data.map((data: Pick<UniversityType & StrapiDataType, 'documentId' | 'name'>) => {
        return { universityID: data.documentId };
    });
}

export default async function SingleUniversityLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ universityID: string }>;
}) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;

    return (
        <main className="relative px-4">
            {/* breadcrumb */}
            <Breadcrumb
                crumblist={[
                    { level: 1, label: 'Universities', url: '/universities' },
                    {
                        level: 2,
                        label: `${universityData.name}`,
                        url: `/universities/${universityData.documentId}`,
                    },
                ]}
            />

            <section className="mx-auto w-full max-w-7xl">
                <div>
                    <div className="bg-white">
                        <h1 className="text-2xl font-medium max-md:text-xl">
                            <span>{universityData.name}&nbsp;</span>
                            {universityData.acronym ? <span>({universityData.acronym}):&nbsp;</span> : ''}
                            <span>Fee, Admission & Courses</span>
                        </h1>
                        <p className="mt-1.5 flex items-center gap-1.5 text-[15px] max-md:text-xs max-sm:flex-col max-sm:items-start">
                            {universityData.location ? (
                                <span className="text-primary-base flex flex-wrap items-center gap-1.5 max-sm:gap-1">
                                    <HiMapPin className="size-5" />
                                    <span>{universityData.location.city}</span>
                                    {', '}
                                    <span>{universityData.location.stateProvince}</span>
                                    {', '}
                                    <Link href={universityData.location.country?.documentId ? `/countries/${universityData.location.country.documentId}` : '/countries'}>
                                        <span className="underline underline-offset-1">
                                            {universityData.location.country?.name}
                                        </span>
                                    </Link>
                                </span>
                            ) : (
                                <></>
                            )}
                            <span className="max-sm:hidden">|</span>
                            <span className="flex items-center gap-1.5">
                                <HiCalendarDays className="size-5" />
                                <span>Estd.</span>
                                <span className="text-primary-base">
                                    {universityData.est ? new Date(universityData.est).getFullYear() : ''}
                                </span>
                            </span>
                        </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
                        <div className="flex items-center gap-2.5 text-[15px] max-md:text-sm max-sm:w-full max-sm:flex-col max-sm:items-start">
                            <span className="flex gap-2 max-sm:w-full max-sm:justify-between">
                                <span>University Type</span>
                                <span className="bg-primary-base rounded-full px-3 text-white">
                                    {universityData.type}
                                </span>
                            </span>
                            <span className="max-sm:hidden">|</span>
                            <span className="flex items-center gap-2">
                                <HiArrowTopRightOnSquare className="size-5" />
                                {universityData.officialWebsite && (
                                    <Link
                                        target="_blank"
                                        href={universityData.officialWebsite}
                                        className="text-primary-base cursor-pointer underline select-none"
                                    >
                                        Official Website
                                    </Link>
                                )}
                            </span>
                            {/* not adding the review section */}
                        </div>
                        <div className="flex gap-2 text-[15px]">
                            {universityData.universityMediaContent?.brochure?.url && (
                                <a
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${universityData.universityMediaContent.brochure.url}`}
                                    className="hover:bg-primary-gray flex w-fit cursor-pointer items-center gap-1 rounded-lg border px-2 py-1.5 transition-colors duration-200 ease-in-out select-none"
                                >
                                    <HiArrowDownTray className="text-primary-base size-6" />
                                    <span>Brochure</span>
                                </a>
                            )}
                            <ApplyNowButton
                                className="bg-primary-base hover:bg-primary-light cursor-pointer rounded-lg px-4 py-2 font-bold text-white transition-colors duration-200 ease-in-out select-none max-md:text-sm max-md:font-medium"
                                university={{
                                    documentId: universityData.documentId,
                                    name: universityData.name,
                                    acronym: universityData.acronym ?? undefined,
                                    country: universityData.location?.country?.name ?? undefined,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto mt-6 w-full max-w-7xl">
                {/* university media section */}
                <UniversityMedia universityData={universityData} />

                <div className="mt-3 grid grid-cols-2 gap-2 max-lg:grid-cols-1 max-md:text-sm">
                    <div className="flex items-center justify-between gap-12 rounded-lg bg-[linear-gradient(90deg,rgba(26,72,112,0.75)_0%,rgba(26,72,112,0.75)_0.01%,rgba(110,172,218,0.75)_65%)] px-5 py-2.5 text-white max-sm:flex-col max-sm:gap-2">
                        <p className="text-sm font-medium">
                            I want to get admitted into this university, I need counselling.
                        </p>
                        <Link
                            href="/dashboard/counselling"
                            className="bg-primary-base hover:bg-primary-light cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 ease-in-out select-none max-md:font-medium"
                        >
                            Get Counselling
                        </Link>
                    </div>
                    <div className="flex items-center justify-between gap-12 rounded-lg bg-[linear-gradient(90deg,rgba(105,79,142,0.75)_0%,rgba(227,165,199,0.75)_67.5%)] px-5 py-2.5 text-white max-sm:flex-col max-sm:gap-2">
                        <p className="text-sm font-medium">I am still figuring out best options for my study abroad.</p>
                        <Link
                            href="/courses"
                            className="bg-secondary-base hover:bg-secondary-light cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 ease-in-out select-none max-md:font-medium"
                        >
                            Find Programs
                        </Link>
                    </div>
                </div>

                {universityData.howToApply && universityData.howToApply.length > 0 && (
                    <HowToApplyAccordion
                        universityName={universityData.name}
                        howToApply={universityData.howToApply}
                    />
                )}
            </section>

            <section className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-[260px_1fr] gap-7.5 max-lg:mt-0 max-lg:grid-cols-1">
                <aside className="max-lg:flex max-lg:flex-col-reverse max-lg:gap-16">
                    <SideNav universityID={universityID} hasScholarship={!!universityData.scholarshipDynamicPage} />

                    <div className="mt-14 rounded-lg bg-[linear-gradient(165deg,#E5C3EB_-6.76%,#B5D3FF_113.72%)] p-4">
                        <h4 className="grid grid-cols-[1fr_auto] items-center justify-between">
                            <span className="text-lg font-medium">
                                Studying in{' '}
                                {universityData.location?.country?.name ? universityData.location.country.name : ''}
                            </span>
                            {universityData.location && (
                                <span className="relative block h-11.5 w-11.5 overflow-hidden rounded-full">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${universityData.location.country?.countryFlag?.url ? universityData.location.country.countryFlag.url : '/img/mcp_pen_icon.svg'}`}
                                        alt={`${universityData.name} country flag`}
                                        className="absolute inset-0 h-full w-full rounded-full object-cover"
                                    />
                                </span>
                            )}
                        </h4>
                        <p className="mt-4 text-center text-sm">
                            Curious about studying in&nbsp;
                            {universityData.location?.country?.name ? universityData.location.country.name : 'Abroad'}?
                            Create a &apos;Study with{' '}
                            {universityData.location?.country?.name ? universityData.location.country.name : 'Abroad'}
                            &apos; account and explore your ideal study options, access personalized recommendations,
                            save your favorite courses and providers, and manage all your enquiries in one place.
                        </p>
                        <div className="mt-6 flex items-center justify-between gap-3">
                            <Link
                                href="/auth/register"
                                className="bg-primary-base w-full cursor-pointer rounded-lg px-4 py-2 text-center text-white select-none"
                            >
                                Register
                            </Link>
                            <Link
                                href="/auth/login"
                                className="text-primary-base border-primary-base w-full cursor-pointer rounded-lg border px-4 py-2 text-center select-none"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </aside>
                <div>{children}</div>
            </section>
        </main>
    );
}
