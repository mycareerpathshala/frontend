'use client';

import { useAppContext } from '@/assets/context/AppContext';
import DialCodeSelector, {
    DEFAULT_DIAL_COUNTRY,
    parsePhone,
    type DialCountry,
} from '@/assets/components/dashboard/DialCodeSelector';
import NationalitySelector, {
    DEFAULT_NATIONALITY,
    NATIONALITIES,
    type Nationality,
} from '@/assets/components/dashboard/NationalitySelector';
import { WEEK_DAYS, TIME_RANGES } from '@/assets/components/global/CounsellingPopUp';
import type { CounsellingRequest, StudyLevel, WeekDay, TimeRange } from '@/assets/lib/counselling';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import {
    HiArrowLeft,
    HiCheck,
    HiXMark,
    HiXCircle,
} from 'react-icons/hi2';
import { MdSupportAgent } from 'react-icons/md';

// ── Constants ─────────────────────────────────────────────────────────────────

const STUDY_LEVELS: StudyLevel[] = ['Undergraduate', 'Postgraduate', 'MBBS'];

// ── Small helpers ─────────────────────────────────────────────────────────────

const inputCls =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100';

function Label({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            {children}
        </label>
    );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-3.5">
                <h3 className="text-sm font-extrabold text-slate-700">{title}</h3>
            </div>
            <div className="space-y-4 p-5">{children}</div>
        </div>
    );
}

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

function TagInput({ tags, onChange, placeholder }: { tags: string[]; onChange: (tags: string[]) => void; placeholder?: string }) {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    function addTag() {
        const val = input.trim();
        if (!val || tags.includes(val)) { setInput(''); return; }
        onChange([...tags, val]);
        setInput('');
    }

    function removeTag(tag: string) {
        onChange(tags.filter((t) => t !== tag));
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
        if (e.key === 'Backspace' && !input && tags.length) removeTag(tags[tags.length - 1]);
    }

    return (
        <div
            className="flex min-h-10 flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 cursor-text"
            onClick={() => inputRef.current?.focus()}
        >
            {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-700">
                        <HiXMark className="size-3" />
                    </button>
                </span>
            ))}
            <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={tags.length === 0 ? (placeholder ?? 'Type and press Enter…') : ''}
                className="min-w-32 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-300"
            />
        </div>
    );
}

// ── Edit form ─────────────────────────────────────────────────────────────────

interface Props {
    existing: CounsellingRequest;
    streamOptions: string[];
    countryOptions: string[];
}

