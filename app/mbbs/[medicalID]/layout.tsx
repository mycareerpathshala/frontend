/* eslint-disable @next/next/no-img-element */
// imports
import Breadcrumb from '@/assets/components/global/Breadcrumb';
import MedicalMedia from '@/assets/components/mbbs/MedicalMedia';
import SideNav from '@/assets/components/mbbs/SideNav';
import { getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { HiArrowDownTray, HiArrowTopRightOnSquare, HiCalendarDays, HiChevronDown, HiMapPin } from 'react-icons/hi2';

// dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ medicalID: string }> }): Promise<Metadata> {
    const { medicalID } = await params;
    const res = await getSingleMedicalData(medicalID);
    if (!res?.data) return { title: 'Medical College' };
    const m = res.data;
    const name = m.acronym ? `${m.name} (${m.acronym})` : m.name;
    const location = m.location?.country?.name
        ? ` in ${m.location.city ? `${m.location.city}, ` : ''}${m.location.country.name}`
        : '';
    return {
        title: `${name} — MBBS Fees & Admission`,
        description: `Explore MBBS admission at ${m.name}${location}: tuition fees, eligibility, FMGE pass rates, syllabus, and application process. Apply through My Career Pathshala.`,
        openGraph: {
            title: `${name} — MBBS | My Career Pathshala`,
            description: `MBBS fees, eligibility, and admission details for ${m.name}${location}.`,
            type: 'website',
        },
    };
}

