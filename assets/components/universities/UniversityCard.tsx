/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import ApplicationPopup from '@/assets/components/global/ApplicationPopup';
import { useAppContext } from '@/assets/context/AppContext';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityType } from '@/assets/types/universityTypes';
import Link from 'next/link';
import { useState } from 'react';
import { IconType } from 'react-icons';
import {
    HiAcademicCap,
    HiArrowRight,
    HiBanknotes,
    HiBuildingOffice2,
    HiCalendarDays,
    HiCheckBadge,
    HiGlobeAlt,
    HiMapPin,
    HiUsers,
} from 'react-icons/hi2';

// local components
function Stat({ Icon, label, value }: { Icon: IconType; label: string; value: string | number }) {
    return (
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-linear-to-r from-white to-sky-100 px-3 py-2 max-sm:items-start max-sm:px-1">
            <div>
                <Icon className="text-primary-base/70 size-10 max-sm:size-6" />
            </div>
            <div className="flex flex-col text-slate-900 max-sm:gap-1">
                <span className="text-xs">{label}</span>
                <span className="text-base font-medium max-sm:text-sm">{value ? value : '-'}</span>
            </div>
        </div>
    );
}

export default function UniversityCard({ singleUniversity }: { singleUniversity: UniversityType & StrapiDataType }) {
    const { session, setAuthModalEnabled } = useAppContext();
    const [showPopup, setShowPopup] = useState(false);

    function handleApply() {
        if (!session) {
            setAuthModalEnabled(true);
            return;
        }
        setShowPopup(true);
    }

    async function handleSubmit(data: { universityId: string; courseId: string; notes: string }) {
        await fetch('/api/user/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    return (
        <>
            {showPopup && (
                <ApplicationPopup
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleSubmit}
                    preselectedUniversity={{
                        documentId: singleUniversity.documentId,
                        name: singleUniversity.name,
                        acronym: singleUniversity.acronym,
                        country: singleUniversity.location?.country?.name,
                    }}
                />
            )}
            <section className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(98deg,#F0F5FD_49.35%,rgba(147,187,243,0.56)_127.15%,rgba(59,132,233,0.15)_127.16%,rgba(0,95,226,0.41)_127.17%)] shadow-sm transition hover:shadow-md">
                <div className="absolute -right-5 bottom-10 h-150 w-75 rotate-50 rounded-2xl bg-blue-50 max-sm:top-30 max-sm:h-100 max-sm:w-100"></div>
                <div className="grid lg:grid-cols-[380px_1fr]">
                    {/* Media */}
                    <div className="relative h-52 lg:h-full">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${singleUniversity.universityMediaContent?.coverPhoto.formats?.small?.url}`}
                            alt={`${singleUniversity.name} Cover`}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-black/20 via-black/0 to-white/0" />
                        {/* Logo */}
                        <div className="absolute top-5 right-5 h-16 w-16 overflow-hidden rounded-xl border border-white bg-white p-1 shadow">
                            <img
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${singleUniversity.universityMediaContent?.logo.url}`}
                                alt={`${singleUniversity.name} Logo`}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-4 max-sm:px-3 md:px-8">
                        {/* Decorative subtle glow */}
                        <div className="bg-primary-base/10 pointer-events-none absolute -top-10 -right-12 h-56 w-56 rounded-full blur-2xl" />

                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 max-sm:flex-col-reverse">
                            <div>
                                <Link href={`/universities/${singleUniversity.documentId}`}>
                                    <h3 className="text-xl leading-tight font-bold tracking-wide text-slate-900 md:text-2xl">
                                        <span>{singleUniversity.name}</span>

                                        {singleUniversity.acronym && (
                                            <span className="text-slate-500">
                                                &nbsp;|&nbsp;{singleUniversity.acronym}
                                            </span>
                                        )}
                                    </h3>
                                </Link>
                                <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-600 max-sm:gap-1">
                                    <span className="inline-flex items-center gap-1.5 max-sm:items-start">
                                        <HiMapPin className="text-primary-base size-5" />
                                        {singleUniversity?.location?.city ?? '-city-'}
                                        ,&nbsp;
                                        {singleUniversity?.location?.stateProvince ?? '-province-'}
                                        ,&nbsp;
                                        {singleUniversity?.location?.country?.name ?? '-country-'}
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <HiCalendarDays className="text-primary-base size-5" />
                                        Est. {singleUniversity.est}
                                    </span>
                                </div>
                            </div>
                            <span className="border-primary-base/20 bg-primary-base/10 text-primary-base shrink-0 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide">
                                {singleUniversity.type}
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-2.5 max-sm:grid md:grid-cols-3">
                            <Stat
                                Icon={HiBanknotes}
                                label="Scholarship"
                                value={singleUniversity.scholarship ? 'Yes' : 'No'}
                            />
                            <Stat Icon={HiCheckBadge} label="Acceptance" value={singleUniversity.avgAcceptanceRate} />
                            <Stat
                                Icon={HiUsers}
                                label="Foreign Students"
                                value={singleUniversity.avgNumOfForeginStudents}
                            />
                            <Stat Icon={HiAcademicCap} label="Courses" value={singleUniversity.numOfCourses} />
                            <Stat Icon={HiGlobeAlt} label="Locality" value={singleUniversity.campusLocality} />
                            <Stat Icon={HiBuildingOffice2} label="Campuses" value={singleUniversity.numOfCampus} />
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                            <div className="font-medium text-slate-500 max-sm:flex max-sm:flex-col">
                                Tuition Fee:{' '}
                                <span className="text-slate-900">
                                    <span>${singleUniversity.avgTuitionFee?.minimum}</span>
                                    &nbsp;-&nbsp;
                                    <span>${singleUniversity.avgTuitionFee?.maximum}</span>
                                    &nbsp;USD
                                </span>
                            </div>
                            <div className="flex gap-3 max-sm:w-full max-sm:flex-col">
                                <Link
                                    href={`/universities/${singleUniversity.documentId}`}
                                    className="border-primary-base bg-primary-base hover:bg-primary-base/90 focus-visible:ring-primary-base/60 inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus-visible:ring-2 focus-visible:outline-none max-sm:justify-center max-sm:py-3"
                                >
                                    Find More
                                    <HiArrowRight className="h-4 w-4" />
                                </Link>
                                <button
                                    onClick={handleApply}
                                    className="focus-visible:ring-primary-base/60 inline-flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 focus-visible:ring-2 focus-visible:outline-none max-sm:justify-center max-sm:py-3"
                                >
                                    <HiAcademicCap className="size-4 text-green-500" />
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
