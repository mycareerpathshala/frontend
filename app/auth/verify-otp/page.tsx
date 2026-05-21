'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react';
import { HiEnvelope, HiShieldCheck } from 'react-icons/hi2';

const CODE_LENGTH = 6;

export default function VerifyOtpPage() {
    const [digits, setDigits]   = useState<string[]>(Array(CODE_LENGTH).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]     = useState<string | null>(null);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    function getNextPath() {
        if (typeof window === 'undefined') return '/';
        const params = new URLSearchParams(window.location.search);
        const next = params.get('next');
        if (!next) return '/';
        try {
            const url = new URL(next, window.location.origin);
            return url.origin === window.location.origin ? url.pathname : '/';
        } catch {
            return '/';
        }
    }

    function handleChange(index: number, value: string) {
        const char = value.replace(/\D/g, '').slice(-1);
        const next = [...digits];
        next[index] = char;
        setDigits(next);
        setError(null);
        if (char && index < CODE_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }

    function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
        if (!text) return;
        const next = Array(CODE_LENGTH).fill('');
        for (let i = 0; i < text.length; i++) next[i] = text[i];
        setDigits(next);
        setError(null);
        inputs.current[Math.min(text.length, CODE_LENGTH - 1)]?.focus();
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const code = digits.join('');
        if (code.length < CODE_LENGTH) {
            setError('Please enter the full 6-digit code.');
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ code }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? 'Verification failed.');
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
            {/* Background blobs */}
            <div className="absolute -top-40 -left-40 size-125 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-teal-200/50 blur-3xl" />

            <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={160} height={30} />
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 shadow-slate-200/80 ring-slate-100/80">
                        {/* Top bar */}
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 ring-1 ring-green-100">
                                <HiShieldCheck className="size-3.5 text-green-500" />
                                <span className="text-xs font-semibold text-green-600">2-Step Verification</span>
                            </div>
                            <div className="size-2.5 rounded-full bg-green-500" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-extrabold text-slate-900">Check your email</h2>
                        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-400">
                            <HiEnvelope className="size-4 shrink-0 text-slate-300" />
                            We sent a 6-digit code to your email address.
                        </p>

                        {/* OTP form */}
                        <form className="mt-7" onSubmit={handleSubmit}>
                            {/* Digit boxes */}
                            <div className="flex justify-between gap-2">
                                {digits.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={el => { inputs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        onPaste={handlePaste}
                                        autoFocus={i === 0}
                                        className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-800 transition outline-none focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                                    />
                                ))}
                            </div>

                            {/* Timer hint */}
                            <p className="mt-3 text-center text-xs text-slate-400">Code expires in 10 minutes.</p>

                            {/* Error */}
                            {error && (
                                <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 ring-1 ring-red-100">
                                    {error}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-150 select-none hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <HiShieldCheck className="size-4.5" />
                                {isLoading ? 'Verifying…' : 'Verify & Sign in'}
                            </button>
                        </form>

                        {/* Back to login */}
                        <p className="mt-5 text-center text-sm text-slate-500">
                            Wrong account?{' '}
                            <Link href="/auth/login" className="font-semibold text-blue-600 transition-colors hover:text-blue-800">
                                Back to login
                            </Link>
                        </p>
                    </div>

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
