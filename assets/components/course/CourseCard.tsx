/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import { mediaUrl } from '@/assets/utilities/mediaUrl';
import ApplicationPopup from '@/assets/components/global/ApplicationPopup';
import { useAppContext } from '@/assets/context/AppContext';
import { CourseType } from '@/assets/types/courseTypes';
import Link from 'next/link';
import { useMemo, memo, useState } from 'react';
import { HiCalendarDays, HiMapPin } from 'react-icons/hi2';
import ExamContainer from './ExamContainer';

const CourseCard = memo(({ courseData }: { courseData: CourseType & { documentId: string } }) => {
    const { session, setAuthModalEnabled } = useAppContext();
    const [showApply, setShowApply] = useState(false);

    function handleApplyClick() {
        if (!session) {
            setAuthModalEnabled(true);
            return;
        }
        setShowApply(true);
    }

    async function handleSubmit(data: { universityId: string; courseId: string; notes: string }) {
        await fetch('/api/user/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    const upcomingDates = useMemo(() => {
        const dateList = courseData.university?.applicationDateList;
        if (!dateList || dateList.length === 0) return [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Helper to check if a date is future/today
        const isFuture = (dateStr: string) => {
            const d = new Date(dateStr);
            d.setHours(0, 0, 0, 0);
            return d >= today;
        };

        return dateList.filter((d) => isFuture(d.startDate));
    }, [courseData?.university?.applicationDateList]);

    return (
        <>
            {showApply && (
                <ApplicationPopup
                    onClose={() => setShowApply(false)}
                    onSubmit={handleSubmit}
                    preselectedUniversity={
                        courseData.university
                            ? {
                                  documentId: courseData.university.documentId,
                                  name: courseData.university.name,
                                  acronym: courseData.university.acronym,
                                  country: courseData.university.location?.country?.name,
                              }
                            : undefined
                    }
                    preselectedCourse={{
                        documentId: courseData.documentId,
                        courseName: courseData.courseName,
                        courseLevel: courseData.courseLevel,
                        degreeName: courseData.degreeName,
                    }}
                />
            )}
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-linear-to-r from-[#F0F5FD] to-[rgba(147,187,243,0.56)] shadow-md">
                {/* upper section */}
                <div
                    style={{
                        backgroundImage: `url(${mediaUrl(courseData.university?.universityMediaContent?.coverPhoto.formats?.medium?.url)})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        minHeight: '140px',
                        padding: '16px',
                    }}
                >
                    <div className="absolute inset-0 bg-black/35"></div>

                    <div className="itmes-center absolute top-6 z-20 flex gap-2 bg-gray-900/10">
                        <div className="relative h-12.5 w-12.5 rounded-full">
                            <img
                                className="absolute inset-0 overflow-hidden object-cover"
                                src={`${mediaUrl(courseData.university?.universityMediaContent?.logo.url)}`}
                                alt="Stanford University Logo"
                            />
                        </div>
                        <div className="px-1 text-white">
                            <p className="text-lg font-semibold shadow-lg">{courseData.university?.name}</p>
                            <div className="flex items-center gap-1">
                                <span>
                                    <HiMapPin className="size-5 text-white" />
                                </span>
                                <span className="text-xs">
                                    {courseData.university?.location?.city},{' '}
                                    {courseData.university?.location?.country?.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* details section */}
                <div className="p-4 max-lg:px-3 max-sm:pb-0">
                    <div>
                        <div className="text-primary-base">
                            <Link href={`/courses/${courseData.documentId}`} className="hover:underline">
                                <span className="block text-lg font-medium">
                                    {courseData.courseName.length > 32
                                        ? courseData.courseName.slice(0, 29) + '...'
                                        : courseData.courseName}
                                </span>
                            </Link>
                            <span className="text-md block font-light">{courseData.majorName}</span>
                        </div>
                        <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="flex items-center gap-0.5 border-r pr-1.5">
                                <span>Course Duration:</span>&nbsp;
                                <span className="text-primary-base font-medium">{courseData.courseDuration}</span>
                            </span>
                            <span className="flex items-center gap-0.5 border-r pr-1.5">
                                <span>Delivery Method:</span>&nbsp;
                                <span className="text-primary-base font-medium">{courseData.deliveryMethod}</span>
                            </span>
                            <span className="flex items-center gap-0.5 pr-1.5">
                                <span>Teaching Language:</span>&nbsp;
                                <span className="text-primary-base font-medium">{courseData.teachingLanguage}</span>
                            </span>
                        </p>
                    </div>
                    <div className="mt-4">
                        <div>
                            <div className="text-xs">
                                <div className="flex items-start gap-2 max-sm:flex-col">
                                    <div className="flex h-full items-start py-1">
                                        <span className="whitespace-nowrap">Exams:</span>
                                    </div>

                                    <ExamContainer examLevel={courseData.courseLevel} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-4">
                        <div className="flex justify-start gap-3">
                            {upcomingDates.length ? (
                                <>
                                    {upcomingDates.map((applicationDate, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex w-fit items-center gap-3 rounded-xl bg-linear-to-r from-yellow-100 to-white px-2.5 py-2"
                                            >
                                                <span>
                                                    <HiCalendarDays className="size-6 text-yellow-600" />
                                                </span>
                                                <span className="text-xs font-medium">
                                                    <span>{applicationDate.session}</span>
                                                    <span className="ml-1">
                                                        {`${new Date(applicationDate.startDate).getFullYear()}`.slice(
                                                            -2,
                                                        )}
                                                        &apos;
                                                    </span>
                                                </span>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <div className="flex w-fit items-center gap-3 rounded-xl bg-linear-to-r from-yellow-100 to-white px-4 py-2 text-sm">
                                    <HiCalendarDays className="size-6 text-yellow-600" />
                                    <span className="flex flex-col items-center font-bold text-gray-500">- / -</span>
                                </div>
                            )}
                        </div>

                        <div className="flex h-full flex-col gap-2.5">
                            <div className="flex gap-2 max-sm:flex-col">
                                <button
                                    type="button"
                                    onClick={handleApplyClick}
                                    className="border-primary-base bg-primary-base hover:text-primary-base flex-1 cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm font-medium whitespace-nowrap text-white transition-all duration-200 ease-in-out select-none hover:bg-white"
                                >
                                    Apply Now
                                </button>
                                <Link
                                    href={`/courses/${courseData.documentId}`}
                                    className="border-primary-base text-primary-base hover:bg-primary-base flex flex-1 items-center justify-center rounded-lg border bg-white px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out select-none hover:text-white"
                                >
                                    View More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* program info */}

                {/* card footer */}
                <div className="mt-auto">
                    <div className="from-[#F0F5FD] to-[rgba(147,187,243,0.56)] px-6 py-3 max-sm:bg-linear-to-r">
                        <div className="flex flex-col items-start gap-2 text-xs max-sm:gap-1">
                            <div>
                                <span>Program Type:&nbsp;</span>
                                <span className="text-primary-base font-medium">{courseData.courseLevel}</span>
                                &nbsp;|&nbsp;
                            </div>
                            <div>
                                <span>Course Offerings:&nbsp;</span>
                                <span className="text-primary-base font-medium">{courseData.courseOfferings}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 bg-linear-to-r from-[#005FE2] from-24% to-red-500 px-6 py-2 text-sm font-medium max-xl:flex-col max-xl:gap-2 max-sm:px-2">
                        <div>
                            <p className="text-white max-xl:text-center">
                                I am interested!! Help me applying in this course.
                            </p>
                        </div>
                        <div>
                            <Link
                                href="/dashboard/counselling"
                                className="border-primary-base text-primary-base hover:bg-primary-base block cursor-pointer rounded-lg border bg-white px-4 py-2 text-center font-medium transition-all duration-200 ease-in-out select-none hover:text-white max-sm:py-2.5"
                            >
                                Talk To Counsellor
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

// 2. Add a display name for better debugging
CourseCard.displayName = 'CourseCard';

// exports
export default CourseCard;
