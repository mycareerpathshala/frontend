'use client';

import { useAppContext } from '@/assets/context/AppContext';
import { useState } from 'react';
import {
    HiArrowRightOnRectangle,
    HiEnvelope,
    HiEye,
    HiEyeSlash,
    HiLockClosed,
    HiShieldCheck,
    HiUser,
    HiUserPlus,
    HiXMark,
} from 'react-icons/hi2';

type View = 'login' | 'register';

export default function AuthModal() {
    const { authModalEnabled, setAuthModalEnabled, setSession } = useAppContext();
    const [view, setView] = useState<View>('login');

    // login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPw, setShowLoginPw] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    // register state
    const [regFirstName, setRegFirstName] = useState('');
    const [regLastName, setRegLastName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [showRegPw, setShowRegPw] = useState(false);
    const [showRegConfirm, setShowRegConfirm] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const [regError, setRegError] = useState<string | null>(null);
    const [regSuccess, setRegSuccess] = useState(false);

    if (!authModalEnabled) return null;

    function close() {
        setAuthModalEnabled(false);
        setView('login');
        setLoginEmail('');
        setLoginPassword('');
        setLoginError(null);
        setRegFirstName('');
        setRegLastName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegError(null);
        setRegSuccess(false);
    }

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoginError(null);
        setLoginLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            const data = await res.json();
            if (!res.ok) {
                setLoginError(data.error ?? 'Login failed');
                return;
            }
            const me = await fetch('/api/auth/me').then((r) => r.json());
            setSession(me);
            close();
        } catch {
            setLoginError('Something went wrong. Please try again.');
        } finally {
            setLoginLoading(false);
        }
    }

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (regPassword !== regConfirmPassword) {
            setRegError('Passwords do not match');
            return;
        }
        setRegError(null);
        setRegLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: regFirstName,
                    lastName: regLastName,
                    email: regEmail,
                    password: regPassword,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setRegError(data.error ?? 'Registration failed');
                return;
            }
            setRegSuccess(true);
            setView('login');
        } catch {
            setRegError('Something went wrong. Please try again.');
        } finally {
            setRegLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) close();
            }}
        >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/20 max-h-[92vh] overflow-y-auto">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-6 py-5">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-4 right-4 z-50 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-red-400 active:scale-95"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-white/20">
                            {view === 'login' ? (
                                <HiArrowRightOnRectangle className="size-5 text-white" />
                            ) : (
                                <HiUserPlus className="size-5 text-white" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">
                                {view === 'login' ? 'Sign in to continue' : 'Create a free account'}
                            </h2>
                            <p className="text-xs text-blue-100/80">You need an account to apply</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    {view === 'login' ? (
                        <form className="flex flex-col gap-3.5" onSubmit={handleLogin}>
                            {regSuccess && (
                                <p className="rounded-lg bg-green-50 px-3.5 py-2.5 text-xs font-medium text-green-700 ring-1 ring-green-100">
                                    Account created! Please log in.
                                </p>
                            )}

                            <div>
                                <label htmlFor="modal-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <div className="relative">
                                    <HiEnvelope className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                    <input
                                        id="modal-email"
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="modal-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <HiLockClosed className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                    <input
                                        id="modal-password"
                                        type={showLoginPw ? 'text' : 'password'}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-10 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-3 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginPw((p) => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showLoginPw ? <HiEyeSlash className="size-4" /> : <HiEye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            {loginError && (
                                <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 ring-1 ring-red-100">
                                    {loginError}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <HiArrowRightOnRectangle className="size-4" />
                                {loginLoading ? 'Logging in…' : 'Login'}
                            </button>

                            <p className="text-center text-xs text-slate-500">
                                Don&apos;t have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setView('register');
                                        setLoginError(null);
                                        setRegSuccess(false);
                                    }}
                                    className="font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    Create one free
                                </button>
                            </p>
                        </form>
                    ) : (
                        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="modal-fn" className="mb-1.5 block text-sm font-medium text-slate-700">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <HiUser className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                        <input
                                            id="modal-fn"
                                            type="text"
                                            value={regFirstName}
                                            onChange={(e) => setRegFirstName(e.target.value)}
                                            placeholder="John"
                                            autoComplete="given-name"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="modal-ln" className="mb-1.5 block text-sm font-medium text-slate-700">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <HiUser className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                        <input
                                            id="modal-ln"
                                            type="text"
                                            value={regLastName}
                                            onChange={(e) => setRegLastName(e.target.value)}
                                            placeholder="Doe"
                                            autoComplete="family-name"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="modal-reg-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <div className="relative">
                                    <HiEnvelope className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                    <input
                                        id="modal-reg-email"
                                        type="email"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="modal-reg-pw" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <HiLockClosed className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                    <input
                                        id="modal-reg-pw"
                                        type={showRegPw ? 'text' : 'password'}
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegPw((p) => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showRegPw ? <HiEyeSlash className="size-4" /> : <HiEye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="modal-reg-cpw" className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <HiShieldCheck className="pointer-events-none absolute inset-y-0 left-3.5 my-auto size-4 text-slate-400" />
                                    <input
                                        id="modal-reg-cpw"
                                        type={showRegConfirm ? 'text' : 'password'}
                                        value={regConfirmPassword}
                                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-10 pl-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegConfirm((p) => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showRegConfirm ? <HiEyeSlash className="size-4" /> : <HiEye className="size-4" />}
                                    </button>
                                </div>
                            </div>

                            {regError && (
                                <p className="rounded-lg bg-red-50 px-3.5 py-2 text-xs font-medium text-red-600 ring-1 ring-red-100">
                                    {regError}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={regLoading}
                                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition-all hover:bg-violet-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <HiUserPlus className="size-4" />
                                {regLoading ? 'Creating account…' : 'Create Account'}
                            </button>

                            <p className="text-center text-xs text-slate-500">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setView('login');
                                        setRegError(null);
                                    }}
                                    className="font-semibold text-violet-600 hover:text-violet-800"
                                >
                                    Login
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
