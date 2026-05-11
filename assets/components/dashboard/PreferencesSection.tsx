'use client';

// imports
import { buildPreferenceUrl, type StudyPreference } from '@/assets/lib/preferences';
import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { startTransition, useEffect, useRef, useState } from 'react';
import { HiArrowRight, HiBookmark, HiCheck, HiPencilSquare, HiPlus, HiTrash, HiXMark } from 'react-icons/hi2';
import { MdLanguage, MdOutlineSchool, MdPublic, MdSchedule, MdStream, MdVideocam } from 'react-icons/md';

// Filter chip
const CHIP_STYLES: Record<string, { bg: string; text: string; Icon: React.ElementType }> = {
    country: { bg: 'bg-blue-50', text: 'text-blue-700', Icon: MdPublic },
    stream: { bg: 'bg-purple-50', text: 'text-purple-700', Icon: MdStream },
    level: { bg: 'bg-indigo-50', text: 'text-indigo-700', Icon: MdOutlineSchool },
    delivery: { bg: 'bg-teal-50', text: 'text-teal-700', Icon: MdVideocam },
    language: { bg: 'bg-orange-50', text: 'text-orange-700', Icon: MdLanguage },
    offering: { bg: 'bg-green-50', text: 'text-green-700', Icon: MdSchedule },
};

