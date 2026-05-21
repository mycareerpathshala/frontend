'use client';

// imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    HiCheckCircle,
    HiEnvelope,
    HiPhone,
    HiUser,
    HiXCircle,
    HiCalendarDays,
    HiTrophy,
    HiBookOpen,
    HiGlobeAlt,
    HiAcademicCap,
    HiClipboardDocumentList,
    HiChatBubbleLeftRight,
    HiHeart,
    HiBell,
    HiSparkles,
    HiArrowRight,
} from 'react-icons/hi2';

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = { type: 'success' | 'error'; message: string } | null;
type StoredSubscriber = { name: string; email: string };

const STORAGE_KEY = 'mcp_subscriber';

// ── Data ──────────────────────────────────────────────────────────────────────

const EMAIL_PERKS = [
    {
        icon: HiCalendarDays,
        color: 'from-blue-400 to-blue-600',
        label: 'Weekly Admission Deadlines',
        desc: 'Never miss an application window again',
    },
    {
        icon: HiTrophy,
        color: 'from-yellow-400 to-orange-500',
        label: 'Scholarship Alerts',
        desc: 'Fresh funding opportunities delivered to you',
    },
    {
        icon: HiBookOpen,
        color: 'from-emerald-400 to-teal-600',
        label: 'Study Abroad Guides',
        desc: 'Visa tips, destination guides & packing lists',
    },
    {
        icon: HiGlobeAlt,
        color: 'from-violet-400 to-purple-600',
        label: 'University Rankings',
        desc: 'QS, THE & USNWR updates explained simply',
    },
    {
        icon: HiAcademicCap,
        color: 'from-rose-400 to-pink-600',
        label: 'Intake Season News',
        desc: 'Fall, Spring & Rolling intakes covered',
    },
];

const ACCOUNT_PERKS = [
    { icon: HiClipboardDocumentList, label: 'Track all your applications end-to-end' },
    { icon: HiChatBubbleLeftRight,   label: 'Book free personal counselling sessions' },
    { icon: HiHeart,                 label: 'Save universities & courses you love' },
    { icon: HiBell,                  label: 'Personalised notifications & reminders' },
    { icon: HiSparkles,              label: 'AI-powered eligibility & profile assessment' },
];

// ── Subscribed state component ─────────────────────────────────────────────────

