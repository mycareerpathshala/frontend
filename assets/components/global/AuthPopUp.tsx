'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiArrowRightOnRectangle, HiDocumentText, HiSquares2X2, HiUserCircle, HiUserPlus } from 'react-icons/hi2';
import { MdOutlineExplore } from 'react-icons/md';
import { RiShieldUserLine } from 'react-icons/ri';

export default function AuthPopUp() {
    const { authPopupEnabled, setAuthPopupEnabled, session, setSession } = useAppContext();
    const router = useRouter();
    const pathname = usePathname();

    if (!authPopupEnabled) return null;

    const close = () => setAuthPopupEnabled(false);

    async function handleLogout() {
        close();
        await fetch('/api/auth/logout', { method: 'POST' });
        setSession(null);
        router.push('/');
    }

    return (
        <>
            {/* backdrop — dark overlay on mobile, invisible on desktop */}
            <div
                className="auth-backdrop-enter fixed inset-0 z-300 bg-black/60 min-[1150px]:z-100 min-[1150px]:bg-transparent"
                onClick={close}
            />

            {/* popup card — centered modal on mobile, dropdown on desktop */}
            <div className="auth-popup-enter fixed top-1/2 left-1/2 z-310 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 min-[1150px]:absolute min-[1150px]:top-full min-[1150px]:left-auto min-[1150px]:right-0 min-[1150px]:mt-2.5 min-[1150px]:w-72 min-[1150px]:translate-x-0 min-[1150px]:translate-y-0 min-[1150px]:z-110">
                {session ? (
                    <>
                        {/* authenticated header */}
                        <div className="from-primary-base to-primary-light relative overflow-hidden bg-linear-to-br px-5 py-4">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                            <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-white/8" />

                            <div className="relative flex items-center gap-3">
                                <div className="size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                                    <Image
                                        src={`/img/auth/avatars/${session.avatar}`}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="size-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-white">
                                        {session.firstName} {session.lastName}
                                    </p>
                                    <p className="truncate text-xs text-blue-100">{session.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* menu items */}
                        <div className="p-2">
                            <Link
                                href="/dashboard"
                                onClick={close}
                                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                <HiSquares2X2 className="size-4.5 shrink-0 text-slate-400" />
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/profile"
                                onClick={close}
                                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                <HiUserCircle className="size-4.5 shrink-0 text-slate-400" />
                                My Profile
                            </Link>
                            <Link
                                href="/dashboard/applications"
                                onClick={close}
                                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                            >
                                <HiDocumentText className="size-4.5 shrink-0 text-slate-400" />
                                Applications
                            </Link>

                            <div className="my-1.5 h-px bg-slate-100" />

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                            >
                                <HiArrowRightOnRectangle className="size-4.5 shrink-0" />
                                Log out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* guest header */}
                        <div className="from-primary-base to-primary-light relative overflow-hidden bg-linear-to-br px-5 py-5">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                            <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-white/8" />

                            <div className="relative flex items-center gap-3.5">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
                                    <RiShieldUserLine className="size-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-white">Welcome back</p>
                                    <p className="text-xs text-blue-100">Sign in to your account</p>
                                </div>
                            </div>
                        </div>

                        {/* body */}
                        <div className="px-5 py-4">
                            {/* feature hint */}
                            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-blue-50 px-3.5 py-3">
                                <MdOutlineExplore className="text-primary-base mt-0.5 size-4 shrink-0" />
                                <p className="text-xs leading-relaxed text-gray-500">
                                    Track applications, get personalised recommendations, and access your dashboard.
                                </p>
                            </div>

                            {/* login button */}
                            <Link
                                href={`/auth/login?next=${encodeURIComponent(pathname)}`}
                                onClick={close}
                                className="bg-primary-base hover:bg-primary-dark flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 select-none"
                            >
                                <HiArrowRightOnRectangle className="size-4" />
                                Login to your account
                            </Link>

                            {/* divider */}
                            <div className="my-3 flex items-center gap-3">
                                <div className="h-px flex-1 bg-gray-100" />
                                <span className="text-[11px] text-gray-400">or</span>
                                <div className="h-px flex-1 bg-gray-100" />
                            </div>

                            {/* register button */}
                            <Link
                                href="/auth/register"
                                onClick={close}
                                className="border-primary-lighter text-primary-base hover:bg-primary-bg flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-150 select-none"
                            >
                                <HiUserPlus className="size-4" />
                                Create an account
                            </Link>
                        </div>

                        {/* footer */}
                        <div className="border-t border-gray-100 bg-gray-50 px-5 py-2.5">
                            <p className="text-center text-[10px] text-gray-400">
                                Your career journey starts here &mdash;{' '}
                                <span className="text-primary-base font-medium">it&apos;s free</span>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
