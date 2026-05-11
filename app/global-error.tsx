'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[global error]', error);
    }, [error]);

    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1rem', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Something went wrong</h1>
                <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>An unexpected error occurred. Please try again.</p>
                <button
                    onClick={reset}
                    style={{ borderRadius: '0.75rem', backgroundColor: '#2563eb', padding: '0.625rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
