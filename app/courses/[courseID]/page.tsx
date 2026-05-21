/* eslint-disable @next/next/no-img-element */
// imports
import Breadcrumb from '@/assets/components/global/Breadcrumb';
import ExamContainer from '@/assets/components/course/ExamContainer';
import ApplyNowButton from '@/assets/components/global/ApplyNowButton';
import { getCourseIds, getSingleCourseData } from '@/assets/lib/cms/fetchCourse';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    HiAcademicCap,
    HiArrowTopRightOnSquare,
    HiBookOpen,
    HiCalendarDays,
    HiClock,
    HiGlobeAlt,
    HiMapPin,
} from 'react-icons/hi2';

// dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ courseID: string }> }): Promise<Metadata> {
    const { courseID } = await params;
    const res = await getSingleCourseData(courseID);
    if (!res?.data) return { title: 'Course' };
    const c = res.data;
    const uniName = c.university?.name ? ` at ${c.university.name}` : '';
    return {
        title: `${c.courseName}${uniName} — Fees & Admission`,
        description: `Explore ${c.courseName}${uniName}: duration, tuition fees, delivery method, exam requirements, and application details. Apply through My Career Pathshala.`,
        openGraph: {
            title: `${c.courseName}${uniName} | My Career Pathshala`,
            description: `${c.courseLevel} program details, fees, and admission for ${c.courseName}${uniName}.`,
            type: 'website',
        },
    };
}

// static params
export async function generateStaticParams() {
    const response = await getCourseIds();
    if (!response) return [];
    return response.data.map((course) => ({ courseID: course.documentId }));
}

