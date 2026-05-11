'use client';

// imports
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    HiArrowRightOnRectangle,
    HiEnvelope,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
    HiAcademicCap,
    HiBookOpen,
} from 'react-icons/hi2';
import { MdSchool, MdTravelExplore, MdSupportAgent, MdStar, MdGroups } from 'react-icons/md';
import { TbCertificate, TbBriefcase } from 'react-icons/tb';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function getNextPath() {
        const params = new URLSearchParams(window.location.search);
        const next = params.get('next');
        if (!next) return '/';
        // Only allow relative paths to prevent open-redirect attacks
        try {
            const url = new URL(next, window.location.origin);
            return url.origin === window.location.origin ? url.pathname : '/';
        } catch {
            return '/';
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const form = new FormData(e.currentTarget);
        const email = form.get('email') as string;
        const password = form.get('password') as string;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? 'Login failed');
                return;
            }

            window.location.href = getNextPath();
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-stone-50">
            {/* ── background blobs ── */}
            <div className="absolute -top-40 -left-40 size-125 rounded-full bg-orange-200/55 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-teal-200/50 blur-3xl" />
            <div className="absolute top-1/3 right-0 size-80 rounded-full bg-blue-100/40 blur-3xl" />

            <div className="relative z-10 flex h-full w-full">
                {/* ── LEFT: content ── */}
                <div className="hidden w-[56%] flex-col justify-center px-16 py-12 lg:flex">
                    {/* logo */}
                    <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={220} height={43} />

                    {/* heading */}
                    <h1 className="mt-10 max-w-lg text-[2.75rem] leading-[1.15] font-black tracking-tight text-slate-900">
                        Discover your perfect career path.
                    </h1>

                    {/* subtitle */}
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
                        Explore top universities, MBBS programs abroad, and get personalised guidance — all in one
                        place.
                    </p>

                    {/* ── icon cluster ── */}
                    <div className="relative my-10 h-56 w-full">
                        {/* group 1 — left cluster */}
                        <div
                            style={{ animationDelay: '0s' }}
                            className="icon-float absolute top-3 left-[4%] flex size-20.5 -rotate-7 items-center justify-center rounded-[22px] bg-orange-400 shadow-xl shadow-orange-200/70"
                        >
                            <MdSchool className="size-10 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-1s' }}
                            className="icon-float absolute top-18 left-[18%] flex size-16.5 rotate-5 items-center justify-center rounded-[18px] bg-slate-700 shadow-lg shadow-slate-300/60"
                        >
                            <HiBookOpen className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-2.4s' }}
                            className="icon-float absolute top-36 left-[6%] flex size-18.5 -rotate-3 items-center justify-center rounded-[20px] bg-violet-600 shadow-xl shadow-violet-200/60"
                        >
                            <HiAcademicCap className="size-9 text-white" />
                        </div>

                        {/* group 2 — right cluster */}
                        <div
                            style={{ animationDelay: '-3.1s' }}
                            className="icon-float absolute top-1 left-[42%] flex size-24 rotate-4 items-center justify-center rounded-[26px] bg-rose-500 shadow-xl shadow-rose-200/70"
                        >
                            <MdTravelExplore className="size-12 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-1.8s' }}
                            className="icon-float absolute top-17 left-[57%] flex size-15.5 -rotate-6 items-center justify-center rounded-[17px] bg-amber-400 shadow-lg shadow-amber-200/60"
                        >
                            <MdStar className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-3.8s' }}
                            className="icon-float absolute top-20 left-[38%] flex size-14.5 rotate-7 items-center justify-center rounded-2xl bg-slate-400 shadow-md shadow-slate-300/50"
                        >
                            <MdGroups className="size-7 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-2.7s' }}
                            className="icon-float absolute top-2 left-[66%] flex size-15 -rotate-9 items-center justify-center rounded-[17px] bg-teal-500 shadow-lg shadow-teal-200/60"
                        >
                            <MdSupportAgent className="size-7 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-4.2s' }}
                            className="icon-float absolute top-36 left-[55%] flex size-17 rotate-5 items-center justify-center rounded-[19px] bg-green-600 shadow-lg shadow-green-200/60"
                        >
                            <TbCertificate className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-0.8s' }}
                            className="icon-float absolute top-32.5 left-[72%] flex size-14.5 -rotate-4 items-center justify-center rounded-2xl bg-indigo-500 shadow-md shadow-indigo-200/50"
                        >
                            <TbBriefcase className="size-7 text-white" />
                        </div>
                    </div>

                    {/* feature highlights */}
                    <div className="flex gap-10">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                                <MdSchool className="size-5 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">500+ Universities</p>
                                <p className="text-xs leading-relaxed text-slate-500">Explore programs worldwide</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-100">
                                <MdSupportAgent className="size-5 text-teal-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Expert Counselling</p>
                                <p className="text-xs leading-relaxed text-slate-500">Personalised guidance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: floating card ── */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
                    {/* mobile logo */}
                    <div className="mb-8 lg:hidden">
                        <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={160} height={30} />
                    </div>

                    {/* card */}
                    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl ring-1 shadow-slate-200/80 ring-slate-100/80">
                        {/* card top bar */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 ring-1 ring-blue-100">
                                <HiArrowRightOnRectangle className="size-3.5 text-blue-500" />
                                <span className="text-xs font-semibold text-blue-600">Login</span>
                            </div>
                            <div className="size-2.5 rounded-full bg-blue-500" />
                        </div>

                        {/* heading */}
                        <h2 className="text-2xl font-extrabold text-slate-900">Welcome back</h2>
                        <p className="mt-1 text-sm text-slate-400">Login to continue your career journey.</p>

                        {/* form */}
                        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                            {/* email */}
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                                        <HiEnvelope className="size-4 text-slate-400" />
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                                        <HiLockClosed className="size-4 text-slate-400" />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-10 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-slate-600"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <HiEyeSlash className="size-4" />
                                        ) : (
                                            <HiEye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* forgot password */}
                            <div className="flex justify-end">
                                <Link
                                    href="#"
                                    className="text-xs font-medium text-blue-500 transition-colors hover:text-blue-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* error */}
                            {error && (
                                <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 ring-1 ring-red-100">
                                    {error}
                                </p>
                            )}

                            {/* submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-150 select-none hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <HiArrowRightOnRectangle className="size-4.5" />
                                {isLoading ? 'Loging in…' : 'Login'}
                            </button>
                        </form>

                        {/* divider */}
                        <div className="my-5 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-xs text-slate-300">or</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        {/* register */}
                        <p className="text-center text-sm text-slate-500">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/auth/register"
                                className="font-semibold text-blue-600 transition-colors hover:text-blue-800"
                            >
                                Create one free
                            </Link>
                        </p>
                    </div>

                    {/* back to home */}
                    <p className="mt-6 text-center text-xs text-slate-400">
                        <Link href="/" className="transition-colors hover:text-slate-700">
                            ← Back to homepage
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
