/* eslint-disable @next/next/no-img-element */
// imports

import { ApplicationRequirementType } from '@/assets/types/universityTypes';
import Link from 'next/link';
import { BiSolidNote } from 'react-icons/bi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FaLanguage, FaMoneyCheck } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { PiCertificateFill } from 'react-icons/pi';

// exam icon
function ExamIcon({ iconName, score, className }: { iconName: string; score: number | string; className?: string }) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-1.5 rounded-md bg-sky-50 py-3 text-sky-800 shadow-sm ${className}`}
        >
            <span className="font-semibold">
                {typeof score === 'string' ? (score.length > 25 ? score.slice(0, 22) : score) : score}
            </span>
            <span>
                <img src={`/img/exams/${iconName}.svg`} alt={`${iconName} icon`} />
            </span>
        </div>
    );
}

export default function RequirementBlock({
    ugRequirements,
    pgRequirements,
    universityName,
}: {
    ugRequirements: ApplicationRequirementType;
    pgRequirements: ApplicationRequirementType;
    universityName: string;
}) {
    return (
        <div className="mt-6">
            {/* undergraduate details */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                {/* header */}
                <div className="flex items-center justify-between bg-linear-to-r from-sky-100 to-blue-200 px-6 py-2 max-md:flex-col max-md:items-start max-md:gap-3 max-sm:py-3">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center">
                            <HiAcademicCap className="size-10 text-blue-600" />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-xs text-gray-600">{universityName}</span>
                            <span className="text-lg font-semibold">Undergraduate Application Requirements</span>
                        </span>
                    </div>
                    <div>
                        <Link
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-2 py-0.5 text-white"
                            href={ugRequirements?.applicationPortalURL ? ugRequirements.applicationPortalURL : '#'}
                        >
                            <span>
                                <BsBoxArrowUpRight className="size-4" />
                            </span>
                            <span>Application Portal</span>
                        </Link>
                    </div>
                </div>

                {/* content */}
                <div className="grid grid-cols-2 gap-4 bg-white p-4 max-md:grid-cols-1 max-sm:p-2">
                    {/* application fee */}
                    <div className="relative z-40 flex w-full flex-col gap-4 overflow-hidden rounded-lg border border-gray-200 p-6 shadow-md max-sm:p-4">
                        <div className="absolute -top-60 -right-20 -z-40 h-100 w-40 rotate-45 rounded-lg bg-linear-to-t from-emerald-500/40 to-white to-40%"></div>
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-emerald-50 p-3">
                                <FaMoneyCheck className="size-7 text-emerald-600" />
                            </span>
                            <span className="rounded-lg bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-500">
                                Application Fee
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold">
                                ${ugRequirements?.applicationFee?.minimum} - ${ugRequirements?.applicationFee?.maximum}
                            </span>
                            <span className="text-xs text-gray-600">Non-refundable fee</span>
                        </div>
                    </div>
                    {/* english proficiency */}
                    <div className="col-start-1 row-start-2 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-sm:p-4">
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-indigo-50 p-3">
                                <FaLanguage className="size-7 text-indigo-600" />
                            </span>
                            <span className="rounded-lg bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-500">
                                English Proficiency
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {ugRequirements?.englishProficiencyRequirements?.ielts && (
                                <ExamIcon
                                    iconName="ielts"
                                    score={ugRequirements.englishProficiencyRequirements.ielts}
                                />
                            )}

                            {ugRequirements?.englishProficiencyRequirements?.toefl && (
                                <ExamIcon
                                    iconName="toefl"
                                    score={ugRequirements.englishProficiencyRequirements.toefl}
                                />
                            )}

                            {ugRequirements?.englishProficiencyRequirements?.pteAcademic && (
                                <ExamIcon
                                    iconName="pte"
                                    score={ugRequirements.englishProficiencyRequirements.pteAcademic}
                                />
                            )}

                            {ugRequirements?.englishProficiencyRequirements?.duolingo && (
                                <ExamIcon
                                    iconName="duolingo"
                                    score={ugRequirements.englishProficiencyRequirements.duolingo}
                                />
                            )}

                            {ugRequirements?.englishProficiencyRequirements?.toeic && (
                                <ExamIcon
                                    iconName="toeic"
                                    score={ugRequirements.englishProficiencyRequirements.toeic}
                                />
                            )}

                            {ugRequirements?.englishProficiencyRequirements?.cambridge && (
                                <ExamIcon
                                    iconName="cambridge"
                                    score={ugRequirements.englishProficiencyRequirements.cambridge}
                                    className="text-xs"
                                />
                            )}
                        </div>
                    </div>

                    {/* gpa requirements */}
                    <div className="col-start-2 row-start-2 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-md:col-start-1 max-md:row-start-3 max-sm:p-4">
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-rose-50 p-3">
                                <BiSolidNote className="size-7 text-rose-600" />
                            </span>
                            <span className="rounded-lg bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-500">
                                Academic Standing (GPA)
                            </span>
                        </div>
                        <div className="mt-5 flex h-full flex-col justify-between">
                            <div>
                                {/* mid school gpa */}
                                <div className="space-y-2">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-medium text-slate-600">
                                            Middle School GPA (10th)
                                        </span>
                                        <span className="text-sm font-bold text-indigo-600">
                                            {ugRequirements?.midSchoolGPA?.minGPA} /{' '}
                                            {ugRequirements?.midSchoolGPA?.gpaScale}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${((ugRequirements?.midSchoolGPA?.minGPA ?? 3.5) / (ugRequirements?.midSchoolGPA?.gpaScale ?? 4)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* high school gpa */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-medium text-slate-600">
                                            Middle School GPA (10th)
                                        </span>
                                        <span className="text-sm font-bold text-indigo-600">
                                            {ugRequirements?.highSchoolGPA?.minGPA} /{' '}
                                            {ugRequirements?.highSchoolGPA?.gpaScale}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${((ugRequirements?.highSchoolGPA?.minGPA ?? 3.5) / (ugRequirements?.highSchoolGPA?.gpaScale ?? 4)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                                <div className="rounded-md bg-indigo-100 px-3 py-2 text-indigo-600">
                                    <span>
                                        Middle School Percentage:{' '}
                                        <span className="font-semibold">
                                            {ugRequirements?.midSchoolGPA?.minPercentage}
                                        </span>
                                    </span>
                                </div>
                                <div className="rounded-md bg-indigo-100 px-3 py-2 text-indigo-600">
                                    <span>
                                        High School Percentage:{' '}
                                        <span className="font-semibold">
                                            {ugRequirements?.highSchoolGPA?.minPercentage}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* required documents */}
                    {ugRequirements?.requiredDocuments?.length ? (
                        <div className="col-start-1 row-start-3 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-md:row-start-4 max-sm:p-4">
                            <div className="flex items-start justify-between">
                                <span className="rounded-md bg-slate-50 p-3">
                                    <PiCertificateFill className="size-7 text-slate-600" />
                                </span>
                                <span className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-500">
                                    Academic Standing (GPA)
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {ugRequirements.requiredDocuments.map((doc, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`h-2 w-2 rounded-full ${doc.requiredOrNot ? 'bg-slate-600' : 'bg-slate-300'}`}
                                            ></div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-800">{doc.name}</div>
                                                <div className="mt-0.5 text-[10px] font-medium text-slate-500">
                                                    {doc.type} • {doc.requiredOrNot ? 'Mandatory' : 'Optional'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* postgraduate details */}
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 shadow-md">
                {/* header */}
                <div className="flex items-center justify-between bg-linear-to-r from-sky-100 to-blue-200 px-6 py-2 max-md:flex-col max-md:items-start max-md:gap-3 max-sm:py-3">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center">
                            <HiAcademicCap className="size-10 text-blue-600" />
                        </span>
                        <span className="flex flex-col">
                            <span className="text-xs text-gray-600">{universityName}</span>
                            <span className="text-lg font-semibold">Postgraduate Application Requirements</span>
                        </span>
                    </div>
                    <div>
                        <Link
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-2 py-0.5 text-white"
                            href={pgRequirements?.applicationPortalURL ? pgRequirements.applicationPortalURL : '#'}
                        >
                            <span>
                                <BsBoxArrowUpRight className="size-4" />
                            </span>
                            <span>Application Portal</span>
                        </Link>
                    </div>
                </div>

                {/* content */}
                <div className="grid grid-cols-2 gap-4 bg-white p-4 max-md:grid-cols-1 max-sm:p-2">
                    {/* application fee */}
                    <div className="relative z-40 flex w-full flex-col gap-4 overflow-hidden rounded-lg border border-gray-200 p-6 shadow-md max-sm:p-4">
                        <div className="absolute -top-60 -right-20 -z-40 h-100 w-40 rotate-45 rounded-lg bg-linear-to-t from-emerald-500/40 to-white to-40%"></div>
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-emerald-50 p-3">
                                <FaMoneyCheck className="size-7 text-emerald-600" />
                            </span>
                            <span className="rounded-lg bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-500">
                                Application Fee
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold">
                                ${pgRequirements?.applicationFee?.minimum} - ${pgRequirements?.applicationFee?.maximum}
                            </span>
                            <span className="text-xs text-gray-600">Non-refundable fee</span>
                        </div>
                    </div>
                    {/* english proficiency */}
                    <div className="col-start-1 row-start-2 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-sm:p-4">
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-indigo-50 p-3">
                                <FaLanguage className="size-7 text-indigo-600" />
                            </span>
                            <span className="rounded-lg bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-500">
                                English Proficiency
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {pgRequirements?.englishProficiencyRequirements?.ielts && (
                                <ExamIcon
                                    iconName="ielts"
                                    score={pgRequirements.englishProficiencyRequirements.ielts}
                                />
                            )}

                            {pgRequirements?.englishProficiencyRequirements?.toefl && (
                                <ExamIcon
                                    iconName="toefl"
                                    score={pgRequirements.englishProficiencyRequirements.toefl}
                                />
                            )}

                            {pgRequirements?.englishProficiencyRequirements?.pteAcademic && (
                                <ExamIcon
                                    iconName="pte"
                                    score={pgRequirements.englishProficiencyRequirements.pteAcademic}
                                />
                            )}

                            {pgRequirements?.englishProficiencyRequirements?.duolingo && (
                                <ExamIcon
                                    iconName="duolingo"
                                    score={pgRequirements.englishProficiencyRequirements.duolingo}
                                />
                            )}

                            {pgRequirements?.englishProficiencyRequirements?.toeic && (
                                <ExamIcon
                                    iconName="toeic"
                                    score={pgRequirements.englishProficiencyRequirements.toeic}
                                />
                            )}

                            {pgRequirements?.englishProficiencyRequirements?.cambridge && (
                                <ExamIcon
                                    iconName="cambridge"
                                    score={pgRequirements.englishProficiencyRequirements.cambridge}
                                    className="text-xs"
                                />
                            )}
                        </div>
                    </div>

                    {/* gpa requirements */}
                    <div className="col-start-2 row-start-2 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-md:col-start-1 max-md:row-start-3 max-sm:p-4">
                        <div className="flex items-start justify-between">
                            <span className="rounded-md bg-rose-50 p-3">
                                <BiSolidNote className="size-7 text-rose-600" />
                            </span>
                            <span className="rounded-lg bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-500">
                                Academic Standing (GPA)
                            </span>
                        </div>
                        <div className="mt-5 flex h-full flex-col justify-between">
                            <div>
                                {/* mid school gpa */}
                                <div className="space-y-2">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-medium text-slate-600">
                                            Middle School GPA (10th)
                                        </span>
                                        <span className="text-sm font-bold text-indigo-600">
                                            {pgRequirements?.midSchoolGPA?.minGPA} /{' '}
                                            {pgRequirements?.midSchoolGPA?.gpaScale}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${((pgRequirements?.midSchoolGPA?.minGPA ?? 3.5) / (pgRequirements?.midSchoolGPA?.gpaScale ?? 4)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* high school gpa */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-medium text-slate-600">
                                            High School GPA (12th)
                                        </span>
                                        <span className="text-sm font-bold text-indigo-600">
                                            {pgRequirements?.highSchoolGPA?.minGPA} /{' '}
                                            {pgRequirements?.highSchoolGPA?.gpaScale}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${((pgRequirements?.highSchoolGPA?.minGPA ?? 3.5) / (pgRequirements?.highSchoolGPA?.gpaScale ?? 4)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* high school gpa */}
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-medium text-slate-600">Bachelor Degree GPA</span>
                                        <span className="text-sm font-bold text-indigo-600">
                                            {pgRequirements?.bachelorGPA?.minGPA} /{' '}
                                            {pgRequirements?.bachelorGPA?.gpaScale}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${((pgRequirements?.bachelorGPA?.minGPA ?? 3.5) / (pgRequirements?.bachelorGPA?.gpaScale ?? 4)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                                <div className="rounded-md bg-indigo-100 px-3 py-2 text-indigo-600">
                                    <span>
                                        Middle School Percentage:{' '}
                                        <span className="font-semibold">
                                            {pgRequirements?.midSchoolGPA?.minPercentage}
                                        </span>
                                    </span>
                                </div>
                                <div className="rounded-md bg-indigo-100 px-3 py-2 text-indigo-600">
                                    <span>
                                        High School Percentage:{' '}
                                        <span className="font-semibold">
                                            {pgRequirements?.highSchoolGPA?.minPercentage}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* required documents */}
                    {pgRequirements?.requiredDocuments?.length ? (
                        <div className="col-start-1 row-start-3 flex w-full flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md max-md:row-start-4 max-sm:p-4">
                            <div className="flex items-start justify-between">
                                <span className="rounded-md bg-slate-50 p-3">
                                    <PiCertificateFill className="size-7 text-slate-600" />
                                </span>
                                <span className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-500">
                                    Academic Standing (GPA)
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {pgRequirements.requiredDocuments.map((doc, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`h-2 w-2 rounded-full ${doc.requiredOrNot ? 'bg-slate-600' : 'bg-slate-300'}`}
                                            ></div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-800">{doc.name}</div>
                                                <div className="mt-0.5 text-[10px] font-medium text-slate-500">
                                                    {doc.type} • {doc.requiredOrNot ? 'Mandatory' : 'Optional'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* standardize exams */}
                </div>
            </div>
        </div>
    );
}
