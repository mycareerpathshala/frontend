/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MedicalApplicationRequirementType } from '@/assets/types/mbbsTypes';
import { FaGlobeAmericas, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';
import { GiAtom, GiDna2, GiMicroscope } from 'react-icons/gi';
import { SiTarget } from 'react-icons/si';

export default function RequirementMax({
    applicationRequirements,
}: {
    applicationRequirements: MedicalApplicationRequirementType;
}) {
    return (
        <div className="flex flex-col gap-8">
            {/* 1. Academic & Entrance Section */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                        <FaGraduationCap className="size-6 text-blue-500" /> Academic Prerequisites
                    </h2>
                    <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        <FaMoneyBillWave /> App Fee: ${applicationRequirements.applicationFee}
                    </div>
                </div>

                <div className="p-6">
                    {/* Hero Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <StatCard
                            label="NEET Minimum"
                            value={applicationRequirements.neetScoreMinimum}
                            icon={<SiTarget />}
                            theme="rose"
                        />
                        <StatCard
                            label="Total Aggregate"
                            value={`${applicationRequirements.totalGPAMinimum}%`}
                            icon={<FaGraduationCap />}
                            theme="blue"
                        />
                        {applicationRequirements.englishProficiency && (
                            <StatCard
                                label="Language Level"
                                value={`IELTS ${applicationRequirements.englishProficiency.ielts}`}
                                icon={<FaGlobeAmericas />}
                                theme="cyan"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        {/* Subject Specifics */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">PCB Percentage</p>
                            <div className="space-y-4">
                                <SubjectBar
                                    icon={<GiAtom />}
                                    name="Physics"
                                    score={applicationRequirements.physicsScoreMinimum}
                                    color="bg-orange-500"
                                />
                                <SubjectBar
                                    icon={<GiMicroscope />}
                                    name="Chemistry"
                                    score={applicationRequirements.chemistryScoreMinimum}
                                    color="bg-blue-500"
                                />
                                <SubjectBar
                                    icon={<GiDna2 />}
                                    name="Biology"
                                    score={applicationRequirements.biologyScoreMinimum}
                                    color="bg-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Record History */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">GPA History</p>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <span className="text-sm text-slate-600">Secondary (10th)</span>
                                    <span className="font-bold text-slate-900">
                                        {applicationRequirements.secondaryGPAMinimum}%
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <span className="text-sm text-slate-600">Higher Secondary (12th)</span>
                                    <span className="font-bold text-slate-900">
                                        {applicationRequirements.higherSecondaryGPAMinimum}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. English Proficiency & Deadlines Row */}
            {applicationRequirements.englishProficiency && (
                <div className="">
                    {/* English Proficiency Table */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-2">
                        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800">English Language Requirements</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
                            <LanguageBadge
                                label="IELTS"
                                value={applicationRequirements.englishProficiency.ielts}
                                iconPath="ielts.svg"
                            />
                            {applicationRequirements.englishProficiency.toefl && (
                                <LanguageBadge
                                    label="TOEFL"
                                    value={applicationRequirements.englishProficiency.toefl}
                                    iconPath="toefl.svg"
                                />
                            )}
                            {applicationRequirements.englishProficiency.pteAcademic && (
                                <LanguageBadge
                                    label="PTE"
                                    value={applicationRequirements.englishProficiency.pteAcademic}
                                    iconPath="pte.svg"
                                />
                            )}
                            {applicationRequirements.englishProficiency.duolingo && (
                                <LanguageBadge
                                    label="Duolingo"
                                    value={applicationRequirements.englishProficiency.duolingo}
                                    iconPath="duolingo.svg"
                                />
                            )}
                            {applicationRequirements.englishProficiency.toeic && (
                                <LanguageBadge
                                    label="TOEIC"
                                    value={applicationRequirements.englishProficiency.toeic}
                                    iconPath="toeic.svg"
                                />
                            )}
                            {applicationRequirements.englishProficiency.cambridge && (
                                <div className="col-span-full rounded-lg border border-blue-100 bg-blue-50 p-3 text-[11px] text-blue-700 italic">
                                    Cambridge: {applicationRequirements.englishProficiency.cambridge}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper Components
function StatCard({
    label,
    value,
    icon,
    theme,
}: {
    label: string;
    value: string | number;
    icon: any;
    theme: 'rose' | 'blue' | 'cyan';
}) {
    const themes = {
        rose: 'bg-rose-50 border-rose-100 text-rose-500',
        blue: 'bg-blue-50 border-blue-100 text-blue-500',
        cyan: 'bg-cyan-50 border-cyan-100 text-cyan-600',
    };
    return (
        <div className={`flex flex-col gap-4 rounded-2xl border p-5 ${themes[theme]}`}>
            <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">{icon}</div>
            <div className="flex flex-col gap-2">
                <p className="text-sm tracking-widest text-slate-800 uppercase">{label}</p>
                <h3 className="text-2xl font-semibold text-slate-900">{value}</h3>
            </div>
        </div>
    );
}

function LanguageBadge({ label, value, iconPath }: { label: string; value: string | number; iconPath: string }) {
    return (
        <div className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-300 bg-linear-to-r from-white to-sky-100 py-4 transition-all duration-200 ease-in-out hover:to-sky-300 hover:shadow-sm">
            <div className="flex flex-col items-center gap-2">
                {/* <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">{label}</span> */}
                <span className="text-3xl font-semibold text-slate-800">{value}</span>
            </div>
            <div className="relative flex h-6 w-16 items-center justify-center rounded-xl bg-transparent transition-colors">
                {/* Assuming your icons are in /public/icons/exams/ */}
                <img
                    src={`/img/exams/${iconPath}`}
                    alt={label}
                    className="absolute inset-0 h-full w-full object-contain"
                />
            </div>
        </div>
    );
}

function SubjectBar({ icon, name, score, color }: { icon: any; name: string; score: number; color: string }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-700">
                    <span className="text-slate-400">{icon}</span> {name}
                </div>
                <span className="text-slate-900">{score}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>
    );
}
