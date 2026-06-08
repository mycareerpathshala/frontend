/* eslint-disable @next/next/no-img-element */
import { ApplicationRequirementType } from '@/assets/types/universityTypes';
import Link from 'next/link';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FaGlobeAmericas, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi2';

function LanguageBadge({ label, value, iconPath }: { label: string; value: string | number; iconPath: string }) {
    return (
        <div className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-300 bg-linear-to-r from-white to-sky-100 py-4 transition-all duration-200 ease-in-out hover:to-sky-300 hover:shadow-sm">
            <span className="text-3xl font-semibold text-slate-800">{value}</span>
            <div className="relative flex h-6 w-16 items-center justify-center">
                <img src={`/img/exams/${iconPath}`} alt={label} className="absolute inset-0 h-full w-full object-contain" />
            </div>
        </div>
    );
}

function GpaRow({ label, minGPA, gpaScale }: { label: string; minGPA?: number; gpaScale?: number }) {
    if (!minGPA) return null;
    return (
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
            <span className="text-sm text-slate-600">{label}</span>
            {minGPA && gpaScale && (
                <span className="font-bold text-slate-900">{minGPA} / {gpaScale} GPA</span>
            )}
        </div>
    );
}

function RequirementSection({
    requirements,
    title,
}: {
    requirements: ApplicationRequirementType;
    title: string;
}) {
    const ep = requirements?.englishProficiencyRequirements;
    const hasEnglish = ep && Object.values(ep).some((v) => v);

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                    <FaGraduationCap className="size-6 text-blue-500" />
                    {title}
                </h2>
                <div className="flex items-center gap-3">
                    {requirements?.applicationFee && (
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            <FaMoneyBillWave />
                            App Fee: ${requirements.applicationFee.minimum} – ${requirements.applicationFee.maximum}
                        </span>
                    )}
                    <Link
                        href={requirements?.applicationPortalURL ?? '#'}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
                    >
                        <BsBoxArrowUpRight className="size-4" />
                        Application Portal
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-6 p-6">
                {/* English Language Requirements */}
                {hasEnglish && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4">
                            <FaGlobeAmericas className="size-5 text-cyan-500" />
                            <h3 className="text-lg font-bold text-slate-800">English Language Requirements</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
                            {ep?.ielts && <LanguageBadge label="IELTS" value={ep.ielts} iconPath="ielts.svg" />}
                            {ep?.toefl && <LanguageBadge label="TOEFL" value={ep.toefl} iconPath="toefl.svg" />}
                            {ep?.pteAcademic && <LanguageBadge label="PTE" value={ep.pteAcademic} iconPath="pte.svg" />}
                            {ep?.duolingo && <LanguageBadge label="Duolingo" value={ep.duolingo} iconPath="duolingo.svg" />}
                            {ep?.toeic && <LanguageBadge label="TOEIC" value={ep.toeic} iconPath="toeic.svg" />}
                            {ep?.cambridge && (
                                <div className="col-span-full rounded-lg border border-blue-100 bg-blue-50 p-3 text-[11px] text-blue-700 italic">
                                    Cambridge: {ep.cambridge}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Academic Standing (GPA) */}
                {(requirements?.midSchoolGPA || requirements?.highSchoolGPA || requirements?.bachelorGPA) && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800">Academic Standing (GPA)</h3>
                        </div>
                        <div className="flex flex-col gap-3 p-6">
                            {requirements.midSchoolGPA && (
                                <GpaRow
                                    label="Middle School (10th)"
                                    minGPA={requirements.midSchoolGPA.minGPA}
                                    gpaScale={requirements.midSchoolGPA.gpaScale}
                                />
                            )}
                            {requirements.highSchoolGPA && (
                                <GpaRow
                                    label="High School (12th)"
                                    minGPA={requirements.highSchoolGPA.minGPA}
                                    gpaScale={requirements.highSchoolGPA.gpaScale}
                                />
                            )}
                            {requirements.bachelorGPA && (
                                <GpaRow
                                    label="Bachelor's Degree"
                                    minGPA={requirements.bachelorGPA.minGPA}
                                    gpaScale={requirements.bachelorGPA.gpaScale}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Required Documents */}
                {requirements?.requiredDocuments?.length ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                            <h3 className="text-lg font-bold text-slate-800">Required Documents</h3>
                        </div>
                        <div className="flex flex-col gap-2 p-6">
                            {requirements.requiredDocuments.map((doc, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 max-sm:flex-col max-sm:items-start max-sm:gap-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <HiDocumentText
                                            className={`size-5 shrink-0 ${doc.requiredOrNot ? 'text-blue-500' : 'text-slate-400'}`}
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{doc.name}</p>
                                            <p className="text-xs text-slate-500">{doc.type}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                            doc.requiredOrNot
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-slate-100 text-slate-500'
                                        }`}
                                    >
                                        {doc.requiredOrNot ? 'Mandatory' : 'Optional'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
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
        <div className="mt-6 flex flex-col gap-8">
            <RequirementSection
                requirements={ugRequirements}
                title="Undergraduate Application Requirements"
            />
            <RequirementSection
                requirements={pgRequirements}
                title="Postgraduate Application Requirements"
            />
        </div>
    );
}