function SubscribedView({ name }: { name: string }) {
    const firstName = name.split(' ')[0];

    return (
        <div className="relative w-full overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-violet-700 py-16 max-md:py-12">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-violet-400/20 blur-3xl" />
            <div className="pointer-events-none absolute top-0 right-1/4 size-48 rounded-full bg-indigo-300/10 blur-2xl" />

            <div className="relative mx-auto w-full max-w-7xl px-4">
                {/* ── Header ── */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-green-400/20 ring-4 ring-green-400/30">
                        <HiCheckCircle className="size-9 text-green-300" />
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-white max-md:text-2xl">
                        You&apos;re in,{' '}
                        <span className="text-yellow-300">{firstName}!</span>{' '}
                        🎉
                    </h2>
                    <p className="mt-2 max-w-lg text-sm text-blue-100">
                        Your inbox just got a whole lot smarter. Here&apos;s what you&apos;ll be getting every week:
                    </p>
                </div>

                {/* ── Email perks grid ── */}
                <div className="mt-10 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {EMAIL_PERKS.map(({ icon: Icon, color, label, desc }) => (
                        <div
                            key={label}
                            className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15 transition-transform duration-200 hover:-translate-y-0.5"
                        >
                            <span className={`flex size-10 items-center justify-center rounded-xl bg-linear-to-br ${color} shadow-lg`}>
                                <Icon className="size-5 text-white" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-white">{label}</p>
                                <p className="mt-0.5 text-xs text-blue-200">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="mt-12 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/20" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                        Take it further
                    </span>
                    <div className="h-px flex-1 bg-white/20" />
                </div>

                {/* ── Account CTA ── */}
                <div className="mt-8 grid grid-cols-[1fr_auto] items-center gap-8 rounded-2xl bg-white/10 p-8 backdrop-blur-sm ring-1 ring-white/15 max-lg:grid-cols-1 max-md:p-6">
                    <div>
                        <p className="text-lg font-bold text-white max-md:text-base">
                            Create a free account &amp; unlock your full study abroad journey
                        </p>
                        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 max-sm:grid-cols-1">
                            {ACCOUNT_PERKS.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-2.5">
                                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-yellow-400/20">
                                        <Icon className="size-3.5 text-yellow-300" />
                                    </span>
                                    <span className="text-sm text-blue-100">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3 min-w-48 max-lg:flex-row max-sm:flex-col">
                        <Link
                            href="/auth/register"
                            className="flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-yellow-900 shadow-lg shadow-yellow-500/30 transition-all duration-200 select-none hover:bg-yellow-300 hover:shadow-xl active:scale-95"
                        >
                            Create Free Account
                            <HiArrowRight className="size-4" />
                        </Link>
                        <Link
                            href="/auth/login"
                            className="flex items-center justify-center gap-2 rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 transition-all duration-200 select-none hover:bg-white/25 active:scale-95"
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function BeSubscriber() {
    const [subscribed, setSubscribed] = useState<StoredSubscriber | null>(null);
    const [hydrated, setHydrated]     = useState(false);
    const [name, setName]             = useState('');
    const [email, setEmail]           = useState('');
    const [phone, setPhone]           = useState('');
    const [loading, setLoading]       = useState(false);
    const [status, setStatus]         = useState<Status>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setSubscribed(JSON.parse(stored));
        } catch {
            // ignore
        }
        setHydrated(true);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone }),
            });
            const data = await res.json();

            if (data.status === 'success') {
                const record: StoredSubscriber = { name: name.trim(), email: email.trim() };
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(record)); } catch { /* ignore */ }
                setSubscribed(record);
            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

    // avoid hydration mismatch — render nothing until localStorage is read
    if (!hydrated) return null;

    if (subscribed) return <SubscribedView name={subscribed.name} />;

    return (
        <div className="relative w-full overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-violet-700 py-16 max-md:py-12">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-violet-400/20 blur-3xl" />
            <div className="pointer-events-none absolute top-0 right-1/4 size-48 rounded-full bg-indigo-300/10 blur-2xl" />

            <div className="relative mx-auto w-full max-w-7xl px-4">
                <div className="flex flex-col items-center text-center">
                    <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white/90 backdrop-blur-sm">
                        Stay Updated
                    </span>
                    <h2 className="text-3xl leading-relaxed font-bold text-white max-md:text-2xl">
                        Subscribe &amp; Get the Latest{' '}
                        <span className="text-yellow-300">Admission Updates</span>
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-blue-100 max-md:text-xs">
                        Join thousands of students receiving timely updates on admissions, scholarships, and study
                        abroad opportunities.
                    </p>

                    {status && (
                        <div
                            className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium backdrop-blur-sm ${
                                status.type === 'success'
                                    ? 'border-green-300/50 bg-green-500/20 text-green-100'
                                    : 'border-red-300/40 bg-red-500/20 text-red-100'
                            }`}
                        >
                            {status.type === 'success' ? (
                                <HiCheckCircle className="size-4.5 shrink-0" />
                            ) : (
                                <HiXCircle className="size-4.5 shrink-0" />
                            )}
                            {status.message}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center justify-center gap-6">
                    <div className="flex items-center justify-center gap-4 max-lg:w-full max-lg:flex-col max-lg:px-6 max-sm:px-2">
                        <span className="relative max-lg:w-full max-lg:max-w-sm">
                            <HiUser className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                required
                                className="w-90 rounded-xl border border-white/30 bg-white/95 py-3 pr-4 pl-9 text-sm shadow-lg transition-all duration-200 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 max-xl:w-75 max-lg:w-full"
                            />
                        </span>
                        <span className="relative max-lg:w-full max-lg:max-w-sm">
                            <HiEnvelope className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required
                                className="w-90 rounded-xl border border-white/30 bg-white/95 py-3 pr-4 pl-9 text-sm shadow-lg transition-all duration-200 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 max-xl:w-75 max-lg:w-full"
                            />
                        </span>
                        <span className="relative max-lg:w-full max-lg:max-w-sm">
                            <HiPhone className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone Number"
                                className="w-90 rounded-xl border border-white/30 bg-white/95 py-3 pr-4 pl-9 text-sm shadow-lg transition-all duration-200 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 max-xl:w-75 max-lg:w-full"
                            />
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer rounded-xl bg-yellow-400 px-8 py-3 text-base font-bold text-yellow-900 shadow-lg shadow-yellow-500/30 transition-all duration-200 ease-in-out select-none hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 max-lg:w-full max-lg:max-w-sm"
                    >
                        {loading ? 'Subscribing…' : 'Subscribe Now →'}
                    </button>
                </form>
            </div>
        </div>
    );
}
