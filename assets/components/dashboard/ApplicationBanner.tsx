import Link from 'next/link';
import { HiArrowRight, HiCheckBadge, HiDocumentText } from 'react-icons/hi2';
import { MdSupportAgent } from 'react-icons/md';

export default function ApplicationBanner() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-blue-950 to-blue-900">
            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 left-24 size-48 rounded-full bg-cyan-400/10 blur-2xl" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
                {/* Left: text */}
                <div className="flex-1">
                    <div className="mb-3 flex items-center gap-2">
                        <HiDocumentText className="size-4 text-blue-300" />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                            Student Applications
                        </span>
                    </div>
                    <h3 className="mb-2 text-2xl font-extrabold leading-tight text-white">
                        Ready to apply to your{' '}
                        <br className="hidden lg:block" />
                        <span className="bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            dream university?
                        </span>
                    </h3>
                    <p className="max-w-sm text-sm text-blue-300/60">
                        Browse universities, shortlist your favourites, and submit your application — all in one place.
                    </p>

                    {/* Trust indicators */}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                        {['500+ Universities', '40+ Countries', 'Expert Guidance'].map((item) => (
                            <div key={item} className="flex items-center gap-1.5 text-xs font-medium text-blue-300/80">
                                <HiCheckBadge className="size-3.5 shrink-0 text-cyan-400" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: CTAs */}
                <div className="flex shrink-0 flex-col gap-3 min-w-56">
                    <Link
                        href="/dashboard/applications"
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/60 transition-all select-none hover:bg-blue-500 active:scale-[0.98]"
                    >
                        <HiDocumentText className="size-4" />
                        Start Application
                    </Link>
                    <Link
                        href="/dashboard/counselling"
                        className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all select-none hover:bg-white/20 active:scale-[0.98]"
                    >
                        <MdSupportAgent className="size-4 text-cyan-300" />
                        Talk to a Counsellor
                        <HiArrowRight className="size-3.5 ml-auto text-white/50" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