function FilterChip({ type, label }: { type: keyof typeof CHIP_STYLES; label: string }) {
    const { bg, text, Icon } = CHIP_STYLES[type];
    return (
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${bg} ${text}`}>
            <Icon className="size-3 shrink-0" />
            {label}
        </span>
    );
}

// Preference Card Local component

function PreferenceCard({
    pref,
    onDelete,
    onRename,
}: {
    pref: StudyPreference;
    onDelete: (id: string) => void;
    onRename: (id: string, name: string) => void;
}) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(pref.name);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    async function handleRename() {
        const trimmed = draft.trim();
        if (trimmed && trimmed !== pref.name) {
            await fetch(`/api/user/preferences/${pref.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed }),
            });
            onRename(pref.id, trimmed);
        }
        setEditing(false);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') handleRename();
        if (e.key === 'Escape') {
            setDraft(pref.name);
            setEditing(false);
        }
    }

    const chips: { type: keyof typeof CHIP_STYLES; label: string }[] = [
        pref.countryName && { type: 'country', label: pref.countryName },
        pref.streamName && { type: 'stream', label: pref.streamName },
        pref.levelFilter && { type: 'level', label: pref.levelFilter },
        pref.deliveryMethodFilter && { type: 'delivery', label: pref.deliveryMethodFilter },
        pref.studyLanguageFilter && { type: 'language', label: pref.studyLanguageFilter },
        pref.courseOfferingFilter && { type: 'offering', label: pref.courseOfferingFilter },
    ].filter(Boolean) as { type: keyof typeof CHIP_STYLES; label: string }[];

    const appliedUrl = buildPreferenceUrl(pref);
    const createdDate = new Date(pref.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
            {/* Card header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
                {/* Name — inline editable */}
                {editing ? (
                    <div className="flex flex-1 items-center gap-2">
                        <input
                            ref={inputRef}
                            title="Preference name"
                            placeholder="Preference name"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 rounded-lg border border-blue-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-100"
                        />
                        <button
                            type="button"
                            onClick={handleRename}
                            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700"
                        >
                            <HiCheck className="size-3.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setDraft(pref.name);
                                setEditing(false);
                            }}
                            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-100"
                        >
                            <HiXMark className="size-3.5" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="group/name flex min-w-0 flex-1 items-center gap-2 text-left"
                        title="Click to rename"
                    >
                        <HiBookmark className="size-3.5 shrink-0 text-blue-500" />
                        <span className="truncate text-sm font-bold text-slate-800">{pref.name}</span>
                        <HiPencilSquare className="size-3 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover/name:opacity-100" />
                    </button>
                )}

                {/* Delete */}
                {!editing && (
                    <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
                        title="Delete preference"
                    >
                        <HiTrash className="size-3.5" />
                    </button>
                )}
            </div>

            {/* Chips */}
            <div className="flex-1 px-4 py-3.5">
                {chips.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {chips.map(({ type, label }) => (
                            <FilterChip key={type} type={type} label={label} />
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-300 italic">No filters selected</p>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                <span className="text-[10px] text-slate-400">Saved {createdDate}</span>
                <Link
                    href={appliedUrl}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all select-none hover:bg-blue-700 active:scale-[0.97]"
                >
                    Apply
                    <HiArrowRight className="size-3" />
                </Link>
            </div>

            {/* Delete confirmation overlay */}
            {confirmDelete && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/95 p-6 backdrop-blur-sm">
                    <p className="text-center text-sm font-bold text-slate-800">Delete this preference?</p>
                    <p className="text-center text-xs text-slate-400">
                        &ldquo;{pref.name}&rdquo; will be permanently removed.
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(false)}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={async () => {
                                await fetch(`/api/user/preferences/${pref.id}`, { method: 'DELETE' });
                                onDelete(pref.id);
                            }}
                            className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition-all select-none hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Add preference popup ──────────────────────────────────────────────────────
// Quick-add form for manually creating a preference from the dashboard
// (without needing to go through FindCourse).

const LEVEL_OPTIONS = ['Undergraduate', 'Postgraduate'] as const;
const DELIVERY_OPTIONS = ['On-Campus', 'Online', 'Blended'] as const;
const OFFERING_OPTIONS = ['Full-Time', 'Part-Time'] as const;

function AddPreferencePopup({
    onClose,
    onSave,
}: {
    onClose: () => void;
    onSave: (pref: Omit<StudyPreference, 'id' | 'createdAt'>) => void;
}) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const [name, setName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [streamName, setStreamName] = useState('');
    const [level, setLevel] = useState<'Undergraduate' | 'Postgraduate' | ''>('');
    const [delivery, setDelivery] = useState<'On-Campus' | 'Online' | 'Blended' | ''>('');
    const [language, setLanguage] = useState('');
    const [offering, setOffering] = useState<'Full-Time' | 'Part-Time' | ''>('');

    function handleSave() {
        onSave({
            name: name.trim() || 'My Preference',
            countryFilter: null, // no Strapi documentId available from manual entry
            countryName: countryName.trim() || null,
            streamFilter: null,
            streamName: streamName.trim() || null,
            levelFilter: (level as 'Undergraduate' | 'Postgraduate') || null,
            deliveryMethodFilter: (delivery as 'On-Campus' | 'Online' | 'Blended') || null,
            studyLanguageFilter: language.trim() || null,
            courseOfferingFilter: (offering as 'Full-Time' | 'Part-Time') || null,
        });
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop — fixed so it always covers the full viewport even when card scrolls */}
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="flex min-h-full items-start justify-center p-4 py-8">
            <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-4 py-4 sm:px-6 sm:py-5">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 z-100 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-red-400"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                            <HiBookmark className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">Add Study Preference</h2>
                            <p className="text-xs text-blue-100/80">Save your ideal study criteria</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-4 px-4 py-4 sm:p-6">
                    {/* Preference name */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Preference Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. UK Engineering UG"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Country */}
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Country
                            </label>
                            <input
                                type="text"
                                value={countryName}
                                onChange={(e) => setCountryName(e.target.value)}
                                placeholder="e.g. United Kingdom"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Stream */}
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Stream / Field
                            </label>
                            <input
                                type="text"
                                value={streamName}
                                onChange={(e) => setStreamName(e.target.value)}
                                placeholder="e.g. Engineering"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Level */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Course Level
                        </label>
                        <div className="flex gap-2">
                            {LEVEL_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setLevel((p) => (p === opt ? '' : opt))}
                                    className={`flex-1 rounded-xl border-2 py-2 text-xs font-bold transition-all select-none ${
                                        level === opt
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Delivery */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Delivery Method
                        </label>
                        <div className="flex gap-2">
                            {DELIVERY_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setDelivery((p) => (p === opt ? '' : opt))}
                                    className={`flex-1 rounded-xl border-2 py-2 text-xs font-bold transition-all select-none ${
                                        delivery === opt
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Language */}
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Study Language
                            </label>
                            <input
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                placeholder="e.g. English"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Offering */}
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Course Offering
                            </label>
                            <div className="flex gap-2">
                                {OFFERING_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setOffering((p) => (p === opt ? '' : opt))}
                                        className={`flex-1 rounded-xl border-2 py-2 text-[10px] font-bold transition-all select-none ${
                                            offering === opt
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-xs text-slate-400">
                        Or use{' '}
                        <Link href="/courses" className="font-semibold text-blue-500 underline hover:text-blue-700">
                            Find Courses
                        </Link>{' '}
                        to save with exact filters.
                    </p>
                    <div className="flex shrink-0 items-center justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700"
                        >
                            <HiCheck className="size-4" />
                            Save
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50">
                <HiBookmark className="size-7 text-blue-400" />
            </div>
            <h4 className="mb-1 text-sm font-extrabold text-slate-700">No preferences saved yet</h4>
            <p className="mb-5 max-w-xs text-xs leading-relaxed text-slate-400">
                Save your study criteria — country, stream, level, and more — to quickly find matching courses.
            </p>
            <div className="flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center">
                <button
                    type="button"
                    onClick={onAdd}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700"
                >
                    <HiPlus className="size-3.5" />
                    Add preference
                </button>
                <Link
                    href="/courses"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-all select-none hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                    Go to Find Courses
                    <HiArrowRight className="size-3.5" />
                </Link>
            </div>
        </div>
    );
}

// ── Section root ──────────────────────────────────────────────────────────────

export default function PreferencesSection() {
    const { session } = useAppContext();
    const [prefs, setPrefs] = useState<StudyPreference[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;
        fetch('/api/user/preferences')
            .then((r) => r.json())
            .then((json) => {
                if (json.data) startTransition(() => setPrefs(json.data));
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [session]);

    async function handleAdd(pref: Omit<StudyPreference, 'id' | 'createdAt'>) {
        const res = await fetch('/api/user/preferences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pref),
        });
        const json = await res.json();
        if (json.data) setPrefs((p) => [json.data, ...p]);
        setShowAdd(false);
    }

    function handleDelete(id: string) {
        setPrefs((p) => p.filter((x) => x.id !== id));
    }

    function handleRename(id: string, name: string) {
        setPrefs((p) => p.map((x) => (x.id === id ? { ...x, name } : x)));
    }

    return (
        <>
            {showAdd && <AddPreferencePopup onClose={() => setShowAdd(false)} onSave={handleAdd} />}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                {/* Header */}
                <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <HiBookmark className="size-4 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-extrabold text-slate-800">Saved Preferences</h3>
                            <p className="truncate text-xs text-slate-400">Your study criteria for finding the right courses</p>
                        </div>
                        {prefs.length > 0 && (
                            <span className="shrink-0 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
                                {prefs.length}
                            </span>
                        )}
                    </div>
                    <div className="flex shrink-0 items-center justify-end gap-2">
                        <Link
                            href="/courses"
                            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all select-none hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                            Find Courses
                            <HiArrowRight className="size-3" />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowAdd(true)}
                            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all select-none hover:bg-blue-700"
                        >
                            <HiPlus className="size-3.5" />
                            Add
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="loader-mini" />
                        </div>
                    ) : prefs.length === 0 ? (
                        <EmptyState onAdd={() => setShowAdd(true)} />
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {prefs.map((pref) => (
                                <div key={pref.id} className="relative">
                                    <PreferenceCard pref={pref} onDelete={handleDelete} onRename={handleRename} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
