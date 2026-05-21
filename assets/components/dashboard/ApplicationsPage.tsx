'use client';

// imports
import ApplicationPopup from '@/assets/components/global/ApplicationPopup';
import { useAppContext } from '@/assets/context/AppContext';
import { APPLICATION_STATUS_CONFIG, ApplicationStatus } from '@/assets/lib/applications';
import { EnrichedApplication } from '@/assets/types/applicationTypes';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
    HiArrowLeft,
    HiBookOpen,
    HiCalendarDays,
    HiCheck,
    HiClock,
    HiDocumentText,
    HiGlobeAlt,
    HiOutlineAcademicCap,
    HiPlus,
    HiTrash,
} from 'react-icons/hi2';
import { MdOutlineSchool } from 'react-icons/md';

const STATUS_TABS: { key: ApplicationStatus | 'all'; label: string }[] = [
    { key: 'all',           label: 'All' },
    { key: 'submitted',     label: 'Submitted' },
    { key: 'under_review',  label: 'Under Review' },
    { key: 'offer_received',label: 'Offer Received' },
    { key: 'accepted',      label: 'Accepted' },
    { key: 'rejected',      label: 'Rejected' },
    { key: 'draft',         label: 'Draft' },
    { key: 'withdrawn',     label: 'Withdrawn' },
];

// helper data

const LEVEL_COLOR: Record<string, { chip: string; strip: string; avatar: string }> = {
    Undergraduate: {
        chip: 'bg-blue-50 text-blue-700 ring-1 ring-blue-100',
        strip: 'from-blue-500 to-indigo-400',
        avatar: 'bg-blue-100 text-blue-700',
    },
    Postgraduate: {
        chip: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100',
        strip: 'from-indigo-500 to-purple-400',
        avatar: 'bg-indigo-100 text-indigo-700',
    },
    PhD: {
        chip: 'bg-purple-50 text-purple-700 ring-1 ring-purple-100',
        strip: 'from-purple-500 to-violet-400',
        avatar: 'bg-purple-100 text-purple-700',
    },
    Diploma: {
        chip: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
        strip: 'from-amber-400 to-orange-400',
        avatar: 'bg-amber-100 text-amber-700',
    },
    Foundation: {
        chip: 'bg-teal-50 text-teal-700 ring-1 ring-teal-100',
        strip: 'from-teal-500 to-cyan-400',
        avatar: 'bg-teal-100 text-teal-700',
    },
};
const DEFAULT_LEVEL = {
    chip: 'bg-slate-100 text-slate-600',
    strip: 'from-slate-400 to-slate-500',
    avatar: 'bg-slate-100 text-slate-500',
};

function getInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');
}

