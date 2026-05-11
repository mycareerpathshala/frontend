'use client';

// imports
import { useState } from 'react';
import { HiCheckCircle, HiEnvelope, HiPhone, HiUser, HiXCircle } from 'react-icons/hi2';

type Status = { type: 'success' | 'error'; message: string } | null;

export default function BeSubscriber() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<Status>(null);

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
                setStatus({ type: 'success', message: data.message });
                setName('');
                setEmail('');
                setPhone('');
            } else {
                setStatus({ type: 'error', message: data.message });
            }
        } catch {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    }

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
                        Subscribe &amp; Get the Latest <span className="text-yellow-300">Admission Updates</span>
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
