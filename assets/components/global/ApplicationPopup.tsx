'use client';

import { useEffect, useRef, useState } from 'react';
import {
    HiArrowLeft,
    HiCheck,
    HiDocumentText,
    HiMagnifyingGlass,
    HiOutlineAcademicCap,
    HiXMark,
} from 'react-icons/hi2';
import qs from 'qs';

// ── Types ─────────────────────────────────────────────────────────────────────

interface UniversityOption {
    documentId: string;
    name: string;
    acronym?: string;
    country?: string;
}

interface CourseOption {
    documentId: string;
    courseName: string;
    courseLevel: string;
    degreeName: string;
}

interface ApplicationPopupProps {
    onClose: () => void;
    onSubmit: (data: { universityId: string; courseId: string; notes: string }) => Promise<void>;
    preselectedUniversity?: UniversityOption;
    preselectedCourse?: CourseOption;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
    return (
        <div
            className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                done
                    ? 'bg-blue-600 text-white'
                    : active
                      ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-300'
                      : 'bg-slate-100 text-slate-400'
            }`}
        >
            {done ? <HiCheck className="size-3.5" /> : n}
        </div>
    );
}

function StepBar({ step }: { step: 1 | 2 | 3 }) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
            <StepDot n={1} active={step === 1} done={step > 1} />
            <div className={`h-px flex-1 transition-all ${step > 1 ? 'bg-blue-400' : 'bg-slate-200'}`} />
            <StepDot n={2} active={step === 2} done={step > 2} />
            <div className={`h-px flex-1 transition-all ${step > 2 ? 'bg-blue-400' : 'bg-slate-200'}`} />
            <StepDot n={3} active={step === 3} done={false} />
        </div>
    );
}

// ── University list step ──────────────────────────────────────────────────────

function UniversityStep({ onSelect }: { onSelect: (u: UniversityOption) => void }) {
    const [universities, setUniversities] = useState<UniversityOption[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(
            async () => {
                setLoading(true);
                try {
                    const queryString = qs.stringify(
                        {
                            fields: ['documentId', 'name', 'acronym'],
                            populate: { location: { populate: { country: { fields: ['name'] } } } },
                            filters: query.trim() ? { name: { $containsi: query.trim() } } : undefined,
                            sort: ['name:asc'],
                            pagination: { pageSize: 10 },
                        },
                        { encodeValuesOnly: true },
                    );

                    const res = await fetch(`/api/universities?${queryString}`);
                    const json = await res.json();

                    setUniversities(
                        (json.response?.data ?? []).map(
                            (u: {
                                documentId: string;
                                name: string;
                                acronym?: string;
                                location?: { country?: { name?: string } };
                            }) => ({
                                documentId: u.documentId,
                                name: u.name,
                                acronym: u.acronym,
                                country: u.location?.country?.name,
                            }),
                        ),
                    );
                } catch {
                    setUniversities([]);
                } finally {
                    setLoading(false);
                }
            },
            query ? 400 : 0,
        );

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query]);

    return (
        <div className="space-y-4 p-6">
            <div>
                <p className="mb-1 text-xs font-semibold text-slate-500">Step 1 of 3</p>
                <h3 className="text-sm font-extrabold text-slate-800">Select a university</h3>
            </div>

            {/* Search input */}
            <div className="relative">
                <HiMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search universities…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
                {loading && (
                    <div className="absolute top-1/2 right-3.5 -translate-y-1/2">
                        <div className="size-4 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
                    </div>
                )}
            </div>

            {/* Results list */}
            <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                {!loading && universities.length === 0 ? (
                    <p className="py-10 text-center text-xs text-slate-400">
                        {query ? `No results for "${query}"` : 'No universities found'}
                    </p>
                ) : (
                    universities.map((u) => (
                        <button
                            key={u.documentId}
                            type="button"
                            onClick={() => onSelect(u)}
                            className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3 text-left transition-colors last:border-0 hover:bg-blue-50"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                <HiOutlineAcademicCap className="size-4 text-slate-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-800">{u.name}</p>
                                <p className="truncate text-xs text-slate-400">
                                    {[u.acronym, u.country].filter(Boolean).join(' · ')}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}

// ── Course selection step ─────────────────────────────────────────────────────

function CourseStep({
    university,
    onSelect,
    onBack,
}: {
    university: UniversityOption;
    onSelect: (c: CourseOption) => void;
    onBack: () => void;
}) {
    const [courses, setCourses] = useState<CourseOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<CourseOption | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const queryString = qs.stringify(
                    {
                        fields: ['documentId', 'courseName', 'courseLevel', 'degreeName'],
                        filters: { university: { documentId: { $eq: university.documentId } } },
                        pagination: { pageSize: 100 },
                    },
                    { encodeValuesOnly: true },
                );

                const res = await fetch(`/api/courses?${queryString}`);
                const json = await res.json();

                setCourses(
                    (json.response?.data ?? []).map(
                        (c: { documentId: string; courseName: string; courseLevel: string; degreeName: string }) => ({
                            documentId: c.documentId,
                            courseName: c.courseName,
                            courseLevel: c.courseLevel,
                            degreeName: c.degreeName,
                        }),
                    ),
                );
            } catch {
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [university.documentId]);

    const LEVEL_COLOR: Record<string, string> = {
        Undergraduate: 'bg-blue-50 text-blue-700',
        Postgraduate: 'bg-indigo-50 text-indigo-700',
    };

    return (
        <div className="space-y-4 p-6">
            <div>
                <p className="mb-1 text-xs font-semibold text-slate-500">Step 2 of 3</p>
                <h3 className="text-sm font-extrabold text-slate-800">Select your course</h3>
                <div className="mt-1 flex items-center gap-1.5">
                    <HiOutlineAcademicCap className="size-3.5 text-blue-500" />
                    <p className="text-xs font-medium text-blue-600">{university.name}</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <div className="size-6 animate-spin rounded-full border-2 border-slate-200 border-t-blue-500" />
                </div>
            ) : courses.length === 0 ? (
                <p className="rounded-xl border border-slate-100 bg-slate-50 py-8 text-center text-xs text-slate-400">
                    No courses found for this university
                </p>
            ) : (
                <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                    {courses.map((c) => {
                        const isSelected = selected?.documentId === c.documentId;
                        return (
                            <button
                                key={c.documentId}
                                type="button"
                                onClick={() => setSelected(isSelected ? null : c)}
                                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                                    isSelected
                                        ? 'border-blue-200 bg-blue-50'
                                        : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                <div
                                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                                    }`}
                                >
                                    {isSelected && <HiCheck className="size-3 text-white" />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-slate-800">{c.courseName}</p>
                                    <p className="truncate text-xs text-slate-400">{c.degreeName}</p>
                                </div>
                                <span
                                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${LEVEL_COLOR[c.courseLevel] ?? 'bg-slate-100 text-slate-600'}`}
                                >
                                    {c.courseLevel}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-700"
                >
                    <HiArrowLeft className="size-3.5" />
                    Back
                </button>
                <button
                    type="button"
                    disabled={!selected}
                    onClick={() => selected && onSelect(selected)}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

// ── Notes + submit step ───────────────────────────────────────────────────────

function NotesStep({
    university,
    course,
    onBack,
    onSubmit,
    submitting,
}: {
    university: UniversityOption;
    course: CourseOption;
    onBack?: () => void;
    onSubmit: (notes: string) => void;
    submitting: boolean;
}) {
    const [notes, setNotes] = useState('');

    return (
        <div className="space-y-4 p-6">
            <div>
                <p className="mb-1 text-xs font-semibold text-slate-500">Step 3 of 3</p>
                <h3 className="text-sm font-extrabold text-slate-800">Review & submit</h3>
                <p className="mt-0.5 text-xs text-slate-400">Add any notes and confirm your application</p>
            </div>

            {/* Summary card */}
            <div className="space-y-2 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start gap-2.5">
                    <HiOutlineAcademicCap className="mt-0.5 size-4 shrink-0 text-slate-400" />
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">University</p>
                        <p className="text-sm font-semibold text-slate-800">{university.name}</p>
                        {university.country && <p className="text-xs text-slate-400">{university.country}</p>}
                    </div>
                </div>
                <div className="flex items-start gap-2.5 border-t border-slate-100 pt-2">
                    <HiDocumentText className="mt-0.5 size-4 shrink-0 text-slate-400" />
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Course</p>
                        <p className="text-sm font-semibold text-slate-800">{course.courseName}</p>
                        <p className="text-xs text-slate-400">
                            {course.degreeName} · {course.courseLevel}
                        </p>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Notes <span className="font-normal text-slate-300 normal-case">(optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Deadlines, portal links, contacts…"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                {onBack ? (
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={submitting}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-700 disabled:opacity-40"
                    >
                        <HiArrowLeft className="size-3.5" />
                        Back
                    </button>
                ) : (
                    <span />
                )}
                <button
                    type="button"
                    onClick={() => onSubmit(notes)}
                    disabled={submitting}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? (
                        <>
                            <div className="size-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Submitting…
                        </>
                    ) : (
                        <>
                            <HiCheck className="size-3.5" />
                            Submit Application
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

// ── Root popup ────────────────────────────────────────────────────────────────

export default function ApplicationPopup({ onClose, onSubmit, preselectedUniversity, preselectedCourse }: ApplicationPopupProps) {
    const bothPreselected = !!(preselectedUniversity && preselectedCourse);
    const [step, setStep] = useState<1 | 2 | 3>(bothPreselected ? 3 : preselectedUniversity ? 2 : 1);
    const [university, setUniversity] = useState<UniversityOption | null>(preselectedUniversity ?? null);
    const [course, setCourse] = useState<CourseOption | null>(preselectedCourse ?? null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(notes: string) {
        if (!university || !course) return;
        setSubmitting(true);
        try {
            await onSubmit({ universityId: university.documentId, courseId: course.documentId, notes });
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-6 py-5">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 z-100 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-red-400 active:scale-95"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                            <HiDocumentText className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">Add Application</h2>
                            <p className="text-xs text-blue-100/80">Track your university application</p>
                        </div>
                    </div>
                </div>

                {/* Step bar — hidden when both university and course are preselected */}
                {!bothPreselected && <StepBar step={step} />}

                {/* Steps */}
                {step === 1 && (
                    <UniversityStep
                        onSelect={(u) => {
                            setUniversity(u);
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && university && (
                    <CourseStep
                        university={university}
                        onSelect={(c) => {
                            setCourse(c);
                            setStep(3);
                        }}
                        onBack={() => {
                            setUniversity(null);
                            setStep(1);
                        }}
                    />
                )}
                {step === 3 && university && course && (
                    <NotesStep
                        university={university}
                        course={course}
                        onBack={bothPreselected ? undefined : () => {
                            setCourse(null);
                            setStep(2);
                        }}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                )}
            </div>
        </div>
    );
}