function formatApplied(iso: string) {
    const d = new Date(iso);
    return {
        date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
}

// application card components (local components)

function ApplicationCard({ app, onDelete }: { app: EnrichedApplication; onDelete: (id: string) => void }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isMbbs   = app.courseId === null;
    const level    = app.courseLevel && !isMbbs ? (LEVEL_COLOR[app.courseLevel] ?? DEFAULT_LEVEL) : DEFAULT_LEVEL;
    const initials = getInitials(app.universityName);
    const { date, time } = formatApplied(app.createdAt);
    const sc = APPLICATION_STATUS_CONFIG[app.status];

    async function handleDelete() {
        setDeleting(true);
        try {
            await fetch(`/api/user/applications/${app.id}`, { method: 'DELETE' });
            onDelete(app.id);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">

            {/* ── Gradient banner ── */}
            <div className={`bg-linear-to-r ${level.strip} px-5 py-4`}>
                <div className="flex items-center gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-base font-extrabold text-white backdrop-blur-sm">
                        {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-extrabold text-white leading-snug">
                            {app.universityName}
                        </p>
                        <p className="truncate text-xs text-white/70 mt-0.5">
                            {app.courseName ?? (isMbbs ? 'MBBS Program' : '—')}
                        </p>
                    </div>
                    {app.universityAcronym && (
                        <span className="shrink-0 rounded-lg bg-white/20 px-2 py-1 text-xs font-bold text-white">
                            {app.universityAcronym}
                        </span>
                    )}
                </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-1 flex-col p-5">

                {/* Status + chips row */}
                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${sc.bg} ${sc.color}`}>
                        <span className="size-1.5 rounded-full bg-current opacity-70" />
                        {sc.label}
                    </span>
                    {app.country && (
                        <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                            <HiGlobeAlt className="size-3 shrink-0" />
                            {app.country}
                        </span>
                    )}
                    {isMbbs ? (
                        <span className="flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-100">
                            <HiOutlineAcademicCap className="size-3 shrink-0" />
                            MBBS
                        </span>
                    ) : (
                        <>
                            {app.courseLevel && (
                                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${level.chip}`}>
                                    <HiOutlineAcademicCap className="size-3 shrink-0" />
                                    {app.courseLevel}
                                </span>
                            )}
                            {app.degreeName && (
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                                    <HiBookOpen className="size-3 shrink-0" />
                                    {app.degreeName}
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Notes */}
                {(app.notes || app.adminNote) && (
                    <div className="mb-4 space-y-2">
                        {app.notes && (
                            <div className="rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5">
                                <p className="line-clamp-2 text-xs italic leading-relaxed text-slate-500">
                                    &ldquo;{app.notes}&rdquo;
                                </p>
                            </div>
                        )}
                        {app.adminNote && (
                            <div className="rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-2.5">
                                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-500">Admin Note</p>
                                <p className="line-clamp-2 text-xs leading-relaxed text-amber-800">{app.adminNote}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1" />

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                            <HiCalendarDays className="size-3.5 shrink-0 text-slate-400" />
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <HiClock className="size-3 shrink-0" />
                            {time}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="rounded-lg p-1.5 text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
                    >
                        <HiTrash className="size-4" />
                    </button>
                </div>
            </div>

            {/* Delete confirm overlay */}
            {confirmDelete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/96 p-6 backdrop-blur-sm">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-red-50">
                        <HiTrash className="size-5 text-red-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-extrabold text-slate-800">Remove this application?</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                            &ldquo;{app.universityName}&rdquo; will be removed from your list.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(false)}
                            disabled={deleting}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-40"
                        >
                            Keep it
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-700 disabled:opacity-60"
                        >
                            {deleting ? (
                                <div className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            ) : (
                                <HiCheck className="size-3" />
                            )}
                            Yes, remove
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// skeleton card components

function SkeletonCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="h-1.5 w-full animate-pulse bg-slate-100" />
            <div className="space-y-4 p-5">
                <div className="flex items-start gap-3.5">
                    <div className="size-11 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                    <div className="flex-1 space-y-2 pt-0.5">
                        <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-100" />
                        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-6 w-28 animate-pulse rounded-full bg-slate-100" />
                </div>
                <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />
                <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
                    <div className="space-y-1.5">
                        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
                    </div>
                    <div className="size-7 animate-pulse rounded-lg bg-slate-100" />
                </div>
            </div>
        </div>
    );
}

// local componets

function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-20 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-indigo-50">
                <HiDocumentText className="size-8 text-indigo-400" />
            </div>
            <h4 className="mb-1 text-sm font-extrabold text-slate-700">No applications yet</h4>
            <p className="mb-6 max-w-xs text-xs leading-relaxed text-slate-400">
                Start tracking your university applications. Add each application and monitor it from here.
            </p>
            <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700"
                >
                    <HiPlus className="size-4" />
                    Add Application
                </button>
                <Link
                    href="/universities"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                    Browse Universities
                </Link>
            </div>
        </div>
    );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
    const { session } = useAppContext();
    const [apps, setApps]           = useState<EnrichedApplication[]>([]);
    const [loading, setLoading]     = useState(true);
    const [showForm, setShowForm]   = useState(false);
    const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');

    useEffect(() => {
        if (!session) return;
        async function fetchApps() {
            try {
                const res = await fetch('/api/user/applications');
                const json = await res.json();
                setApps(json.data ?? []);
            } catch {
                setApps([]);
            } finally {
                setLoading(false);
            }
        }
        fetchApps();
    }, [session]);

    const tabCounts = useMemo(() => {
        const counts: Record<string, number> = { all: apps.length };
        apps.forEach((a) => { counts[a.status] = (counts[a.status] ?? 0) + 1; });
        return counts;
    }, [apps]);

    const filtered = useMemo(() =>
        activeTab === 'all' ? apps : apps.filter((a) => a.status === activeTab),
        [apps, activeTab],
    );

    async function handleSubmit(data: { universityId: string; courseId: string; notes: string }) {
        const res = await fetch('/api/user/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const updated = await fetch('/api/user/applications');
            const json = await updated.json();
            setApps(json.data ?? []);
        }
    }

    function handleDelete(id: string) {
        setApps((prev) => prev.filter((a) => a.id !== id));
    }

    return (
        <>
            {showForm && <ApplicationPopup onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}

            <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                    >
                        <HiArrowLeft className="size-4" />
                        Dashboard
                    </Link>
                    <span className="text-slate-300">/</span>
                    <span className="text-sm font-semibold text-slate-700">Applications</span>
                </div>

                {/* Page header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">My Applications</h1>
                        <p className="mt-1 text-sm text-slate-500">Track and manage all your university applications</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 sm:w-auto sm:shrink-0 sm:justify-start"
                    >
                        <HiPlus className="size-4" />
                        Add Application
                    </button>
                </div>

                {/* Status filter tabs */}
                {!loading && apps.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {STATUS_TABS.map(({ key, label }) => {
                            const count = tabCounts[key] ?? 0;
                            if (key !== 'all' && count === 0) return null;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveTab(key)}
                                    className={[
                                        'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                                        activeTab === key
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                                            : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
                                    ].join(' ')}
                                >
                                    {label}
                                    <span className={[
                                        'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                                        activeTab === key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
                                    ].join(' ')}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Content */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50">
                            <HiDocumentText className="size-4 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold text-slate-800">Your Applications</h3>
                            <p className="text-xs text-slate-400">All tracked university applications</p>
                        </div>
                        {!loading && apps.length > 0 && (
                            <span className="ml-auto rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                                {filtered.length}
                            </span>
                        )}
                    </div>

                    <div className="p-3 sm:p-6">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : apps.length === 0 ? (
                            <EmptyState onAdd={() => setShowForm(true)} />
                        ) : filtered.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 py-16 text-slate-400">
                                <HiDocumentText className="size-10" />
                                <p className="text-sm font-medium">No applications with this status</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {filtered.map((app) => (
                                    <ApplicationCard key={app.id} app={app} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {!loading && apps.length === 0 && (
                    <div className="flex items-center justify-center py-4">
                        <MdOutlineSchool className="size-8 text-slate-200" />
                    </div>
                )}
            </div>
        </>
    );
}
