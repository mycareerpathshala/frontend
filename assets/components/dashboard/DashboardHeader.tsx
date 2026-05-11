/* eslint-disable @next/next/no-img-element */
'use client';

import { useAppContext } from '@/assets/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
    HiArrowRightOnRectangle,
    HiArrowTopRightOnSquare,
    HiBars3,
    HiBell,
    HiBellSlash,
    HiCalendarDays,
    HiChatBubbleOvalLeftEllipsis,
    HiCheckCircle,
    HiCog6Tooth,
    HiDocumentText,
    HiPhone,
    HiSquares2X2,
    HiUserCircle,
    HiXCircle,
    HiXMark,
} from 'react-icons/hi2';

// ── Types ─────────────────────────────────────────────────────────────────────

type NotifType =
    | 'counselling_scheduled'
    | 'counselling_completed'
    | 'counselling_cancelled'
    | 'application_status_updated';

interface AppNotification {
    id: string;
    type: NotifType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const h = Math.floor(mins / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const NOTIF_ICON: Record<NotifType, { Icon: React.ElementType; bg: string; color: string }> = {
    counselling_scheduled: { Icon: HiCalendarDays, bg: 'bg-blue-50', color: 'text-blue-500' },
    counselling_completed: { Icon: HiCheckCircle, bg: 'bg-green-50', color: 'text-green-500' },
    counselling_cancelled: { Icon: HiXCircle, bg: 'bg-slate-100', color: 'text-slate-400' },
    application_status_updated: { Icon: HiDocumentText, bg: 'bg-indigo-50', color: 'text-indigo-500' },
};

// ── Nav tabs ──────────────────────────────────────────────────────────────────

const tabs = [
    { label: 'Dashboard', href: '/dashboard', icon: HiSquares2X2 },
    { label: 'My Profile', href: '/dashboard/profile', icon: HiUserCircle },
    { label: 'Counselling', href: '/dashboard/counselling', icon: HiChatBubbleOvalLeftEllipsis },
    { label: 'Applications', href: '/dashboard/applications', icon: HiDocumentText },
    { label: 'Settings', href: '/dashboard/settings', icon: HiCog6Tooth },
];

// ── Shared profile menu content ───────────────────────────────────────────────

function ProfileMenu({ onClose, onLogout }: { onClose: () => void; onLogout: () => void }) {
    const { session } = useAppContext();
    if (!session) return null;

    return (
        <>
            <div className="from-primary-base to-primary-light relative overflow-hidden bg-linear-to-br px-5 py-4">
                <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-white/8" />
                <div className="relative flex items-center gap-3">
                    <div className="size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                        <img
                            src={`/img/auth/avatars/${session.avatar}`}
                            alt="Avatar"
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

            <div className="border-b border-slate-100 p-2">
                <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl bg-blue-50 px-3.5 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                >
                    <HiArrowTopRightOnSquare className="size-4.5 shrink-0" />
                    Web Portal
                </Link>
            </div>

            <div className="p-2">
                <Link
                    href="/dashboard/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <HiUserCircle className="size-4.5 shrink-0 text-slate-400" />
                    Profile
                </Link>
                <Link
                    href="/dashboard/applications"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <HiDocumentText className="size-4.5 shrink-0 text-slate-400" />
                    Applications
                </Link>
                <Link
                    href="/dashboard/counselling"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <HiChatBubbleOvalLeftEllipsis className="size-4.5 shrink-0 text-slate-400" />
                    Counselling
                </Link>
                <Link
                    href="/contact"
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                    <HiPhone className="size-4.5 shrink-0 text-slate-400" />
                    Contact Us
                </Link>
                <div className="my-1.5 h-px bg-slate-100" />
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                    <HiArrowRightOnRectangle className="size-4.5 shrink-0" />
                    Log out
                </button>
            </div>
        </>
    );
}

// ── Notification dropdown ─────────────────────────────────────────────────────

function NotificationDropdown({ mobile = false }: { mobile?: boolean }) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<AppNotification[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/notifications');
                if (res.ok) {
                    const { data } = await res.json();
                    setItems(data ?? []);
                }
            } catch {
                /* ignore */
            }
        }

