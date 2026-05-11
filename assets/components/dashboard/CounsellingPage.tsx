'use client';

import { useAppContext } from '@/assets/context/AppContext';
import { type CounsellingRequest, type NewCounsellingRequestPayload } from '@/assets/lib/counselling';
import CounsellingPopUp, { CounsellingRequestCard } from '@/assets/components/global/CounsellingPopUp';
import Link from 'next/link';
import { startTransition, useEffect, useState } from 'react';
import { HiArrowLeft, HiPlus } from 'react-icons/hi2';
import { MdOutlineSchool, MdSupportAgent } from 'react-icons/md';

// local components

function StatCard({ label, value, color, bg }: { label: string; value: number; color: string; bg: string }) {
    return (
        <div className={`flex flex-col gap-1 rounded-2xl border p-5 ${bg}`}>
            <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
            <span className="text-xs font-semibold text-slate-500">{label}</span>
        </div>
    );
}

function EmptyState({ onRequest }: { onRequest: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-blue-50">
                <MdSupportAgent className="size-8 text-blue-400" />
            </div>
            <h4 className="mb-1 text-sm font-extrabold text-slate-700">No counselling requests yet</h4>
            <p className="mb-6 max-w-xs text-xs leading-relaxed text-slate-400">
                Request a session with one of our expert counsellors and get personalised guidance for studying abroad.
            </p>
            <button
                type="button"
                onClick={onRequest}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700"
            >
                <HiPlus className="size-4" />
                Request a Session
            </button>
        </div>
    );
}

// counselling page

export default function CounsellingPage() {
    const { session } = useAppContext();
    const [requests, setRequests] = useState<CounsellingRequest[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;
        fetch('/api/counselling/requests')
            .then((r) => r.json())
            .then((json) => {
                if (json.data) startTransition(() => setRequests(json.data));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [session]);

    async function handleSave(req: NewCounsellingRequestPayload) {
        const res = await fetch('/api/counselling/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
        });
        const json = await res.json();
        if (json.data) setRequests((p) => [json.data, ...p]);
        setShowForm(false);
    }

    function handleDelete(id: string) {
        setRequests((p) => p.filter((r) => r.id !== id));
    }

    const counts = {
        total: requests.length,
        pending: requests.filter((r) => r.status === 'pending').length,
        scheduled: requests.filter((r) => r.status === 'scheduled').length,
        completed: requests.filter((r) => r.status === 'completed').length,
    };

    return (
        <>
            {showForm && <CounsellingPopUp session={session} onClose={() => setShowForm(false)} onSave={handleSave} />}

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
                    <span className="text-sm font-semibold text-slate-700">Counselling</span>
                </div>

                {/* Page header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">Counselling Sessions</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Request expert guidance and track your session history
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700 sm:w-auto sm:shrink-0 sm:justify-start"
                    >
                        <HiPlus className="size-4" />
                        Request Session
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <StatCard
                        label="Total Requests"
                        value={counts.total}
                        color="text-slate-700"
                        bg="bg-white border-slate-100"
                    />
                    <StatCard
                        label="Pending"
                        value={counts.pending}
                        color="text-amber-600"
                        bg="bg-amber-50 border-amber-100"
                    />
                    <StatCard
                        label="Scheduled"
                        value={counts.scheduled}
                        color="text-blue-600"
                        bg="bg-blue-50 border-blue-100"
                    />
                    <StatCard
                        label="Completed"
                        value={counts.completed}
                        color="text-green-600"
                        bg="bg-green-50 border-green-100"
                    />
                </div>

                {/* Content */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                    {/* Section header */}
                    <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                <MdSupportAgent className="size-4 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-extrabold text-slate-800">Your Requests</h3>
                                <p className="truncate text-xs text-slate-400">All counselling sessions you have applied for</p>
                            </div>
                            {requests.length > 0 && (
                                <span className="shrink-0 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                                    {requests.length}
                                </span>
                            )}
                        </div>
                        <div className="flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5">
                            <MdOutlineSchool className="size-3.5 text-amber-500" />
                            <span className="text-[11px] font-bold text-amber-700">Expert Counsellors Available</span>
                        </div>
                    </div>

                    <div className="p-3 sm:p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="loader-mini" />
                            </div>
                        ) : requests.length === 0 ? (
                            <EmptyState onRequest={() => setShowForm(true)} />
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {requests.map((req) => (
                                    <CounsellingRequestCard key={req.id} req={req} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Info banner */}
                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                        <MdSupportAgent className="size-4.5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-blue-800">How it works</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-blue-600/80">
                            Submit your request → Our team reviews and assigns a counsellor → You receive a confirmation
                            with the session details → Attend your session and get personalised guidance.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
