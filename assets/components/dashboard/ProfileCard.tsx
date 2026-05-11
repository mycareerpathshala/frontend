'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { useState } from 'react';
import {
    HiAcademicCap,
    HiArrowPath,
    HiCheck,
    HiCheckBadge,
    HiEnvelope,
    HiExclamationTriangle,
    HiLockClosed,
    HiPhone,
    HiSparkles,
    HiUser,
    HiXMark,
} from 'react-icons/hi2';
import { MdSchool, MdScience, MdLocalHospital, MdWork, MdCastForEducation, MdAutoStories } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';

// ── Study level options ──────────────────────────────────────────────────────

interface StudyLevel {
    id: string;
    label: string;
    sub: string;
    Icon: React.ElementType;
    color: string; // Tailwind bg class for the icon badge
    textColor: string; // Tailwind text class for the icon
}

const STUDY_LEVELS: StudyLevel[] = [
    {
        id: 'mbbs',
        label: 'MBBS Abroad',
        sub: 'Study medicine at top global medical universities',
        Icon: MdLocalHospital,
        color: 'bg-red-50',
        textColor: 'text-red-500',
    },
    {
        id: 'undergraduate',
        label: 'Undergraduate (UG)',
        sub: "Bachelor's degree programs worldwide",
        Icon: MdSchool,
        color: 'bg-blue-50',
        textColor: 'text-blue-500',
    },
    {
        id: 'postgraduate',
        label: 'Postgraduate (PG)',
        sub: "Master's and advanced degree programs",
        Icon: HiAcademicCap,
        color: 'bg-indigo-50',
        textColor: 'text-indigo-500',
    },
    {
        id: 'phd',
        label: 'PhD / Doctorate',
        sub: 'Research-based doctoral programs',
        Icon: MdScience,
        color: 'bg-purple-50',
        textColor: 'text-purple-500',
    },
    {
        id: 'diploma',
        label: 'Diploma / Certificate',
        sub: 'Short-term professional certification courses',
        Icon: TbCertificate,
        color: 'bg-amber-50',
        textColor: 'text-amber-500',
    },
    {
        id: 'foundation',
        label: 'Foundation / Pathway',
        sub: 'Pre-university preparatory programs',
        Icon: MdCastForEducation,
        color: 'bg-green-50',
        textColor: 'text-green-500',
    },
    {
        id: 'vocational',
        label: 'Vocational Training',
        sub: 'Skill-based and trade qualification programs',
        Icon: MdWork,
        color: 'bg-orange-50',
        textColor: 'text-orange-500',
    },
    {
        id: 'language',
        label: 'Language Course',
        sub: 'Improve language skills at top language schools',
        Icon: MdAutoStories,
        color: 'bg-teal-50',
        textColor: 'text-teal-500',
    },
];

// ── Popup component ──────────────────────────────────────────────────────────

