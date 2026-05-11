'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[page error]', error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Something went wrong</h1>
            <p className="text-sm text-slate-500">An unexpected error occurred. Please try again or go back home.</p>
            <div className="flex gap-3">
                <button
                    onClick={reset}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                >
                    Go home
                </Link>
            </div>
        </div>
    );
}
