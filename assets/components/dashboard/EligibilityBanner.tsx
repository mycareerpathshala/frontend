import { HiSparkles, HiArrowRight, HiAcademicCap, HiCheckBadge } from 'react-icons/hi2';

export default function EligibilityBanner() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-blue-950 to-blue-900">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            {/* Glow blobs */}
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 left-24 size-48 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8">
                {/* Left: text */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <HiSparkles className="size-4 text-amber-400" />
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                            AI-Powered Platform
                        </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white leading-tight mb-2">
                        Use our AI to find your eligibility{' '}
                        <br className="hidden lg:block" />
                        <span className="bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            for your dream university.
                        </span>
                    </h3>
                    <p className="text-sm text-blue-300/60 max-w-sm">
                        Explore your chances of admission and get matched with the best programs worldwide.
                    </p>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-4 mt-4">
                        {['500+ Universities', '40+ Countries', 'Free to use'].map((item) => (
                            <div key={item} className="flex items-center gap-1.5 text-xs text-blue-300/80 font-medium">
                                <HiCheckBadge className="size-3.5 text-cyan-400 shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                    <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/60 active:scale-[0.98] select-none">
                        <HiSparkles className="size-4" />
                        Check your eligibility
                    </button>

                    <div className="hidden sm:block h-10 w-px bg-white/15" />

                    <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-blue-300/70 font-medium text-center sm:text-left">
                            Already have a university in mind?
                        </p>
                        <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 text-sm font-bold hover:bg-blue-50 transition-all shadow-md active:scale-[0.98] select-none">
                            <HiAcademicCap className="size-4 text-blue-600" />
                            Apply Now
                            <HiArrowRight className="size-4 text-slate-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
