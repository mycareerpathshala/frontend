'use client';

import {
    type CounsellingRequest,
    type CounsellingStatus,
    type NewCounsellingRequestPayload,
    type StudyLevel,
    type WeekDay,
    type TimeRange,
} from '@/assets/lib/counselling';
import { useState } from 'react';
import {
    HiArrowDownTray,
    HiCalendarDays,
    HiCheck,
    HiCheckCircle,
    HiClock,
    HiEnvelope,
    HiPencilSquare,
    HiPhone,
    HiTrash,
    HiXCircle,
    HiXMark,
} from 'react-icons/hi2';
import Link from 'next/link';
import { MdSupportAgent } from 'react-icons/md';
import { SiGooglemeet, SiZoom } from 'react-icons/si';

function downloadICS(req: CounsellingRequest) {
    const start = new Date(req.scheduledTime!);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//MyCareerPathshala//Counselling//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:counselling-${req.id}@mycareerpathshala.com`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:Counselling Session – ${req.studyLevel}`,
        'DESCRIPTION:Your career counselling session on MyCareerPathshala.',
        req.meetingLink ? `LOCATION:${req.meetingLink}` : null,
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Your counselling session is tomorrow',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR',
    ]
        .filter(Boolean)
        .join('\r\n');

    const blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: 'counselling-session.ics' });
    a.click();
    URL.revokeObjectURL(url);
}

function MeetingBadge({ url }: { url: string }) {
    const isGoogleMeet = url.includes('meet.google.com');
    const isZoom = url.includes('zoom.us') || url.includes('zoom.com');
    if (isGoogleMeet)
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-200 transition hover:bg-green-100"
            >
                <SiGooglemeet className="size-3.5" /> Join on Google Meet
            </a>
        );
    if (isZoom)
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-100"
            >
                <SiZoom className="size-3.5" /> Join on Zoom
            </a>
        );
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100"
        >
            Join Meeting →
        </a>
    );
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const STUDY_LEVELS: StudyLevel[] = ['Undergraduate', 'Postgraduate', 'MBBS'];

export const WEEK_DAYS: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const TIME_RANGES: TimeRange[] = ['10 AM - 12 PM', '12 PM - 2 PM', '2 PM - 4 PM', '4 PM - 6 PM'];

// ── Status config ─────────────────────────────────────────────────────────────

export const STATUS_CONFIG: Record<
    CounsellingStatus,
    { label: string; color: string; bg: string; border: string; Icon: React.ElementType }
> = {
    pending: {
        label: 'Pending',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        Icon: HiClock,
    },
    scheduled: {
        label: 'Scheduled',
        color: 'text-blue-700',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        Icon: HiCalendarDays,
    },
    completed: {
        label: 'Completed',
        color: 'text-green-700',
        bg: 'bg-green-50',
        border: 'border-green-200',
        Icon: HiCheckCircle,
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-slate-500',
        bg: 'bg-slate-100',
        border: 'border-slate-200',
        Icon: HiXCircle,
    },
};

// ── Shared input style ────────────────────────────────────────────────────────

const inputCls =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';

// ── Status badge ──────────────────────────────────────────────────────────────

export function StatusBadge({ status }: { status: CounsellingStatus }) {
    const { label, color, bg, border, Icon } = STATUS_CONFIG[status];
    return (
        <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${color} ${bg} ${border}`}
        >
            <Icon className="size-3 shrink-0" />
            {label}
        </span>
    );
}

// ── Toggle pill helper ────────────────────────────────────────────────────────

function TogglePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-all select-none ${
                active
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
            }`}
        >
            {label}
        </button>
    );
}

// ── Request card (reusable) ───────────────────────────────────────────────────