function StudyLevelSelectorPopUp({
    current,
    onClose,
    onConfirm,
}: {
    current: string | null;
    onClose: () => void;
    onConfirm: (id: string) => void;
}) {
    const [selected, setSelected] = useState<string | null>(current);

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Blurred dark overlay */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

            {/* Modal card */}
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-6 py-5">
                    {/* Dot pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 z-100 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-red-400"
                    >
                        <HiXMark className="size-4" />
                    </button>

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                            <HiSparkles className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">Select Study Level</h2>
                            <p className="text-xs text-blue-100/80">Choose your preferred level of study abroad</p>
                        </div>
                    </div>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-2 gap-2.5 p-5">
                    {STUDY_LEVELS.map((level) => {
                        const isSelected = selected === level.id;
                        return (
                            <button
                                key={level.id}
                                type="button"
                                onClick={() => setSelected(level.id)}
                                className={`relative flex items-start gap-3 rounded-2xl border-2 px-3.5 py-3 text-left transition-all duration-150 select-none ${
                                    isSelected
                                        ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-100'
                                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
                                }`}
                            >
                                {/* Icon badge */}
                                <div
                                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl ${level.color}`}
                                >
                                    <level.Icon className={`size-4 ${level.textColor}`} />
                                </div>

                                {/* Text */}
                                <div className="min-w-0 flex-1">
                                    <p
                                        className={`text-xs leading-snug font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}
                                    >
                                        {level.label}
                                    </p>
                                    <p className="mt-0.5 text-[10px] leading-relaxed text-slate-400">{level.sub}</p>
                                </div>

                                {/* Selected tick */}
                                {isSelected && (
                                    <div className="absolute top-2.5 right-2.5 flex size-4.5 items-center justify-center rounded-full bg-blue-500">
                                        <HiCheck className="size-3 text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                    <p className="text-xs text-slate-400">You can change this preference anytime.</p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => selected && onConfirm(selected)}
                            disabled={!selected}
                            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <HiCheck className="size-4" />
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Constants ────────────────────────────────────────────────────────────────

const COMPLETION = 20;

// ── ProfileCard ──────────────────────────────────────────────────────────────

export default function ProfileCard() {
    const { session } = useAppContext();
    const fullName = session ? `${session.firstName} ${session.lastName}` : 'Student';

    const [popupOpen, setPopupOpen] = useState(false);
    const [studyLevel, setStudyLevel] = useState<string | null>(null);

    const currentLevel = studyLevel ? STUDY_LEVELS.find((l) => l.id === studyLevel) : null;

    function handleConfirm(id: string) {
        setStudyLevel(id);
        setPopupOpen(false);
    }

    return (
        <>
            {/* Study level popup — rendered at root level to escape any stacking context */}
            {popupOpen && (
                <StudyLevelSelectorPopUp
                    current={studyLevel}
                    onClose={() => setPopupOpen(false)}
                    onConfirm={handleConfirm}
                />
            )}

            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm ring-1 ring-slate-100">
                {/* ── Gradient header ── */}
                <div className="border-b border-blue-200 bg-linear-to-br from-blue-600 via-blue-500 to-indigo-400 p-5">
                    <div className="mb-3 inline-flex rounded-xl bg-white shadow-lg backdrop-blur-sm">
                        <div className="size-16 overflow-hidden rounded-[10px] p-1">
                            {session ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={`/img/auth/avatars/${session.avatar}`}
                                    alt="Profile"
                                    className="block size-full object-cover"
                                />
                            ) : (
                                <div className="flex size-full items-center justify-center">
                                    <HiUser className="size-9 text-slate-300" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-0.5 text-sm font-bold text-white">{fullName}</h2>
                        <p className="truncate text-xs text-blue-100/80">{session?.email ?? 'student@example.com'}</p>
                    </div>
                </div>

                <div className="p-5">
                    {/* Profile completion */}
                    <div className="mb-5 rounded-xl bg-slate-50 p-3.5 ring-1 ring-slate-100">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500">Profile Complete</span>
                            <span className="text-xs font-bold text-blue-600">{COMPLETION}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-700"
                                style={{ width: `${COMPLETION}%` }}
                            />
                        </div>
                        <p className="mt-2 text-xs text-slate-400">Complete your profile to unlock all features.</p>
                    </div>

                    {/* Preferred study level */}
                    <div className="mb-5">
                        <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Preferred Study Level
                        </p>
                        <div
                            className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 ${currentLevel ? 'border-blue-100 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}
                        >
                            <div className="flex items-center gap-2">
                                {currentLevel ? (
                                    <>
                                        <currentLevel.Icon className={`size-4 shrink-0 ${currentLevel.textColor}`} />
                                        <span className="text-sm font-semibold text-blue-700">
                                            {currentLevel.label}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm text-slate-400">Select study level...</span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setPopupOpen(true)}
                                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-blue-500 transition-colors select-none hover:text-blue-700"
                            >
                                <HiArrowPath className="size-3" />
                                {currentLevel ? 'Change' : 'Select'}
                            </button>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="mb-5 space-y-2">
                        <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Contact Info
                        </p>
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                            <HiPhone className="size-4 shrink-0 text-slate-400" />
                            <span className="flex-1 text-sm text-slate-600">+91 - 851-000-8178</span>
                            <HiCheckBadge className="size-4.5 shrink-0 text-green-500" />
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                            <HiEnvelope className="size-4 shrink-0 text-slate-400" />
                            <span className="flex-1 truncate text-sm text-slate-600">
                                {session?.email ?? 'xyz@gmail.com'}
                            </span>
                            <button
                                type="button"
                                className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500 transition-colors select-none hover:text-amber-700"
                            >
                                <HiExclamationTriangle className="size-3.5" />
                                Verify
                            </button>
                        </div>
                    </div>

                    {/* Account details */}
                    <div className="mb-5 space-y-2">
                        <p className="mb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            Account Details
                        </p>
                        <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                            <p className="mb-0.5 text-[10px] text-slate-400">Email</p>
                            <p className="truncate text-sm text-slate-600">{session?.email ?? 'xyz@gmail.com'}</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                            <HiLockClosed className="size-4 shrink-0 text-slate-400" />
                            <div>
                                <p className="mb-0.5 text-[10px] text-slate-400">Password</p>
                                <p className="text-sm tracking-[0.25em] text-slate-500">••••••••••••••</p>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-center">
                        <Link
                            href="/dashboard/profile"
                            className="rounded-lg bg-blue-600 px-6 py-1.5 text-sm font-semibold text-white shadow-xs transition-all select-none hover:bg-blue-500 hover:shadow-md"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