export default function CounsellingEditForm({ existing, streamOptions, countryOptions }: Props) {
    const { session } = useAppContext();
    const router = useRouter();

    const parsedPhone      = parsePhone(existing.phone);
    const streamOptionsSet  = new Set(streamOptions);
    const countryOptionsSet = new Set(countryOptions);

    const [dialCountry, setDialCountry]     = useState<DialCountry>(parsedPhone.country);
    const [phoneNumber, setPhoneNumber]     = useState(parsedPhone.number);
    const [nationality, setNationality]     = useState<Nationality>(
        NATIONALITIES.find((n) => n.nationality === existing.nationality) ?? DEFAULT_NATIONALITY,
    );
    const [studyLevel, setStudyLevel]       = useState<StudyLevel>(existing.studyLevel);
    const [streams, setStreams]             = useState<string[]>(
        (existing.streams ?? []).filter((s) => streamOptionsSet.has(s)),
    );
    const [customStreams, setCustomStreams] = useState<string[]>(
        (existing.streams ?? []).filter((s) => !streamOptionsSet.has(s)),
    );
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        (existing.countries ?? []).filter((c) => countryOptionsSet.has(c)),
    );
    const [customCountries, setCustomCountries] = useState<string[]>(
        (existing.countries ?? []).filter((c) => !countryOptionsSet.has(c)),
    );
    const [courses, setCourses]               = useState<string[]>(existing.courses ?? []);
    const [selectedDays, setSelectedDays]     = useState<WeekDay[]>(existing.preferredDays);
    const [selectedRanges, setSelectedRanges] = useState<TimeRange[]>(existing.preferredTimeRanges);
    const [message, setMessage]               = useState(existing.message);
    const [error, setError]                   = useState('');
    const [submitting, setSubmitting]         = useState(false);

    function toggleStream(s: string) {
        setStreams((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
    }
    function toggleCountry(c: string) {
        setSelectedCountries((p) => p.includes(c) ? p.filter((x) => x !== c) : [...p, c]);
    }
    function toggleDay(d: WeekDay) {
        setSelectedDays((p) => p.includes(d) ? p.filter((x) => x !== d) : [...p, d]);
    }
    function toggleRange(r: TimeRange) {
        setSelectedRanges((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        const phone = `${dialCountry.dial} ${phoneNumber}`.trim();
        if (!phoneNumber.trim()) { setError('Please enter your phone number.'); return; }
        if (!message.trim())     { setError('Please describe what you would like to discuss.'); return; }
        if (!selectedDays.length) { setError('Please select at least one preferred day.'); return; }
        if (!selectedRanges.length) { setError('Please select at least one preferred time range.'); return; }

        setSubmitting(true);
        try {
            const res = await fetch(`/api/counselling/requests/${existing.id}`, {
                method:  'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:                `${session?.firstName ?? ''} ${session?.lastName ?? ''}`.trim(),
                    email:               session?.email ?? '',
                    phone,
                    studyLevel,
                    message:             message.trim(),
                    preferredDays:       selectedDays,
                    preferredTimeRanges: selectedRanges,
                    nationality:         nationality.nationality,
                    streams:             [...streams, ...customStreams].length   ? [...streams, ...customStreams]             : null,
                    countries:           [...selectedCountries, ...customCountries].length ? [...selectedCountries, ...customCountries] : null,
                    courses:             courses.length                          ? courses                                    : null,
                }),
            });

            const json = await res.json();
            if (!res.ok) {
                setError(json.error ?? 'Something went wrong. Please try again.');
                return;
            }

            router.push('/dashboard/counselling');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
                <Link
                    href="/dashboard/counselling"
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                    <HiArrowLeft className="size-4" />
                    Counselling
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-sm font-semibold text-slate-700">Edit Request</span>
            </div>

            {/* Page header */}
            <div className="flex items-start gap-4 rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-500 to-blue-500 p-6 shadow-md">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                    <MdSupportAgent className="size-6 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-extrabold text-white">Edit Your Counselling Request</h1>
                    <p className="mt-0.5 text-sm text-indigo-100/80">
                        Update your details below. You can only edit requests that are still pending review.
                    </p>
                </div>
            </div>

            {/* Error banner */}
            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                    <HiXCircle className="size-4 shrink-0 text-red-400" />
                    <p className="text-sm font-semibold text-red-600">{error}</p>
                </div>
            )}

            {/* ── Section 1: Personal info ── */}
            <SectionCard title="Personal Information">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label>Full Name</Label>
                        <input
                            type="text"
                            value={`${session?.firstName ?? ''} ${session?.lastName ?? ''}`.trim()}
                            disabled
                            className={`${inputCls} cursor-not-allowed opacity-60`}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <input
                            type="email"
                            value={session?.email ?? ''}
                            disabled
                            className={`${inputCls} cursor-not-allowed opacity-60`}
                        />
                    </div>
                </div>

                {/* Phone + Nationality row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label>Phone Number</Label>
                        <div className="flex gap-2">
                            <DialCodeSelector value={dialCountry} onChange={setDialCountry} />
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter number"
                                className={`${inputCls} flex-1`}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Nationality</Label>
                        <NationalitySelector value={nationality} onChange={setNationality} />
                    </div>
                </div>
            </SectionCard>

            {/* ── Section 2: Study interests ── */}
            <SectionCard title="Study Interests">
                {/* Study level */}
                <div>
                    <Label>Study Level</Label>
                    <div className="flex flex-wrap gap-2">
                        {STUDY_LEVELS.map((lvl) => (
                            <TogglePill
                                key={lvl}
                                label={lvl}
                                active={studyLevel === lvl}
                                onClick={() => setStudyLevel(lvl)}
                            />
                        ))}
                    </div>
                </div>

                {/* Streams — hidden for MBBS */}
                {studyLevel !== 'MBBS' && (
                    <div className="space-y-2">
                        <Label>Streams of Interest <span className="normal-case font-normal text-slate-300">(select all that apply)</span></Label>
                        <div className="flex flex-wrap gap-2">
                            {streamOptions.map((s) => (
                                <TogglePill key={s} label={s} active={streams.includes(s)} onClick={() => toggleStream(s)} />
                            ))}
                        </div>
                        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-3">
                            Not in the list? Add it
                        </p>
                        <TagInput
                            tags={customStreams}
                            onChange={setCustomStreams}
                            placeholder="e.g. Veterinary Science, Fashion Design…"
                        />
                    </div>
                )}

                {/* Countries */}
                <div className="space-y-2">
                    <Label>Countries of Interest <span className="normal-case font-normal text-slate-300">(select all that apply)</span></Label>
                    <div className="flex flex-wrap gap-2">
                        {countryOptions.map((c) => (
                            <TogglePill key={c} label={c} active={selectedCountries.includes(c)} onClick={() => toggleCountry(c)} />
                        ))}
                    </div>
                    <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-3">
                        Not in the list? Add it
                    </p>
                    <TagInput
                        tags={customCountries}
                        onChange={setCustomCountries}
                        placeholder="e.g. South Korea, Switzerland…"
                    />
                </div>

                {/* Courses — hidden for MBBS */}
                {studyLevel !== 'MBBS' && (
                    <div>
                        <Label>
                            Courses You&apos;re Interested In{' '}
                            <span className="normal-case font-normal text-slate-300">(type and press Enter)</span>
                        </Label>
                        <TagInput tags={courses} onChange={setCourses} placeholder="e.g. Computer Science, MBA…" />
                    </div>
                )}
            </SectionCard>

            {/* ── Section 3: Message ── */}
            <SectionCard title="Your Message">
                <div>
                    <Label>What would you like to discuss?</Label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        placeholder="Share your academic goals, concerns, questions, or anything you'd like guidance on…"
                        className={`${inputCls} resize-none`}
                        required
                    />
                </div>
            </SectionCard>

            {/* ── Section 4: Availability ── */}
            <SectionCard title="Your Availability">
                <div>
                    <Label>Preferred Days <span className="normal-case font-normal text-slate-300">(select all that apply)</span></Label>
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

                <div>
                    <Label>Preferred Time Ranges <span className="normal-case font-normal text-slate-300">(select all that apply)</span></Label>
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
            </SectionCard>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pb-6">
                <Link
                    href="/dashboard/counselling"
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-60"
                >
                    {submitting ? (
                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                        <HiCheck className="size-4" />
                    )}
                    {submitting ? 'Saving…' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
