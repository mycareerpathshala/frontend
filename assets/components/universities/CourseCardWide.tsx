/* eslint-disable @next/next/no-img-element */
// imports

import { CourseType } from '@/assets/types/courseTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityType } from '@/assets/types/universityTypes';
import Link from 'next/link';
import { HiAcademicCap, HiBanknotes } from 'react-icons/hi2';

// loca components
function ExamIcon({ imgFileName, altText }: { imgFileName: string; altText: string }) {
    return (
        <span className="relative">
            <img src={`/img/exams/${imgFileName}`} alt={altText} />
        </span>
    );
}

export default function CourseCardWide({
    courseData,
    universityData,
}: {
    courseData: CourseType & StrapiDataType;
    universityData: UniversityType & StrapiDataType;
}) {
    return (
        <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(93deg,rgba(240,245,253,0.75)_2.36%,rgba(183,233,255,0.75)_142.86%)] px-6 py-3 shadow-lg max-md:p-4 max-sm:p-3 max-sm:py-4">
            <div className="flex items-center justify-start gap-5">
                {/* icons */}
                <div className="">
                    <HiAcademicCap className="size-18 text-blue-500" />
                </div>

                {/* info */}
                <div>
                    <h3 className="text-primary-base text-lg leading-normal">
                        <Link href={`/courses/${courseData.documentId}`} className="font-bold hover:underline">
                            {courseData.courseName}
                        </Link>
                        &nbsp;|&nbsp;
                        <span className="font-medium">{courseData.majorName}</span>
                    </h3>
                    <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs max-md:gap-1">
                        <span className="block">
                            Course Duration: <span className="text-primary-base">{courseData.courseDuration}</span>
                        </span>
                        &nbsp;|&nbsp;
                        <span className="block">
                            Delivery Method: <span className="text-primary-base">{courseData.deliveryMethod}</span>
                        </span>
                        &nbsp;|&nbsp;
                        <span className="block">
                            Teaching Language: <span className="text-primary-base">{courseData.teachingLanguage}</span>
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 max-[800px]:gap-1.5">
                <span className="text-sm">Accepted Exams:</span>
                <div className="flex items-center gap-9 max-md:flex-wrap max-md:gap-2 max-sm:gap-2">
                    <span className="flex flex-wrap items-center gap-2">
                        <ExamIcon imgFileName="ielts.svg" altText="IELTS Logo" />
                        <ExamIcon imgFileName="cambridge.svg" altText="Cambridge Logo" />
                        <ExamIcon imgFileName="toefl.svg" altText="ToeflIbt Logo" />
                        <ExamIcon imgFileName="duolingo.svg" altText="Duolingo Logo" />
                        <ExamIcon imgFileName="pte.svg" altText="pteAcademic Logo" />
                        <ExamIcon imgFileName="toeic.svg" altText="Toeic Logo" />
                    </span>

                    <span className="flex flex-wrap items-center gap-2">
                        <ExamIcon imgFileName="gmat.svg" altText="GMAT Logo" />
                        <ExamIcon imgFileName="gre.svg" altText="GRE Logo" />
                        <ExamIcon imgFileName="sat.svg" altText="SAT Logo" />
                        <ExamIcon imgFileName="act.svg" altText="ACT Logo" />
                    </span>
                </div>
            </div>

            {/* tuition fee */}
            <div className="mt-6 flex items-center justify-between text-sm max-[1060px]:flex-col max-[1060px]:items-start max-[1060px]:gap-3">
                <div className="flex w-fit flex-wrap items-center gap-4 max-[800px]:gap-1.5 max-sm:flex-col">
                    <div className="flex items-center gap-2">
                        <span>
                            <HiBanknotes className="size-6 text-yellow-500" />
                        </span>
                        <span className="text-xs">Tuition Fees: </span>
                        <span className="flex flex-col items-center gap-1 rounded-lg bg-linear-to-r from-yellow-50 to-white px-3 py-2 max-sm:flex-row max-sm:gap-3">
                            <span className="text-primary-base text-sm font-bold">
                                ${universityData.avgTuitionFee?.minimum.toLocaleString()} -{' '}
                                {universityData.avgTuitionFee?.maximum.toLocaleString()}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-3 max-sm:mt-4">
                <div className="flex items-center gap-3 text-xs max-sm:flex-col max-sm:items-start max-sm:gap-1">
                    <span className="flex items-center gap-2 border-r pr-3 max-sm:border-r-0">
                        Course Type: <span className="text-primary-base">{courseData.courseLevel}</span>
                    </span>
                    <span className="flex items-center gap-2">
                        Course Offerings: <span className="text-primary-base">{courseData.courseOfferings}</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 max-sm:w-full max-sm:flex-col">
                    <Link
                        href="/auth/register"
                        className="bg-primary-base border-primary-base hover:bg-primary-light cursor-pointer rounded-lg border px-4 py-2 text-center text-sm text-white transition-colors duration-200 ease-in-out select-none max-sm:w-full"
                    >
                        Check Eligibility
                    </Link>
                    <Link
                        href="/auth/register"
                        className="border-primary-base text-primary-base hover:bg-primary-gray cursor-pointer rounded-lg border bg-white px-4 py-2 text-center text-sm transition-colors duration-200 ease-in-out select-none max-sm:w-full"
                    >
                        Apply Now
                    </Link>
                </div>
            </div>
            <div className="absolute -top-14.25 -right-13.5 -z-50 h-75 w-87.5 rotate-[-33deg] transform rounded-lg bg-blue-200"></div>
        </div>
    );
}
