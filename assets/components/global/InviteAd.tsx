'use client';

import { useAppContext } from '@/assets/context/AppContext';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    HiAcademicCap,
    HiBell,
    HiBookOpen,
    HiChatBubbleLeftRight,
    HiCheckCircle,
    HiSparkles,
    HiXMark,
} from 'react-icons/hi2';

const QUALIFYING_PREFIXES = ['/universities', '/mbbs', '/courses', '/blog'];
const DELAY_MS = 60_000;
const SESSION_KEY = 'mcpInviteAdDismissed';

function isQualifyingPath(pathname: string) {
    return QUALIFYING_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export default function InviteAd() {
    const { session, setAuthModalEnabled } = useAppContext();
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const qualifyingEntryTime = useRef<number | null>(null);

    useEffect(() => {
        if (session) { setVisible(false); return; }
        try { if (sessionStorage.getItem(SESSION_KEY)) return; } catch { /* ignore */ }

        if (!isQualifyingPath(pathname)) {
            qualifyingEntryTime.current = null;
            setVisible(false);
            return;
        }

        if (!qualifyingEntryTime.current) qualifyingEntryTime.current = Date.now();
        const elapsed = Date.now() - qualifyingEntryTime.current;
        const remaining = Math.max(0, DELAY_MS - elapsed);
        const timer = setTimeout(() => setVisible(true), remaining);
        return () => clearTimeout(timer);
    }, [pathname, session]);

    const dismiss = () => {
        setVisible(false);
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
    };
    const openAuth = () => { dismiss(); setAuthModalEnabled(true); };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" onClick={dismiss} />

            {/* Card */}
            <div className="animate-in fade-in zoom-in-95 relative z-10 flex w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/30 duration-300">

                {/* ══════════ LEFT PANEL — gradient ══════════ */}
                <div className="relative hidden w-[42%] shrink-0 flex-col justify-between overflow-hidden bg-linear-to-br from-violet-700 via-purple-600 to-indigo-700 px-8 py-8 sm:flex">
                    {/* Dot texture */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}
                    />
                    {/* Glow blob */}
                    <div className="pointer-events-none absolute -top-16 -left-16 size-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 -right-8 size-48 rounded-full bg-indigo-400/20 blur-2xl" />

                    {/* Top content */}
                    <div className="relative z-10">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 backdrop-blur-sm">
                            <HiSparkles className="size-3.5 text-yellow-300" />
                            <span className="text-xs font-bold text-white">100% Free · Always</span>
                        </div>

                        <h2 className="text-[1.6rem] font-extrabold leading-tight tracking-tight text-white">
                            Make Your<br />Study Abroad<br />Dream Real
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-purple-100/90">
                            Expert guidance, scholarship alerts, and personalised admission support — all in one place, completely free.
                        </p>

                        {/* Quick wins */}
                        <ul className="mt-5 space-y-2">
                            {['No registration fee', 'Certified advisors', 'Instant scholarship match'].map((item) => (
                                <li key={item} className="flex items-center gap-2.5 text-sm text-purple-100">
                                    <HiCheckCircle className="size-4 shrink-0 text-green-300" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Stats row */}
                    <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-white/20 pt-6">
                        {[
                            { num: '10K+', label: 'Students' },
                            { num: '500+', label: 'Universities' },
                            { num: '50+', label: 'Countries' },
                        ].map(({ num, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-xl font-extrabold text-white">{num}</p>
                                <p className="mt-0.5 text-[10px] font-medium text-purple-200">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══════════ RIGHT PANEL — white ══════════ */}
                <div className="flex flex-1 flex-col bg-white px-7 py-7">

                    {/* Header row */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            {/* Mobile-only title (left panel hidden on mobile) */}
                            <div className="mb-1 flex items-center gap-1.5 sm:hidden">
                                <HiAcademicCap className="size-4 text-violet-500" />
                                <span className="text-xs font-bold text-violet-600">Free for students</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-800">Everything you get for free</h3>
                            <p className="mt-0.5 text-xs text-slate-500">
                                Your complete study abroad toolkit, no cost attached
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Close"
                            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all hover:bg-red-100 hover:text-red-500"
                        >
                            <HiXMark className="size-4" />
                        </button>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2.5">
                        {[
                            {
                                Icon: HiChatBubbleLeftRight,
                                color: 'text-violet-600',
                                bg: 'bg-violet-50',
                                border: 'border-violet-100',
                                title: 'Expert Counselling Sessions',
                                desc: 'One-on-one video calls with certified study abroad advisors — personalised to your profile, goals, and budget.',
                            },
                            {
                                Icon: HiBell,
                                color: 'text-amber-500',
                                bg: 'bg-amber-50',
                                border: 'border-amber-100',
                                title: 'Scholarship & Grant Alerts',
                                desc: 'Get instant notifications for scholarships, grants and fee waivers that match your academic background.',
                            },
                            {
                                Icon: HiBookOpen,
                                color: 'text-emerald-600',
                                bg: 'bg-emerald-50',
                                border: 'border-emerald-100',
                                title: 'End-to-End Admission Guidance',
                                desc: "From shortlisting universities to SOP reviews, document checklists and deadline tracking — we've got you.",
                            },
                        ].map(({ Icon, color, bg, border, title, desc }) => (
                            <div
                                key={title}
                                className={`flex items-start gap-3.5 rounded-2xl border ${border} ${bg} px-4 py-3.5`}
                            >
                                <div className={`mt-0.5 shrink-0 ${color}`}>
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{title}</p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                        <p className="text-xs italic leading-relaxed text-slate-600">
                            &ldquo;I received a full scholarship after just two counselling sessions. This platform completely changed my future!&rdquo;
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex size-6 items-center justify-center rounded-full bg-violet-200 text-[10px] font-bold text-violet-700">
                                P
                            </div>
                            <p className="text-[11px] font-semibold text-slate-500">Priya S. &mdash; MBBS student, Russia</p>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-4 space-y-2">
                        <button
                            type="button"
                            onClick={openAuth}
                            className="w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-200/60 transition-all hover:brightness-110 active:scale-[0.98]"
                        >
                            Create Free Account →
                        </button>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={openAuth}
                                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-[0.98]"
                            >
                                Already a member? Sign in
                            </button>
                            <button
                                type="button"
                                onClick={dismiss}
                                className="flex-1 rounded-xl py-2.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