        load();
        const id = setInterval(load, 60_000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    async function markRead(id: string) {
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
        await fetch(`/api/notifications/${id}`, { method: 'PATCH' });
    }

    async function markAllRead() {
        setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
        await fetch('/api/notifications', { method: 'POST' });
    }

    const unreadCount = items.filter((n) => !n.isRead).length;

    return (
        <div ref={ref} className={mobile ? 'flex-1' : 'relative'}>
            {/* Trigger button — full-width on mobile, icon-only on desktop */}
            {mobile ? (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-200 active:scale-95"
                >
                    <div className="relative">
                        <HiBell className="size-5" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex size-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </div>
                    <span>Notifications</span>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="relative rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                >
                    <HiBell className="size-6" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-1 ring-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            )}

            {open && (
                <>
                    {/* Backdrop — dark on mobile, invisible on desktop */}
                    <div
                        className="auth-backdrop-enter fixed inset-0 z-300 bg-black/60 lg:bg-transparent"
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel — centered modal on mobile, dropdown on desktop */}
                    <div className="auth-popup-enter fixed top-1/2 left-1/2 z-310 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 lg:absolute lg:top-full lg:right-0 lg:left-auto lg:z-110 lg:mt-2.5 lg:w-80 lg:translate-x-0 lg:translate-y-0">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <HiBell className="size-4 text-slate-500" />
                                <span className="text-sm font-extrabold text-slate-800">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    onClick={markAllRead}
                                    className="text-[11px] font-bold text-blue-500 transition select-none hover:text-blue-700"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="max-h-96 overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100">
                                        <HiBellSlash className="size-6 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-500">No notifications yet</p>
                                    <p className="text-xs text-slate-400">
                                        We&apos;ll notify you when something happens
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {items.map((n) => {
                                        const { Icon, bg, color } = NOTIF_ICON[n.type];
                                        return (
                                            <div
                                                key={n.id}
                                                className={`flex items-start gap-3 px-4 py-3.5 transition-colors ${!n.isRead ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                                            >
                                                <div
                                                    className={`relative mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl ${bg}`}
                                                >
                                                    <Icon className={`size-4 ${color}`} />
                                                    {!n.isRead && (
                                                        <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p
                                                            className={`text-xs font-bold ${n.isRead ? 'text-slate-600' : 'text-slate-800'}`}
                                                        >
                                                            {n.title}
                                                        </p>
                                                        <span className="shrink-0 text-[10px] text-slate-400">
                                                            {timeAgo(n.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                                                        {n.message}
                                                    </p>
                                                    {!n.isRead && (
                                                        <button
                                                            type="button"
                                                            onClick={() => markRead(n.id)}
                                                            className="mt-1.5 text-[10px] font-bold text-blue-500 transition select-none hover:text-blue-700"
                                                        >
                                                            Mark as read
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-slate-100 px-4 py-2.5">
                                <p className="text-[10px] text-slate-400">
                                    Showing last {items.length} notification{items.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// ── DashboardHeader ───────────────────────────────────────────────────────────

export default function DashboardHeader() {
    const { session, setSession } = useAppContext();
    const path = usePathname();
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    async function handleLogout() {
        setProfileOpen(false);
        setMobileOpen(false);
        await fetch('/api/auth/logout', { method: 'POST' });
        setSession(null);
        router.push('/');
    }

    const closeProfile = () => setProfileOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 lg:px-6">
                    {/* ── Desktop layout (lg+) ──────────────────────────── */}
                    <div className="hidden h-16 items-center gap-5 lg:flex">
                        <Link href="/" className="relative h-11 w-48 shrink-0">
                            <Image
                                src="/img/mcp_logo.svg"
                                alt="My Career Pathshala"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>

                        <div className="h-7 w-px shrink-0 bg-slate-200" />

                        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
                            {tabs.map(({ label, href, icon: Icon }) => {
                                const isActive = href === '/dashboard' ? path === '/dashboard' : path.startsWith(href);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex items-center gap-2 rounded-xl border border-transparent px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all select-none hover:border-blue-500 ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-slate-500 hover:bg-sky-50 hover:text-blue-600'
                                        }`}
                                    >
                                        <Icon className="size-5 shrink-0" />
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex shrink-0 items-center gap-2.5">
                            <NotificationDropdown />

                            {session && (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setProfileOpen((v) => !v)}
                                        className="group flex cursor-pointer items-center gap-2.5 rounded-full bg-blue-500 py-1.5 pr-3.5 pl-2 shadow-lg ring-1 ring-transparent transition-all duration-150 select-none hover:bg-white hover:shadow-md hover:ring-blue-500 active:scale-95"
                                    >
                                        <span className="size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white">
                                            <img
                                                src={`/img/auth/avatars/${session.avatar}`}
                                                alt="Avatar"
                                                className="size-full object-cover"
                                            />
                                        </span>
                                        <span className="text-sm font-semibold text-white group-hover:text-blue-500">
                                            {session.firstName} {session.lastName}
                                        </span>
                                    </button>

                                    {profileOpen && (
                                        <>
                                            <div className="fixed inset-0 z-100" onClick={closeProfile} />
                                            <div className="absolute top-full right-0 z-110 mt-2.5 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
                                                <ProfileMenu onClose={closeProfile} onLogout={handleLogout} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Mobile top bar (below lg) ─────────────────────── */}
                    <div className="-mx-4 flex shrink-0 items-center justify-between px-4 py-3.5 lg:hidden">
                        <Link href="/" className="relative h-10 w-48 shrink-0">
                            <Image
                                src="/img/mcp_logo.svg"
                                alt="My Career Pathshala"
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open navigation"
                            className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 active:bg-gray-200"
                        >
                            <HiBars3 className="size-7" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile menu overlay ───────────────────────────────────────── */}
            <div
                className={`fixed inset-x-0 top-0 z-200 flex h-screen flex-col overflow-hidden bg-white transition-transform duration-300 ease-in-out lg:hidden ${
                    mobileOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                {/* Top bar */}
                <div className="flex shrink-0 items-center justify-between px-4 py-3.5 shadow-sm">
                    <Link href="/" onClick={() => setMobileOpen(false)} className="relative h-10 w-44">
                        <Image
                            src="/img/mcp_logo.svg"
                            alt="My Career Pathshala"
                            fill
                            className="object-contain object-left"
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close navigation"
                        className="bg-primary-base flex items-center justify-center rounded-lg p-2 text-white transition-all active:scale-95"
                    >
                        <HiXMark className="size-6" />
                    </button>
                </div>

                {/* Nav links */}
                <ul className="mt-6 flex flex-col gap-1.5 overflow-y-auto px-4">
                    {tabs.map(({ label, href, icon: Icon }) => {
                        const isActive = href === '/dashboard' ? path === '/dashboard' : path.startsWith(href);
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon className="size-5 shrink-0" />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Bottom actions */}
                <div className="mt-auto flex shrink-0 flex-row gap-3 px-4 py-4 max-sm:flex-col">
                    <NotificationDropdown mobile />

                    {session && (
                        <button
                            type="button"
                            onClick={() => setProfileOpen((v) => !v)}
                            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-blue-50 px-4 py-3 transition-all hover:bg-blue-100 active:scale-95"
                        >
                            <img
                                src={`/img/auth/avatars/${session.avatar}`}
                                className="size-8 rounded-full"
                                alt="User avatar"
                            />
                            <span className="text-primary-base font-semibold">{session.firstName}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* ── Mobile profile modal (above the overlay, below lg only) ──── */}
            {profileOpen && session && (
                <>
                    <div
                        className="auth-backdrop-enter fixed inset-0 z-300 bg-black/60 lg:hidden"
                        onClick={closeProfile}
                    />
                    <div className="auth-popup-enter fixed top-1/2 left-1/2 z-310 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 lg:hidden">
                        <ProfileMenu onClose={closeProfile} onLogout={handleLogout} />
                    </div>
                </>
            )}
        </>
    );
}