export default async function SingleCoursePage({ params }: { params: Promise<{ courseID: string }> }) {
    const { courseID } = await params;
    const courseDataResponse = await getSingleCourseData(courseID);

    if (!courseDataResponse || !courseDataResponse.data) {
        notFound();
    }

    const course = courseDataResponse.data;
    const university = course.university;

    const upcomingDates =
        university?.applicationDateList?.filter((d) => {
            const date = new Date(d.startDate);
            date.setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date >= today;
        }) ?? [];

    const totalFee = course.tuitionFeeByYear?.reduce((sum, f) => sum + f.tuitionFee, 0) ?? 0;

    return (
        <main className="relative px-4">
            {/* breadcrumb */}
            <Breadcrumb
                crumblist={[
                    { level: 1, label: 'Courses', url: '/courses' },
                    { level: 2, label: course.courseName, url: `/courses/${course.documentId}` },
                ]}
            />

            {/* hero */}
            <section className="mx-auto w-full max-w-7xl">
                <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                        backgroundImage: university?.universityMediaContent?.coverPhoto?.formats?.medium?.url
                            ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${university.universityMediaContent.coverPhoto.formats.medium.url})`
                            : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#1a4870',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
                        {/* level + stream badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-block rounded-full bg-blue-500/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                {course.courseLevel}
                            </span>
                            {course.stream && (
                                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                    {course.stream.name}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-3 text-3xl font-extrabold text-white max-sm:text-2xl md:text-4xl">
                            {course.courseName}
                        </h1>
                        <p className="mt-1 text-lg font-light text-blue-100 max-sm:text-base">{course.majorName}</p>
                        <p className="mt-0.5 text-sm text-blue-200">{course.degreeName}</p>

                        {/* university info row */}
                        {university && (
                            <div className="mt-5 flex items-center gap-3">
                                {university.universityMediaContent?.logo?.url && (
                                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white/50">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${university.universityMediaContent.logo.url}`}
                                            alt={`${university.name} logo`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <Link
                                        href={`/universities/${university.documentId}`}
                                        className="flex items-center gap-1 font-semibold text-white hover:underline"
                                    >
                                        {university.name}
                                        <HiArrowTopRightOnSquare className="size-3.5 opacity-70" />
                                    </Link>
                                    {university.location && (
                                        <p className="mt-0.5 flex items-center gap-1 text-xs text-blue-100">
                                            <HiMapPin className="size-3 shrink-0" />
                                            {university.location.city}
                                            {university.location.country?.name
                                                ? `, ${university.location.country.name}`
                                                : ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* key stats strip */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        {
                            icon: <HiClock className="size-5 shrink-0 text-blue-500" />,
                            label: 'Duration',
                            value: `${course.courseDuration} Year${course.courseDuration !== 1 ? 's' : ''}`,
                        },
                        {
                            icon: <HiBookOpen className="size-5 shrink-0 text-blue-500" />,
                            label: 'Delivery',
                            value: course.deliveryMethod,
                        },
                        {
                            icon: <HiGlobeAlt className="size-5 shrink-0 text-blue-500" />,
                            label: 'Language',
                            value: course.teachingLanguage,
                        },
                        {
                            icon: <HiAcademicCap className="size-5 shrink-0 text-blue-500" />,
                            label: 'Offering',
                            value: course.courseOfferings,
                        },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                        >
                            {stat.icon}
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase max-sm:text-[10px]">
                                    {stat.label}
                                </p>
                                <p className="truncate text-sm font-semibold text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* main content + sidebar */}
            <section className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-[1fr_300px] gap-6 pb-16 max-lg:grid-cols-1">
                {/* LEFT: main content */}
                <div className="space-y-6">
                    {/* course description */}
                    {course.courseDescription && (
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                                <h2 className="text-xl font-bold text-slate-800 max-sm:text-lg">About This Course</h2>
                            </div>
                            <p className="px-6 py-5 text-sm leading-relaxed text-slate-700 max-sm:px-4">
                                {course.courseDescription}
                            </p>
                        </div>
                    )}

                    {/* course details table */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                            <h2 className="text-xl font-bold text-slate-800 max-sm:text-lg">Course Details</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {(
                                [
                                    { label: 'Degree Name', value: course.degreeName },
                                    { label: 'Major', value: course.majorName },
                                    { label: 'Program Level', value: course.courseLevel },
                                    {
                                        label: 'Duration',
                                        value: `${course.courseDuration} Year${course.courseDuration !== 1 ? 's' : ''}`,
                                    },
                                    { label: 'Teaching Language', value: course.teachingLanguage },
                                    { label: 'Delivery Method', value: course.deliveryMethod },
                                    { label: 'Course Offerings', value: course.courseOfferings },
                                    ...(course.stream ? [{ label: 'Stream', value: course.stream.name }] : []),
                                ] as { label: string; value: string }[]
                            ).map((row, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-between px-6 py-3 max-sm:px-4 ${i % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}
                                >
                                    <span className="text-sm text-slate-500">{row.label}</span>
                                    <span className="text-sm font-semibold text-slate-800">{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* tuition fee by year */}
                    {course.tuitionFeeByYear && course.tuitionFeeByYear.length > 0 && (
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                                <h2 className="text-xl font-bold text-slate-800 max-sm:text-lg">Tuition Fee by Year</h2>
                            </div>
                            {/* total fee summary */}
                            <div className="flex items-center gap-4 border-b border-gray-100 bg-blue-50 px-6 py-4 max-sm:px-4">
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Total Course Fee
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900">${totalFee.toLocaleString()}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Avg. Per Year
                                    </p>
                                    <p className="text-lg font-semibold text-blue-600">
                                        ${Math.round(totalFee / course.tuitionFeeByYear.length).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-indigo-50 text-left">
                                            <th className="px-6 py-3 text-sm font-semibold text-slate-600 max-sm:px-4">
                                                Year
                                            </th>
                                            <th className="px-6 py-3 text-sm font-semibold text-slate-600 max-sm:px-4">
                                                Tuition Fee (USD)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {course.tuitionFeeByYear.map((fee, i) => (
                                            <tr key={fee.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                <td className="px-6 py-3 text-sm text-slate-700 capitalize max-sm:px-4">
                                                    {fee.selectYear} Year
                                                </td>
                                                <td className="px-6 py-3 text-sm font-semibold text-slate-800 max-sm:px-4">
                                                    ${fee.tuitionFee.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* exam requirements */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                            <h2 className="text-xl font-bold text-slate-800 max-sm:text-lg">Exam Requirements</h2>
                        </div>
                        <div className="px-6 py-5 max-sm:px-4">
                            <p className="mb-4 text-sm text-slate-500">
                                Accepted language & standardised exams for{' '}
                                <span className="font-semibold text-slate-700">{course.courseLevel}</span> admission:
                            </p>
                            <ExamContainer examLevel={course.courseLevel} />
                        </div>
                    </div>
                </div>

                {/* RIGHT: sidebar */}
                <div className="flex flex-col gap-4 max-lg:order-first max-lg:flex-row max-lg:flex-wrap max-sm:flex-col">
                    {/* apply CTA */}
                    <div className="min-w-65 flex-1 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 p-5">
                        <h3 className="text-base font-semibold text-slate-800">Ready to Apply?</h3>
                        <p className="mt-1 text-sm text-slate-500">Take the next step towards your academic journey.</p>
                        <div className="mt-4 flex flex-col gap-2">
                            <ApplyNowButton
                                className="bg-primary-base hover:bg-primary-light block w-full rounded-xl py-2.5 text-center text-sm font-semibold text-white transition-colors duration-200 select-none"
                                university={university ? {
                                    documentId: university.documentId,
                                    name: university.name,
                                    acronym: university.acronym ?? undefined,
                                    country: university.location?.country?.name ?? undefined,
                                } : undefined}
                                course={{
                                    documentId: course.documentId,
                                    courseName: course.courseName,
                                    courseLevel: course.courseLevel,
                                    degreeName: course.degreeName,
                                }}
                            />
                            <Link
                                href="/dashboard/counselling"
                                className="border-primary-base text-primary-base hover:bg-primary-base block w-full rounded-xl border bg-white py-2.5 text-center text-sm font-semibold transition-colors duration-200 select-none hover:text-white"
                            >
                                Talk to Counsellor
                            </Link>
                        </div>
                    </div>

                    {/* university card */}
                    {university && (
                        <div className="min-w-65 flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-3">
                                <p className="text-sm font-bold text-slate-800">Offered By</p>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-3">
                                    {university.universityMediaContent?.logo?.url && (
                                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-gray-200">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${university.universityMediaContent.logo.url}`}
                                                alt={`${university.name} logo`}
                                                className="absolute inset-0 h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {university.name}
                                        </p>
                                        {university.location && (
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                                                <HiMapPin className="size-3 shrink-0" />
                                                <span className="truncate">
                                                    {university.location.city}
                                                    {university.location.country?.name
                                                        ? `, ${university.location.country.name}`
                                                        : ''}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={`/universities/${university.documentId}`}
                                    className="mt-4 block w-full rounded-xl border border-gray-200 py-2 text-center text-sm font-medium text-blue-600 transition-colors duration-200 select-none hover:bg-blue-50"
                                >
                                    View University →
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* upcoming application dates */}
                    {upcomingDates.length > 0 && (
                        <div className="min-w-65 flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-3">
                                <p className="text-sm font-bold text-slate-800">Upcoming Application Dates</p>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {upcomingDates.map((date, i) => (
                                    <div key={i} className="flex items-start gap-3 px-4 py-3">
                                        <HiCalendarDays className="mt-0.5 size-4 shrink-0 text-blue-500" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-700">{date.session}</p>
                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {new Date(date.startDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                                {' — '}
                                                {new Date(date.endDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* disclaimer */}
                    <div className="min-w-65 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                        <p className="text-xs font-semibold text-amber-800">
                            Note: Course details and fee structure may vary. Please verify with the university directly
                            before applying.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