export default async function SingleMBBSLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ medicalID: string }>;
}) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;

    return (
        <main className="relative px-4">
            {/* breadcrumb */}
            <Breadcrumb
                crumblist={[
                    { level: 1, label: 'Medical Colleges', url: '/mbbs' },
                    {
                        level: 2,
                        label: `${medicalData.name}`,
                        url: `/mbbs/${medicalData.documentId}`,
                    },
                ]}
            />

            <section className="mx-auto w-full max-w-7xl">
                <div>
                    <div className="bg-white">
                        <h1 className="text-2xl font-medium max-md:text-xl">
                            <span>{medicalData.name}&nbsp;</span>
                            {medicalData.acronym ? <span>({medicalData.acronym}):&nbsp;</span> : ''}
                            <span>Fee, Admission & Courses</span>
                        </h1>
                        <p className="mt-1.5 flex items-center gap-1.5 text-[15px] max-md:text-xs max-sm:flex-col max-sm:items-start">
                            {medicalData.location ? (
                                <span className="text-primary-base flex flex-wrap items-center gap-1.5 max-sm:gap-1">
                                    <HiMapPin className="size-5" />
                                    <span>{medicalData.location.city}</span>
                                    {', '}
                                    <span>{medicalData.location.stateProvince}</span>
                                    {', '}
                                    <Link href="#">
                                        <span className="underline underline-offset-1">
                                            {medicalData.location.country?.name}
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
                                    {medicalData.est ? new Date(medicalData.est).getFullYear() : ''}
                                </span>
                            </span>
                        </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
                        <div className="flex items-center gap-2.5 text-[15px] max-md:text-sm max-sm:w-full max-sm:flex-col max-sm:items-start">
                            <span className="flex gap-2 max-sm:w-full max-sm:justify-between">
                                <span>University Type</span>
                                <span className="bg-primary-base rounded-full px-3 text-white">{medicalData.type}</span>
                            </span>
                            <span className="max-sm:hidden">|</span>
                            <span className="flex items-center gap-2">
                                <HiArrowTopRightOnSquare className="size-5" />
                                {medicalData.officialWebsite && (
                                    <Link
                                        target="_blank"
                                        href={medicalData.officialWebsite}
                                        className="text-primary-base cursor-pointer underline select-none"
                                    >
                                        Official Website
                                    </Link>
                                )}
                            </span>
                            {/* not adding the review section */}
                        </div>
                        <div className="flex gap-2 text-[15px]">
                            {medicalData.collegeMediaContent?.brochure?.url && (
                                <a
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${medicalData.collegeMediaContent.brochure.url}`}
                                    className="hover:bg-primary-gray flex w-fit cursor-pointer items-center gap-1 rounded-lg border px-2 py-1.5 transition-colors duration-200 ease-in-out select-none"
                                >
                                    <HiArrowDownTray className="text-primary-base size-6" />
                                    <span>Brochure</span>
                                </a>
                            )}
                            <Link
                                href="#"
                                className="bg-primary-base hover:bg-primary-light cursor-pointer rounded-lg px-4 py-2 font-bold text-white transition-colors duration-200 ease-in-out select-none max-md:text-sm max-md:font-medium"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto mt-6 w-full max-w-7xl">
                {/* university media section */}
                <MedicalMedia medicalData={medicalData} />

                <div className="mt-3 grid grid-cols-2 gap-2 max-lg:grid-cols-1 max-md:text-sm">
                    <div className="flex items-center justify-between gap-12 rounded-lg bg-[linear-gradient(90deg,rgba(26,72,112,0.75)_0%,rgba(26,72,112,0.75)_0.01%,rgba(110,172,218,0.75)_65%)] px-5 py-2.5 text-white max-sm:flex-col max-sm:gap-2">
                        <p className="text-sm font-medium">
                            I want to get admitted into this university, I need counselling.
                        </p>
                        <Link
                            href="#"
                            className="bg-primary-base hover:bg-primary-light cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 ease-in-out select-none max-md:font-medium"
                        >
                            Get Counselling
                        </Link>
                    </div>
                    <div className="flex items-center justify-between gap-12 rounded-lg bg-[linear-gradient(90deg,rgba(105,79,142,0.75)_0%,rgba(227,165,199,0.75)_67.5%)] px-5 py-2.5 text-white max-sm:flex-col max-sm:gap-2">
                        <p className="text-sm font-medium">I am still figuring out best options for my study abroad.</p>
                        <Link
                            href="#"
                            className="bg-secondary-base hover:bg-secondary-light cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-200 ease-in-out select-none max-md:font-medium"
                        >
                            Find Programs
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between max-sm:flex-col max-sm:gap-3">
                    <p className="text-base max-md:text-sm">
                        How to apply in <span className="font-bold">{medicalData.name}</span> with{' '}
                        <span className="text-primary-base">my </span>
                        <span className="text-secondary-base font-bold">career </span>
                        <span className="text-primary-base">pathshala</span>
                    </p>
                    <button type="button" className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold whitespace-nowrap max-md:text-sm">Know More</span>
                        <HiChevronDown className="size-6" />
                    </button>
                </div>
            </section>

            <section className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-[260px_1fr] gap-7.5 max-lg:mt-0 max-lg:grid-cols-1">
                <aside className="max-lg:flex max-lg:flex-col-reverse max-lg:gap-16">
                    <SideNav medicalData={medicalData} />

                    <div className="mt-14 rounded-lg bg-[linear-gradient(165deg,#E5C3EB_-6.76%,#B5D3FF_113.72%)] p-4">
                        <h4 className="grid grid-cols-[1fr_auto] items-center justify-between">
                            <span className="text-lg font-medium">
                                Studying in{' '}
                                {medicalData.location?.country?.name ? medicalData.location.country.name : ''}
                            </span>
                            {medicalData.location && (
                                <span className="relative block h-11.5 w-11.5 overflow-hidden rounded-full">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${medicalData.location.country?.countryFlag?.url ? medicalData.location.country.countryFlag.url : '/img/mcp_pen_icon.svg'}`}
                                        alt={`${medicalData.name} country flag`}
                                        className="absolute inset-0 h-full w-full rounded-full object-cover"
                                    />
                                </span>
                            )}
                        </h4>
                        <p className="mt-4 text-center text-sm">
                            Curious about studying in&nbsp;
                            {medicalData.location?.country?.name ? medicalData.location.country.name : 'Abroad'}? Create
                            a &apos;Study with{' '}
                            {medicalData.location?.country?.name ? medicalData.location.country.name : 'Abroad'}
                            &apos; account and explore your ideal study options, access personalized recommendations,
                            save your favorite courses and providers, and manage all your enquiries in one place.
                        </p>
                        <div className="mt-6 flex items-center justify-between gap-3">
                            <Link
                                href="#"
                                className="bg-primary-base w-full cursor-pointer rounded-lg px-4 py-2 text-center text-white select-none"
                            >
                                Register
                            </Link>
                            <Link
                                href="#"
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
