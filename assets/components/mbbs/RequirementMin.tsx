// imports
import { MedicalApplicationRequirementType } from '@/assets/types/mbbsTypes';
import { FaGraduationCap } from 'react-icons/fa';
import { GiAtom, GiDna2, GiMicroscope } from 'react-icons/gi';
import { SiTarget } from 'react-icons/si';

// treat only null / undefined as "absent" so a legitimate 0 still renders
const has = (v?: number | null): v is number => v !== undefined && v !== null;

export default function RequirementMin({
    applicationRequirements,
}: {
    applicationRequirements: MedicalApplicationRequirementType;
}) {
    const hasHeroStats =
        has(applicationRequirements.neetScoreMinimum) || has(applicationRequirements.totalGPAMinimum);

    const hasSchoolingRecords =
        has(applicationRequirements.secondaryGPAMinimum) || has(applicationRequirements.higherSecondaryGPAMinimum);

    const hasScienceProficiency =
        has(applicationRequirements.physicsScoreMinimum) ||
        has(applicationRequirements.chemistryScoreMinimum) ||
        has(applicationRequirements.biologyScoreMinimum);

    // nothing to show — render nothing instead of an empty card
    if (!hasHeroStats && !hasSchoolingRecords && !hasScienceProficiency) return null;

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header - Matching your established brand style */}
            <div className="flex items-center gap-3 bg-linear-to-r from-cyan-100 to-blue-400 px-6 py-5">
                <h2 className="text-xl font-bold text-slate-800">Academic Requirements</h2>
            </div>

            <div className="p-6">
                {/* Primary Stats - Bento Grid */}
                {hasHeroStats && (
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {has(applicationRequirements.neetScoreMinimum) && (
                            <div className="flex items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50 p-6">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
                                    <SiTarget size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase max-sm:text-xs">
                                        NEET Minimum
                                    </p>
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {applicationRequirements.neetScoreMinimum}
                                    </h3>
                                </div>
                            </div>
                        )}

                        {has(applicationRequirements.totalGPAMinimum) && (
                            <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm">
                                    <FaGraduationCap size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase max-sm:text-xs">
                                        Total GPA
                                    </p>
                                    <h3 className="text-2xl font-bold text-slate-900">
                                        {applicationRequirements.totalGPAMinimum}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Secondary & Subject Scores */}
                {(hasSchoolingRecords || hasScienceProficiency) && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* GPA Breakdown */}
                        {hasSchoolingRecords && (
                            <div className="space-y-4">
                                <p className="text-xs font-bold tracking-tighter text-slate-400 uppercase max-sm:text-sm">
                                    Schooling Records
                                </p>
                                <div className="space-y-3">
                                    {has(applicationRequirements.secondaryGPAMinimum) && (
                                        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                                            <span className="text-sm font-medium text-slate-600">Secondary GPA</span>
                                            <span className="font-bold text-slate-800">
                                                {applicationRequirements.secondaryGPAMinimum}
                                            </span>
                                        </div>
                                    )}
                                    {has(applicationRequirements.higherSecondaryGPAMinimum) && (
                                        <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                                            <span className="text-sm font-medium text-slate-600">
                                                Higher Secondary GPA
                                            </span>
                                            <span className="font-bold text-slate-800">
                                                {applicationRequirements.higherSecondaryGPAMinimum}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Subject Specifics */}
                        {hasScienceProficiency && (
                            <div className="space-y-4">
                                <p className="text-xs font-bold tracking-tighter text-slate-400 uppercase max-sm:text-sm">
                                    Science Proficiency
                                </p>
                                <div className="space-y-4">
                                    {has(applicationRequirements.physicsScoreMinimum) && (
                                        <SubjectBar
                                            icon={<GiAtom />}
                                            name="Physics"
                                            score={applicationRequirements.physicsScoreMinimum}
                                            color="bg-orange-500"
                                        />
                                    )}
                                    {has(applicationRequirements.chemistryScoreMinimum) && (
                                        <SubjectBar
                                            icon={<GiMicroscope />}
                                            name="Chemistry"
                                            score={applicationRequirements.chemistryScoreMinimum}
                                            color="bg-blue-500"
                                        />
                                    )}
                                    {has(applicationRequirements.biologyScoreMinimum) && (
                                        <SubjectBar
                                            icon={<GiDna2 />}
                                            name="Biology"
                                            score={applicationRequirements.biologyScoreMinimum}
                                            color="bg-emerald-500"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Internal Subject Bar Component
function SubjectBar({
    icon,
    name,
    score,
    color,
}: {
    icon: React.ReactNode;
    name: string;
    score: number;
    color: string;
}) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold max-sm:text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                    <span className="text-slate-400">{icon}</span>
                    {name}
                </div>
                <span className="text-slate-900">{score}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
}