export function CounsellingRequestCard({ req, onDelete }: { req: CounsellingRequest; onDelete: (id: string) => void }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const createdDate = new Date(req.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const accentColor =
        req.status === 'completed'
            ? 'bg-green-400'
            : req.status === 'cancelled'
              ? 'bg-slate-300'
              : req.status === 'scheduled'
                ? 'bg-blue-500'
                : 'bg-amber-400';

    async function handleDelete() {
        setDeleting(true);
        await fetch(`/api/counselling/requests/${req.id}`, { method: 'DELETE' });
        onDelete(req.id);
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            {/* Top accent */}
            <div className={`h-1 w-full ${accentColor}`} />

            <div className="p-5">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                            <MdSupportAgent className="size-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-slate-800">{req.studyLevel}</p>
                            <p className="text-[11px] text-slate-400">Requested on {createdDate}</p>
                        </div>
                    </div>
                    <StatusBadge status={req.status} />
                </div>

                {/* Info rows */}
                <div className="mb-4 space-y-2.5 rounded-xl bg-slate-50 p-3">
                    {req.scheduledTime ? (
                        /* Confirmed session — show actual date/time */
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                            <HiCalendarDays className="size-3.5 shrink-0 text-blue-500" />
                            {new Date(req.scheduledTime).toLocaleString('en-IN', {
                                dateStyle: 'long',
                                timeStyle: 'short',
                            })}
                        </div>
                    ) : (
                        /* Pending — show preferences */
                        <>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <HiCalendarDays className="size-3.5 shrink-0 text-slate-400" />
                                {req.preferredDays.map((d) => (
                                    <span
                                        key={d}
                                        className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700"
                                    >
                                        {d}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                                <HiClock className="size-3.5 shrink-0 text-slate-400" />
                                {req.preferredTimeRanges.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <HiPhone className="size-3.5 shrink-0 text-slate-400" />
                        <span>{req.phone}</span>
                    </div>
                    {req.message && (
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                            &ldquo;{req.message}&rdquo;
                        </p>
                    )}
                    {req.meetingLink && <MeetingBadge url={req.meetingLink} />}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5 text-[11px] text-slate-400">
                        <HiEnvelope className="size-3.5 shrink-0" />
                        <span className="truncate">{req.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {req.status === 'pending' && (
                            <Link
                                href={`/dashboard/counselling/edit/${req.id}`}
                                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 transition-all select-none hover:bg-blue-50 hover:text-blue-600"
                            >
                                <HiPencilSquare className="size-3.5" />
                                Edit
                            </Link>
                        )}
                        {req.status === 'scheduled' && req.scheduledTime && (
                            <button
                                type="button"
                                onClick={() => downloadICS(req)}
                                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 transition-all select-none hover:bg-blue-50 hover:text-blue-500"
                            >
                                <HiArrowDownTray className="size-3.5" />
                                Add to Calendar
                            </button>
                        )}
                        {req.status !== 'completed' && (
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(true)}
                                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 transition-all select-none hover:bg-red-50 hover:text-red-500"
                            >
                                <HiTrash className="size-3.5" />
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete confirm overlay */}
            {confirmDelete && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/95 p-6 backdrop-blur-sm">
                    <p className="text-center text-sm font-bold text-slate-800">Cancel this request?</p>
                    <p className="text-center text-xs text-slate-400">This counselling request will be removed.</p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(false)}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 select-none hover:bg-slate-50"
                        >
                            Keep it
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={deleting}
                            className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white select-none hover:bg-red-700 disabled:opacity-60"
                        >
                            {deleting ? 'Cancelling…' : 'Yes, cancel'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Counselling form popup ────────────────────────────────────────────────────

export default function CounsellingPopUp({
    session,
    onClose,
    onSave,
}: {
    session: { firstName: string; lastName: string; email: string } | null;
    onClose: () => void;
    onSave: (req: NewCounsellingRequestPayload) => Promise<void> | void;
}) {
    const [form, setForm] = useState({
        name: session ? `${session.firstName} ${session.lastName}` : '',
        email: session?.email ?? '',
        phone: '',
        studyLevel: STUDY_LEVELS[0] as StudyLevel,
        message: '',
    });
    const [selectedDays, setSelectedDays] = useState<WeekDay[]>([]);
    const [selectedRanges, setSelectedRanges] = useState<TimeRange[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function set(field: string, value: string) {
        setForm((p) => ({ ...p, [field]: value }));
    }

    function toggleDay(day: WeekDay) {
        setSelectedDays((p) => (p.includes(day) ? p.filter((d) => d !== day) : [...p, day]));
    }

    function toggleRange(range: TimeRange) {
        setSelectedRanges((p) => (p.includes(range) ? p.filter((r) => r !== range) : [...p, range]));
    }

    async function handleSubmit() {
        if (!form.phone.trim()) {
            setError('Please enter your phone number.');
            return;
        }
        if (!form.message.trim()) {
            setError('Please describe what you would like to discuss.');
            return;
        }
        if (!selectedDays.length) {
            setError('Please select at least one preferred day.');
            return;
        }
        if (!selectedRanges.length) {
            setError('Please select at least one preferred time range.');
            return;
        }

        setError('');
        setLoading(true);
        try {
            await onSave({
                name: form.name.trim(),
                email: form.email,
                phone: form.phone.trim(),
                studyLevel: form.studyLevel,
                message: form.message.trim(),
                preferredDays: selectedDays,
                preferredTimeRanges: selectedRanges,
                nationality: null,
                streams: null,
                countries: null,
                courses: null,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-4 py-4 sm:px-6 sm:py-5">
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
                        className="absolute top-4 right-4 z-100 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all select-none hover:bg-red-400 active:scale-95"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-3 pr-12">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                            <MdSupportAgent className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">Request a Counselling Session</h2>
                            <p className="text-xs text-blue-100/80">
                                Our counsellors will reach out to confirm your session
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4 p-4 sm:p-6">
                    {error && (
                        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5">
                            <HiXCircle className="size-4 shrink-0 text-red-400" />
                            <p className="text-xs font-semibold text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => set('name', e.target.value)}
                                className={inputCls}
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => set('phone', e.target.value)}
                                className={inputCls}
                                placeholder="+91 00000 00000"
                            />
                        </div>
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            disabled
                            className={`${inputCls} cursor-not-allowed opacity-60`}
                        />
                    </div>

                    {/* Study level */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Study Level of Interest
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {STUDY_LEVELS.map((lvl) => (
                                <TogglePill
                                    key={lvl}
                                    label={lvl}
                                    active={form.studyLevel === lvl}
                                    onClick={() => set('studyLevel', lvl)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preferred days */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Preferred Days <span className="text-slate-300 normal-case">(select all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {WEEK_DAYS.map((day) => (
                                <TogglePill
                                    key={day}
                                    label={day.slice(0, 3)}
                                    active={selectedDays.includes(day)}
                                    onClick={() => toggleDay(day)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Preferred time ranges */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Preferred Time Ranges{' '}
                            <span className="text-slate-300 normal-case">(select all that apply)</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {TIME_RANGES.map((range) => (
                                <TogglePill
                                    key={range}
                                    label={range}
                                    active={selectedRanges.includes(range)}
                                    onClick={() => toggleRange(range)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            What would you like to discuss?
                        </label>
                        <textarea
                            value={form.message}
                            onChange={(e) => set('message', e.target.value)}
                            rows={3}
                            placeholder="Share your academic goals, preferred universities, or any questions…"
                            className={`${inputCls} resize-none`}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700 disabled:opacity-60"
                    >
                        <HiCheck className="size-4" />
                        {loading ? 'Submitting…' : 'Submit Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}
