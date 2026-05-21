'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { HiCheckCircle, HiXCircle, HiEnvelope } from 'react-icons/hi2';
import { Suspense } from 'react';
import { useAppContext } from '@/assets/context/AppContext';

function VerifyEmailContent() {
    const params = useSearchParams();
    const success = params.get('success') === '1';
    const error   = params.get('error');
    const { refreshSession } = useAppContext();
    const router = useRouter();

    return (
        <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
                <Image src="/img/mcp_logo.svg" alt="My Career Pathshala" width={160} height={30} />
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-2xl ring-1 shadow-slate-200/80 ring-slate-100/80">
                {success ? (
                    <>
                        <div className="mb-5 flex justify-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-green-50 ring-1 ring-green-100">
                                <HiCheckCircle className="size-9 text-green-500" />
                            </div>
                        </div>
                        <h2 className="text-center text-2xl font-extrabold text-slate-900">Email verified!</h2>
                        <p className="mt-2 text-center text-sm text-slate-400">
                            Your email address has been successfully verified.
                        </p>
                        <button
                            type="button"
                            onClick={async () => { await refreshSession(); router.push('/dashboard/profile'); }}
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700"
                        >
                            Go to Profile
                        </button>
                    </>
                ) : error ? (
                    <>
                        <div className="mb-5 flex justify-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100">
                                <HiXCircle className="size-9 text-red-400" />
                            </div>
                        </div>
                        <h2 className="text-center text-2xl font-extrabold text-slate-900">Link invalid</h2>
                        <p className="mt-2 text-center text-sm text-slate-400">
                            {error === 'invalid'
                                ? 'This verification link is invalid or has expired.'
                                : 'Something went wrong. Please try again.'}
                        </p>
                        <Link
                            href="/dashboard/profile"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700"
                        >
                            Back to Profile
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="mb-5 flex justify-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
                                <HiEnvelope className="size-9 text-blue-400" />
                            </div>
                        </div>
                        <h2 className="text-center text-2xl font-extrabold text-slate-900">Check your inbox</h2>
                        <p className="mt-2 text-center text-sm text-slate-400">
                            We sent a verification link to your email. Click it to verify your account.
                        </p>
                        <Link
                            href="/dashboard"
                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200"
                        >
                            Back to Dashboard
                        </Link>
                    </>
                )}
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
                <Link href="/" className="transition-colors hover:text-slate-700">
                    ← Back to homepage
                </Link>
            </p>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-stone-50">
            <div className="absolute -top-40 -left-40 size-125 rounded-full bg-blue-200/50 blur-3xl" />
            <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-teal-200/50 blur-3xl" />
            <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-12">
                <Suspense>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </div>
    );
}
