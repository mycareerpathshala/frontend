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

interface MbbsCollegeOption {
    documentId: string;
    name: string;
    acronym?: string;
    country?: string;
}

interface MbbsApplicationPopupProps {
    onClose: () => void;
    onSubmit: (data: { universityId: string; notes: string }) => Promise<void>;
    preselectedCollege?: MbbsCollegeOption;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDot({ n, active, done }: { n: number; active: boolean; done: boolean }) {
    return (
        <div
            className={`flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                done
                    ? 'bg-teal-600 text-white'
                    : active
                      ? 'bg-teal-100 text-teal-600 ring-2 ring-teal-300'
                      : 'bg-slate-100 text-slate-400'
            }`}
        >
            {done ? <HiCheck className="size-3.5" /> : n}
        </div>
    );
}

function StepBar({ step }: { step: 1 | 2 }) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-4">
            <StepDot n={1} active={step === 1} done={step > 1} />
            <div className={`h-px flex-1 transition-all ${step > 1 ? 'bg-teal-400' : 'bg-slate-200'}`} />
            <StepDot n={2} active={step === 2} done={false} />
        </div>
    );
}

// ── College search step ───────────────────────────────────────────────────────

function CollegeStep({ onSelect }: { onSelect: (c: MbbsCollegeOption) => void }) {
    const [colleges, setColleges] = useState<MbbsCollegeOption[]>([]);
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

                    const res = await fetch(`/api/mbbs?${queryString}`);
                    const json = await res.json();

                    setColleges(
                        (json.response?.data ?? []).map(
                            (c: {
                                documentId: string;
                                name: string;
                                acronym?: string;
                                location?: { country?: { name?: string } };
                            }) => ({
                                documentId: c.documentId,
                                name: c.name,
                                acronym: c.acronym,
                                country: c.location?.country?.name,
                            }),
                        ),
                    );
                } catch {
                    setColleges([]);
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
                <p className="mb-1 text-xs font-semibold text-slate-500">Step 1 of 2</p>
                <h3 className="text-sm font-extrabold text-slate-800">Select an MBBS college</h3>
            </div>

            <div className="relative">
                <HiMagnifyingGlass className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search MBBS colleges…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
                {loading && (
                    <div className="absolute top-1/2 right-3.5 -translate-y-1/2">
                        <div className="size-4 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500" />
                    </div>
                )}
            </div>

            <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-sm">
                {!loading && colleges.length === 0 ? (
                    <p className="py-10 text-center text-xs text-slate-400">
                        {query ? `No results for "${query}"` : 'No colleges found'}
                    </p>
                ) : (
                    colleges.map((c) => (
                        <button
                            key={c.documentId}
                            type="button"
                            onClick={() => onSelect(c)}
                            className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3 text-left transition-colors last:border-0 hover:bg-teal-50"
                        >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                                <HiOutlineAcademicCap className="size-4 text-teal-500" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-800">{c.name}</p>
                                <p className="truncate text-xs text-slate-400">
                                    {[c.acronym, c.country].filter(Boolean).join(' · ')}
                                </p>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}

// ── Notes + submit step ───────────────────────────────────────────────────────

function NotesStep({
    college,
    onBack,
    onSubmit,
    submitting,
    showBack,
}: {
    college: MbbsCollegeOption;
    onBack: () => void;
    onSubmit: (notes: string) => void;
    submitting: boolean;
    showBack: boolean;
}) {
    const [notes, setNotes] = useState('');

    return (
        <div className="space-y-4 p-6">
            <div>
                <p className="mb-1 text-xs font-semibold text-slate-500">{showBack ? 'Step 2 of 2' : 'Review & submit'}</p>
                <h3 className="text-sm font-extrabold text-slate-800">Review & submit</h3>
                <p className="mt-0.5 text-xs text-slate-400">Add any notes and confirm your MBBS application</p>
            </div>

            {/* Summary card */}
            <div className="space-y-2 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
                <div className="flex items-start gap-2.5">
                    <HiOutlineAcademicCap className="mt-0.5 size-4 shrink-0 text-teal-500" />
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">MBBS College</p>
                        <p className="text-sm font-semibold text-slate-800">{college.name}</p>
                        {college.country && <p className="text-xs text-slate-400">{college.country}</p>}
                    </div>
                </div>
                <div className="flex items-center gap-2 border-t border-teal-100 pt-2">
                    <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-bold text-teal-700">
                        MBBS Program
                    </span>
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
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                {showBack ? (
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
                    className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-teal-200 transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
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

export default function MbbsApplicationPopup({ onClose, onSubmit, preselectedCollege }: MbbsApplicationPopupProps) {
    const [step, setStep] = useState<1 | 2>(preselectedCollege ? 2 : 1);
    const [college, setCollege] = useState<MbbsCollegeOption | null>(preselectedCollege ?? null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(notes: string) {
        if (!college) return;
        setSubmitting(true);
        try {
            await onSubmit({ universityId: college.documentId, notes });
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
                <div className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-cyan-500 px-6 py-5">
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
                            <h2 className="text-base font-extrabold text-white">Add MBBS Application</h2>
                            <p className="text-xs text-teal-100/80">Track your MBBS college application</p>
                        </div>
                    </div>
                </div>

                {/* Step bar — only shown when college search is needed */}
                {!preselectedCollege && <StepBar step={step} />}

                {/* Steps */}
                {step === 1 && (
                    <CollegeStep
                        onSelect={(c) => {
                            setCollege(c);
                            setStep(2);
                        }}
                    />
                )}
                {step === 2 && college && (
                    <NotesStep
                        college={college}
                        showBack={!preselectedCollege}
                        onBack={() => {
                            setCollege(null);
                            setStep(1);
                        }}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                )}
            </div>
        </div>
    );
}
