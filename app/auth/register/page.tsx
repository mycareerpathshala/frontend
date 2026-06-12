'use client';

// imports
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    HiEnvelope,
    HiEye,
    HiEyeSlash,
    HiGlobeAlt,
    HiLightBulb,
    HiLockClosed,
    HiShieldCheck,
    HiUser,
    HiUserPlus,
    HiChartBar,
} from 'react-icons/hi2';
import { MdWorkspacePremium, MdAutoAwesome } from 'react-icons/md';
import { TbRocket, TbTrophy, TbTargetArrow, TbBuildingCommunity } from 'react-icons/tb';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState<'student' | 'parent' | 'general'>('student');

    function getNextParam() {
        const params = new URLSearchParams(window.location.search);
        const next = params.get('next');
        return next ? `?next=${encodeURIComponent(next)}` : '';
    }
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const form = new FormData(e.currentTarget);
        const firstName = form.get('firstName') as string;
        const lastName = form.get('lastName') as string;
        const email = form.get('email') as string;
        const password = form.get('password') as string;
        const confirmPassword = form.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password, userType }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error ?? 'Registration failed');
                return;
            }

            router.push(`/auth/login${getNextParam()}`);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-50">
            {/* ── background blobs ── */}
            <div className="absolute -top-40 -right-40 size-125 rounded-full bg-fuchsia-200/50 blur-3xl" />
            <div className="absolute -right-20 -bottom-32 size-96 rounded-full bg-violet-200/45 blur-3xl" />
            <div className="absolute top-1/3 -left-20 size-80 rounded-full bg-purple-100/50 blur-3xl" />

            <div className="relative z-10 flex h-full w-full flex-row-reverse">
                {/* ── RIGHT: icon cluster ── */}
                <div className="hidden w-[56%] flex-col justify-center px-16 py-10 lg:flex">
                    {/* logo */}
                    <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={220} height={43} />

                    {/* heading */}
                    <h1 className="mt-8 max-w-lg text-[2.75rem] leading-[1.15] font-black tracking-tight text-slate-900">
                        Build the career you deserve.
                    </h1>

                    {/* subtitle */}
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
                        Join thousands of students discovering top universities, MBBS programs, and expert counsellors
                        worldwide.
                    </p>

                    {/* ── icon cluster ── */}
                    <div className="relative my-8 h-56 w-full">
                        {/* group 1 — left cluster */}
                        <div
                            style={{ animationDelay: '0s' }}
                            className="icon-float absolute top-2 left-[4%] flex size-20.5 rotate-6 items-center justify-center rounded-[22px] bg-fuchsia-500 shadow-xl shadow-fuchsia-200/70"
                        >
                            <TbRocket className="size-10 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-1.2s' }}
                            className="icon-float absolute top-16 left-[19%] flex size-16.5 -rotate-5 items-center justify-center rounded-[18px] bg-sky-500 shadow-lg shadow-sky-200/60"
                        >
                            <HiGlobeAlt className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-2.6s' }}
                            className="icon-float absolute top-36 left-[5%] flex size-18.5 rotate-3 items-center justify-center rounded-[20px] bg-purple-600 shadow-xl shadow-purple-200/60"
                        >
                            <HiLightBulb className="size-9 text-white" />
                        </div>

                        {/* group 2 — right cluster */}
                        <div
                            style={{ animationDelay: '-3.5s' }}
                            className="icon-float absolute top-1 left-[42%] flex size-24 -rotate-4 items-center justify-center rounded-[26px] bg-amber-500 shadow-xl shadow-amber-200/70"
                        >
                            <TbTrophy className="size-12 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-1.5s' }}
                            className="icon-float absolute top-16 left-[57%] flex size-15.5 rotate-7 items-center justify-center rounded-[17px] bg-emerald-500 shadow-lg shadow-emerald-200/60"
                        >
                            <MdWorkspacePremium className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-4s' }}
                            className="icon-float absolute top-20 left-[38%] flex size-14.5 -rotate-8 items-center justify-center rounded-2xl bg-pink-500 shadow-md shadow-pink-200/50"
                        >
                            <MdAutoAwesome className="size-7 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-2s' }}
                            className="icon-float absolute top-2 left-[67%] flex size-15 rotate-9 items-center justify-center rounded-[17px] bg-red-500 shadow-lg shadow-red-200/60"
                        >
                            <TbTargetArrow className="size-7 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-3.2s' }}
                            className="icon-float absolute top-36 left-[55%] flex size-17 -rotate-5 items-center justify-center rounded-[19px] bg-cyan-600 shadow-lg shadow-cyan-200/60"
                        >
                            <HiChartBar className="size-8 text-white" />
                        </div>
                        <div
                            style={{ animationDelay: '-0.6s' }}
                            className="icon-float absolute top-32.5 left-[72%] flex size-14.5 rotate-4 items-center justify-center rounded-2xl bg-lime-600 shadow-md shadow-lime-200/50"
                        >
                            <TbBuildingCommunity className="size-7 text-white" />
                        </div>
                    </div>

                    {/* feature highlights */}
                    <div className="flex gap-10">
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100">
                                <TbRocket className="size-5 text-fuchsia-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Fast Onboarding</p>
                                <p className="text-xs leading-relaxed text-slate-500">Get started in minutes</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-100">
                                <HiGlobeAlt className="size-5 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Global Reach</p>
                                <p className="text-xs leading-relaxed text-slate-500">
                                    40+ countries, 500+ universities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: floating card ── */}
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
                    {/* mobile logo */}
                    <div className="mb-6 lg:hidden">
                        <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={160} height={30} />
                    </div>

                    {/* card */}
                    <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl ring-1 shadow-slate-200/80 ring-slate-100/80">
                        {/* card top bar */}
                        <div className="mb-5 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 ring-1 ring-violet-100">
                                <HiUserPlus className="size-3.5 text-violet-500" />
                                <span className="text-xs font-semibold text-violet-600">Register</span>
                            </div>
                            <div className="size-2.5 rounded-full bg-violet-500" />
                        </div>

                        {/* heading */}
                        <h2 className="text-2xl font-extrabold text-slate-900">Create your account</h2>
                        <p className="mt-1 text-sm text-slate-400">Start your personalised career journey today.</p>

                        {/* form */}
                        <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
                            {/* first name + last name */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                                            <HiUser className="size-4 text-slate-400" />
                                        </span>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            placeholder="John"
                                            autoComplete="given-name"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="lastName"
                                        className="mb-1.5 block text-sm font-medium text-slate-700"
                                    >
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                                            <HiUser className="size-4 text-slate-400" />
                                        </span>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            autoComplete="family-name"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                        />
                                    </div>
                                </div>
                            </div>

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
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
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
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
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

                            {/* confirm password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
                                        <HiShieldCheck className="size-4 text-slate-400" />
                                    </span>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-10 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition-colors hover:text-slate-600"
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? (
                                            <HiEyeSlash className="size-4" />
                                        ) : (
                                            <HiEye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* user type */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    I am a
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['student', 'parent', 'general'] as const).map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setUserType(type)}
                                            className={`rounded-xl border py-2 text-sm font-semibold capitalize transition ${
                                                userType === type
                                                    ? 'border-violet-400 bg-violet-50 text-violet-700 ring-2 ring-violet-100'
                                                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* error */}
                            {error && (
                                <p className="rounded-lg bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 ring-1 ring-red-100">
                                    {error}
                                </p>
                            )}

                            {/* submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all duration-150 select-none hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <HiUserPlus className="size-4.5" />
                                {isLoading ? 'Creating account…' : 'Create Account'}
                            </button>
                        </form>

                        {/* divider */}
                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-xs text-slate-300">or</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        {/* login link */}
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                href="/auth/login"
                                className="font-semibold text-violet-600 transition-colors hover:text-violet-800"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    {/* back to home */}
                    <p className="mt-5 text-center text-xs text-slate-400">
                        <Link href="/" className="transition-colors hover:text-slate-700">
                            ← Back to homepage
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
