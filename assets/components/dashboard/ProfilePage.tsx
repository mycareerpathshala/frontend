'use client';

import { useAppContext } from '@/assets/context/AppContext';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
    HiArrowLeft,
    HiArrowRightOnRectangle,
    HiCamera,
    HiCheck,
    HiCheckBadge,
    HiChevronDown,
    HiEnvelope,
    HiExclamationTriangle,
    HiEye,
    HiEyeSlash,
    HiIdentification,
    HiLockClosed,
    HiPencilSquare,
    HiPhone,
    HiPlus,
    HiShieldCheck,
    HiSparkles,
    HiTrash,
    HiUser,
    HiXMark,
} from 'react-icons/hi2';
import { MdCalendarMonth, MdPerson, MdPublic } from 'react-icons/md';
import CountrySelector from './CountrySelector';
import DatePicker from './DatePicker';
import DialCodeSelector, { DEFAULT_DIAL_COUNTRY, parsePhone, type DialCountry } from './DialCodeSelector';

// ── Profile data type ─────────────────────────────────────────────────────────

type UserType = 'student' | 'parent' | 'general';

const USER_TYPE_OPTIONS: { value: UserType; label: string }[] = [
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' },
    { value: 'general', label: 'General' },
];

interface ProfileData {
    phone: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    country: string | null;
    secondaryEmail: string | null;
    userType: UserType;
    avatar: string;
    isVerified: boolean;
    createdAt: string;
}

// ── Profile completion ────────────────────────────────────────────────────────

interface CompletionField {
    label: string;
    done: boolean;
}

function getCompletionFields(profile: ProfileData | null, avatarFromSession: string): CompletionField[] {
    return [
        { label: 'First name', done: true }, // required at sign-up
        { label: 'Last name', done: true }, // required at sign-up
        { label: 'Phone number', done: !!profile?.phone },
        { label: 'Date of birth', done: !!profile?.dateOfBirth },
        { label: 'Gender', done: !!profile?.gender },
        { label: 'Country', done: !!profile?.country },
        { label: 'Secondary email', done: !!profile?.secondaryEmail },
        { label: 'Custom avatar', done: avatarFromSession !== 'avatar_01.png' },
    ];
}

function computeCompletion(profile: ProfileData | null, avatar: string): number {
    const fields = getCompletionFields(profile, avatar);
    const done = fields.filter((f) => f.done).length;
    return Math.round((done / fields.length) * 100);
}

function completionColor(pct: number) {
    if (pct < 40) return { bar: 'from-red-400 to-orange-400', text: 'text-orange-500' };
    if (pct < 70) return { bar: 'from-amber-400 to-yellow-400', text: 'text-amber-500' };
    if (pct < 100) return { bar: 'from-blue-500 to-indigo-400', text: 'text-blue-600' };
    return { bar: 'from-green-400 to-emerald-400', text: 'text-green-600' };
}

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionCard({
    children,
    className = '',
    allowOverflow = false,
}: {
    children: React.ReactNode;
    className?: string;
    allowOverflow?: boolean;
}) {
    return (
        <div
            className={`${allowOverflow ? 'overflow-visible' : 'overflow-hidden'} rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 ${className}`}
        >
            {children}
        </div>
    );
}

function CardHead({
    title,
    subtitle,
    editing,
    saving,
    onEdit,
    onSave,
    onCancel,
}: {
    title: string;
    subtitle?: string;
    editing?: boolean;
    saving?: boolean;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
}) {
    return (
        <div className="flex items-start justify-between border-b border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
            <div>
                <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
                {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
            </div>
            <div className="mt-0.5 flex items-center gap-2">
                {editing ? (
                    <>
                        <span className="rounded-full border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                            Editing
                        </span>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all select-none hover:bg-slate-50 disabled:opacity-40"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={saving}
                            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all select-none hover:bg-blue-700 disabled:opacity-60"
                        >
                            {saving ? (
                                <div className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            ) : (
                                <HiCheck className="size-3" />
                            )}
                            Save
                        </button>
                    </>
                ) : onEdit ? (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all select-none hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <HiPencilSquare className="size-3.5" />
                        Edit
                    </button>
                ) : null}
            </div>
        </div>
    );
}

function SavedBanner({ message }: { message: string }) {
    return (
        <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-2.5">
            <HiCheckBadge className="size-4 shrink-0 text-green-500" />
            <p className="text-xs font-semibold text-green-700">{message}</p>
        </div>
    );
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="mx-6 mt-4 flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5">
            <HiExclamationTriangle className="size-4 shrink-0 text-red-400" />
            <p className="text-xs font-semibold text-red-600">{message}</p>
        </div>
    );
}

function InputField({
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    disabled = false,
}: {
    label: string;
    value: string;
    onChange?: (v: string) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}) {
    return (
        <div>
            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all outline-none ${
                    disabled
                        ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
                        : 'border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100'
                }`}
            />
        </div>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <div>
            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {label}
            </label>
            <div className="relative">
                <select
                    title={label}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                    <option value="">Select…</option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <HiChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400" />
            </div>
        </div>
    );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 border-b border-slate-50 py-3 last:border-0">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <Icon className="size-4 text-slate-400" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">{label}</p>
                <p
                    className={`mt-0.5 truncate text-sm font-medium ${value ? 'text-slate-700' : 'text-slate-300 italic'}`}
                >
                    {value || 'Not provided'}
                </p>
            </div>
        </div>
    );
}

// ── Avatar picker popup ───────────────────────────────────────────────────────

const AVATAR_LIST = Array.from({ length: 46 }, (_, i) => `avatar_${String(i + 1).padStart(2, '0')}.png`);

function AvatarPickerPopup({
    current,
    onClose,
    onConfirm,
}: {
    current: string;
    onClose: () => void;
    onConfirm: (av: string) => void;
}) {
    const [selected, setSelected] = useState(current);
    const avatarNumber = parseInt(selected.replace('avatar_', '').replace('.png', ''), 10);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/25">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-6 py-5">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-all select-none hover:bg-red-400 active:scale-95"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
                            <HiCamera className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-extrabold text-white">Choose Your Avatar</h2>
                            <p className="text-xs text-blue-100/80">{AVATAR_LIST.length} avatars available</p>
                        </div>
                    </div>
                </div>

                {/* Body: preview + grid */}
                <div className="flex flex-col divide-y divide-slate-100 sm:flex-row sm:divide-x sm:divide-y-0">
                    {/* Left — live preview */}
                    <div className="flex shrink-0 flex-row items-center gap-4 px-5 py-4 sm:w-48 sm:flex-col sm:justify-center sm:px-6 sm:py-8">
                        <div className="relative">
                            <div className="size-20 overflow-hidden rounded-3xl bg-blue-50 shadow-lg ring-4 ring-blue-100 sm:size-28">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`/img/auth/avatars/${selected}`}
                                    alt="Selected avatar"
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="absolute -right-1.5 -bottom-1.5 flex size-7 items-center justify-center rounded-full bg-blue-600 shadow-md ring-2 ring-white">
                                <HiCheck className="size-3.5 text-white" />
                            </div>
                        </div>
                        <div className="sm:text-center">
                            <p className="text-xs font-extrabold text-slate-700">Avatar #{avatarNumber}</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">Click any avatar to preview</p>
                            {selected !== current && (
                                <span className="mt-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 ring-1 ring-blue-100">
                                    New selection
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right — scrollable grid */}
                    <div className="flex-1 p-4 sm:p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Select an avatar
                            </p>
                            <p className="text-[10px] text-slate-300">{AVATAR_LIST.length} options</p>
                        </div>
                        <div className="grid max-h-52 grid-cols-5 gap-2 overflow-y-auto pt-1 pr-1 sm:max-h-72 sm:grid-cols-7 [scrollbar-width:thin]">
                            {AVATAR_LIST.map((av) => {
                                const isSelected = selected === av;
                                const isCurrent = av === current;
                                return (
                                    <button
                                        key={av}
                                        type="button"
                                        onClick={() => setSelected(av)}
                                        className={`group relative rounded-2xl border-2 p-1 transition-all ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                                                : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                        title={`Avatar ${parseInt(av.replace('avatar_', '').replace('.png', ''), 10)}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`/img/auth/avatars/${av}`}
                                            alt={av}
                                            className={`aspect-square w-full rounded-xl object-cover transition-transform group-hover:scale-105 ${
                                                isSelected ? 'scale-105' : ''
                                            }`}
                                        />
                                        {/* Selected checkmark */}
                                        {isSelected && (
                                            <div className="ring-1.5 absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-blue-500 shadow-sm ring-white">
                                                <HiCheck className="size-2.5 text-white" />
                                            </div>
                                        )}
                                        {/* Current indicator (dot) */}
                                        {isCurrent && !isSelected && (
                                            <div className="ring-1.5 absolute -top-1 -right-1 size-3 rounded-full bg-slate-300 ring-white" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-2.5 text-[10px] text-slate-300">
                            <span className="inline-block size-2.5 rounded-full bg-slate-300 align-middle" /> = current
                            avatar
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-xs text-slate-400">
                        {selected === current ? 'No changes made' : 'Avatar changed — click Confirm to save'}
                    </p>
                    <div className="flex items-center gap-2 sm:shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all select-none hover:bg-slate-50 sm:flex-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => onConfirm(selected)}
                            disabled={selected === current}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all select-none hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                        >
                            <HiCheck className="size-4" />
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Profile Hero ──────────────────────────────────────────────────────────────

function ProfileHero({
    profile,
    completion,
    onAvatarSaved,
}: {
    profile: ProfileData | null;
    completion: number;
    onAvatarSaved: () => void;
}) {
    const { session, setSession } = useAppContext();
    const [avatarPopup, setAvatarPopup] = useState(false);
    const avatar = session?.avatar ?? 'avatar_01.png';

    async function handleAvatarConfirm(av: string) {
        setAvatarPopup(false);
        const res = await fetch('/api/auth/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatar: av }),
        });
        if (res.ok && session) {
            setSession({ ...session, avatar: av });
            onAvatarSaved();
        }
    }

    const { bar, text } = completionColor(completion);
    const missing = profile
        ? getCompletionFields(profile, avatar)
              .filter((f) => !f.done)
              .map((f) => f.label)
        : [];

    return (
        <>
            {avatarPopup && (
                <AvatarPickerPopup
                    current={avatar}
                    onClose={() => setAvatarPopup(false)}
                    onConfirm={handleAvatarConfirm}
                />
            )}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                {/* Cover gradient */}
                <div className="relative h-28 bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <div className="pointer-events-none absolute -top-8 -right-8 size-40 rounded-full bg-white/5 blur-2xl" />
                    <div className="pointer-events-none absolute bottom-0 left-1/3 size-24 rounded-full bg-indigo-400/20 blur-xl" />
                </div>

                <div className="px-6 pb-6">
                    {/* Avatar row */}
                    <div className="-mt-10 mb-4 flex items-end justify-between">
                        <div className="relative">
                            <div className="size-20 overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white">
                                {session ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={`/img/auth/avatars/${avatar}`}
                                        alt="Profile"
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <div className="flex size-full items-center justify-center bg-slate-100">
                                        <HiUser className="size-10 text-slate-300" />
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setAvatarPopup(true)}
                                className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm ring-2 ring-white transition-all hover:bg-blue-700"
                                title="Change avatar"
                            >
                                <HiCamera className="size-3.5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 pb-1">
                            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                                <HiIdentification className="size-3.5" />
                                ID&nbsp;#{session?.userId?.slice(0, 8) ?? '—'}
                            </span>
                            <span className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 capitalize">
                                <HiShieldCheck className="size-3.5 text-blue-500" />
                                {USER_TYPE_OPTIONS.find(o => o.value === (profile?.userType ?? 'student'))?.label ?? 'Student'}
                            </span>
                        </div>
                    </div>

                    {/* Name & email */}
                    <div className="mb-5">
                        <h2 className="text-xl font-extrabold text-slate-800">
                            {session ? `${session.firstName} ${session.lastName}` : 'Student User'}
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-400">{session?.email ?? 'user@example.com'}</p>
                    </div>

                    {/* Profile completion */}
                    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HiSparkles className="size-3.5 text-amber-500" />
                                <span className="text-xs font-bold text-slate-600">Profile Completion</span>
                            </div>
                            <span className={`text-xs font-extrabold ${text}`}>{completion}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                                className={`h-full rounded-full bg-linear-to-r transition-all duration-700 ${bar}`}
                                style={{ width: `${completion}%` }}
                            />
                        </div>
                        {missing.length > 0 ? (
                            <p className="mt-2 text-[11px] text-slate-400">
                                Still missing:&nbsp;
                                <span className="font-semibold text-slate-500">
                                    {missing.slice(0, 3).join(', ')}
                                    {missing.length > 3 ? ` +${missing.length - 3} more` : ''}
                                </span>
                            </p>
                        ) : (
                            <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-green-600">
                                <HiCheckBadge className="size-3.5" />
                                Your profile is complete!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Personal Information Card ─────────────────────────────────────────────────

interface PersonalForm {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    userType: UserType;
}

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

function PersonalInfoCard({ profile, onSaved }: { profile: ProfileData | null; onSaved: () => void }) {
    const { session, setSession } = useAppContext();

    const [form, setForm] = useState<PersonalForm>({
        firstName: session?.firstName ?? '',
        lastName: session?.lastName ?? '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        country: '',
        userType: 'student',
    });
    const [draft, setDraft] = useState<PersonalForm>(form);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [dialCountry, setDialCountry] = useState<DialCountry>(DEFAULT_DIAL_COUNTRY);
    const [phoneNumber, setPhoneNumber] = useState('');

    // Sync from fetched profile data
    useEffect(() => {
        if (!profile && !session) return;
        setForm({
            firstName: session?.firstName ?? '',
            lastName: session?.lastName ?? '',
            phone: profile?.phone ?? '',
            dateOfBirth: profile?.dateOfBirth ?? '',
            gender: profile?.gender ?? '',
            country: profile?.country ?? '',
            userType: profile?.userType ?? 'student',
        });
    }, [profile, session]);

    function handleEdit() {
        setDraft(form);
        setError('');
        const parsed = parsePhone(form.phone);
        setDialCountry(parsed.country);
        setPhoneNumber(parsed.number);
        setEditing(true);
    }
    function handleCancel() {
        setEditing(false);
        setError('');
    }

    async function handleSave() {
        setSaving(true);
        setError('');
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: draft.firstName,
                    lastName: draft.lastName,
                    phone: phoneNumber.trim() ? `${dialCountry.dial} ${phoneNumber.trim()}` : null,
                    dateOfBirth: draft.dateOfBirth || null,
                    gender: draft.gender || null,
                    country: draft.country || null,
                    userType: draft.userType,
                }),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error ?? 'Failed to save.');
                return;
            }
            setForm(draft);
            setEditing(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            if (session) setSession({ ...session, firstName: draft.firstName, lastName: draft.lastName });
            onSaved();
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    }

    const genderLabel = GENDER_OPTIONS.find((o) => o.value === form.gender)?.label ?? '';

    return (
        <SectionCard allowOverflow>
            <CardHead
                title="Personal Information"
                subtitle="Your basic profile details"
                editing={editing}
                saving={saving}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />
            {saved && <SavedBanner message="Personal information saved successfully." />}
            {error && <ErrorBanner message={error} />}

            <div className="p-6">
                {editing ? (
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                            label="First Name"
                            value={draft.firstName}
                            onChange={(v) => setDraft((p) => ({ ...p, firstName: v }))}
                            placeholder="Enter first name"
                        />
                        <InputField
                            label="Last Name"
                            value={draft.lastName}
                            onChange={(v) => setDraft((p) => ({ ...p, lastName: v }))}
                            placeholder="Enter last name"
                        />
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Phone Number
                            </label>
                            <div className="flex gap-2">
                                <DialCodeSelector value={dialCountry} onChange={setDialCountry} />
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value.replace(/[^\d\s\-()]/g, ''))}
                                    placeholder="Phone number"
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 transition outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Date of Birth
                            </label>
                            <DatePicker
                                value={draft.dateOfBirth}
                                onChange={(v) => setDraft((p) => ({ ...p, dateOfBirth: v }))}
                                placeholder="Select date of birth"
                            />
                        </div>
                        <SelectField
                            label="Gender"
                            value={draft.gender}
                            onChange={(v) => setDraft((p) => ({ ...p, gender: v }))}
                            options={GENDER_OPTIONS}
                        />
                        <CountrySelector
                            label="Country"
                            value={draft.country}
                            onChange={(v) => setDraft((p) => ({ ...p, country: v }))}
                        />
                        <SelectField
                            label="I am a"
                            value={draft.userType}
                            onChange={(v) => setDraft((p) => ({ ...p, userType: v as UserType }))}
                            options={USER_TYPE_OPTIONS}
                        />
                    </div>
                ) : (
                    <div>
                        <InfoRow
                            icon={HiUser}
                            label="Full Name"
                            value={[form.firstName, form.lastName].filter(Boolean).join(' ')}
                        />
                        <InfoRow icon={HiPhone} label="Phone Number" value={form.phone} />
                        <InfoRow icon={MdCalendarMonth} label="Date of Birth" value={form.dateOfBirth} />
                        <InfoRow icon={MdPerson} label="Gender" value={genderLabel} />
                        <InfoRow icon={MdPublic} label="Country" value={form.country} />
                        <InfoRow icon={HiShieldCheck} label="I am a" value={USER_TYPE_OPTIONS.find(o => o.value === form.userType)?.label ?? 'Student'} />
                    </div>
                )}
            </div>
        </SectionCard>
    );
}

// ── Contact & Email Card ──────────────────────────────────────────────────────

function ContactCard({ profile, onSaved }: { profile: ProfileData | null; onSaved: () => void }) {
    const { session } = useAppContext();
    const [secondaryEmail, setSecondaryEmail] = useState('');
    const [draft, setDraft] = useState('');
    const [editingSecondary, setEditingSecondary] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [verifySent, setVerifySent] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);

    async function handleSendVerification() {
        setVerifyLoading(true);
        try {
            await fetch('/api/auth/send-verification', { method: 'POST' });
            setVerifySent(true);
        } finally {
            setVerifyLoading(false);
        }
    }

    // Sync from fetched profile data
    useEffect(() => {
        setSecondaryEmail(profile?.secondaryEmail ?? '');
    }, [profile]);

    async function handleSaveSecondary() {
        setSaving(true);
        setError('');
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secondaryEmail: draft || null }),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error ?? 'Failed to save.');
                return;
            }
            setSecondaryEmail(draft);
            setEditingSecondary(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            onSaved();
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    }

    async function handleRemoveSecondary() {
        try {
            await fetch('/api/auth/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secondaryEmail: null }),
            });
            setSecondaryEmail('');
            onSaved();
        } catch {
            /* optimistic — already removed from UI */
        }
    }

    return (
        <SectionCard>
            <CardHead title="Contact & Email" subtitle="Manage your email addresses" />
            {saved && <SavedBanner message="Secondary email updated successfully." />}
            {error && <ErrorBanner message={error} />}

            <div className="space-y-3 p-4 sm:p-6">
                {/* Primary email — read-only */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                        <div className="flex min-w-0 items-start gap-3">
                            <HiEnvelope className="mt-0.5 size-4 shrink-0 text-slate-400" />
                            <div className="min-w-0">
                                <p className="mb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    Primary Email
                                </p>
                                <p className="truncate text-sm font-medium text-slate-700">
                                    {session?.email ?? 'user@example.com'}
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                            <HiLockClosed className="size-3.5 text-slate-400" />
                            <span className="text-[10px] font-semibold text-slate-400">Primary</span>
                        </div>
                    </div>
                    {session?.isVerified ? (
                        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2">
                            <HiCheckBadge className="size-3.5 shrink-0 text-green-500" />
                            <span className="text-[10px] font-semibold text-green-600">Email verified</span>
                        </div>
                    ) : verifySent ? (
                        <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
                            <HiEnvelope className="size-3 shrink-0 text-blue-500" />
                            <span className="text-[10px] font-medium text-blue-600">Verification email sent — check your inbox</span>
                        </div>
                    ) : (
                        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
                            <HiExclamationTriangle className="size-3 shrink-0 text-amber-500" />
                            <span className="text-[10px] font-medium text-amber-600">Not verified — check your inbox</span>
                            <button
                                type="button"
                                onClick={handleSendVerification}
                                disabled={verifyLoading}
                                className="ml-auto text-[10px] font-bold text-amber-600 underline transition-colors select-none hover:text-amber-700 disabled:opacity-50"
                            >
                                {verifyLoading ? 'Sending…' : 'Verify now'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Secondary email */}
                {editingSecondary ? (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-4 py-3.5">
                        <p className="mb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                            Secondary Email
                        </p>
                        <input
                            type="email"
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Enter secondary email address"
                            className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setEditingSecondary(false)}
                                disabled={saving}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all select-none hover:bg-white disabled:opacity-40"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveSecondary}
                                disabled={saving}
                                className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all select-none hover:bg-blue-700 disabled:opacity-60"
                            >
                                {saving ? (
                                    <div className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                ) : (
                                    <HiCheck className="size-3" />
                                )}
                                Save
                            </button>
                        </div>
                    </div>
                ) : secondaryEmail ? (
                    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-3">
                            <div className="flex min-w-0 items-start gap-3">
                                <HiEnvelope className="mt-0.5 size-4 shrink-0 text-slate-400" />
                                <div className="min-w-0">
                                    <p className="mb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        Secondary Email
                                    </p>
                                    <p className="truncate text-sm font-medium text-slate-700">{secondaryEmail}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDraft(secondaryEmail);
                                        setEditingSecondary(true);
                                    }}
                                    className="flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-500 transition-colors select-none hover:bg-blue-100 hover:text-blue-700"
                                >
                                    <HiPencilSquare className="size-3.5" /> Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveSecondary}
                                    className="flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-400 transition-colors select-none hover:bg-red-100 hover:text-red-600"
                                >
                                    <HiTrash className="size-3.5" /> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setDraft('');
                            setEditingSecondary(true);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-400 transition-all select-none hover:border-blue-200 hover:bg-blue-50/30 hover:text-blue-500"
                    >
                        <HiPlus className="size-4" />
                        Add secondary email
                    </button>
                )}
            </div>
        </SectionCard>
    );
}

// ── Account Security Card ─────────────────────────────────────────────────────

function SecurityCard() {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleCancel() {
        setEditing(false);
        setError('');
        setCurrent('');
        setNewPass('');
        setConfirm('');
    }

    async function handleSave() {
        if (!current) {
            setError('Please enter your current password.');
            return;
        }
        if (newPass.length < 8) {
            setError('New password must be at least 8 characters.');
            return;
        }
        if (newPass !== confirm) {
            setError('New passwords do not match.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            const res = await fetch('/api/auth/password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ current, newPassword: newPass }),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error ?? 'Failed to update password.');
                return;
            }
            handleCancel();
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <SectionCard>
            <CardHead
                title="Account Security"
                subtitle="Update your password"
                editing={editing}
                saving={saving}
                onEdit={() => setEditing(true)}
                onSave={handleSave}
                onCancel={handleCancel}
            />
            {saved && <SavedBanner message="Password updated successfully." />}
            {error && editing && <ErrorBanner message={error} />}

            <div className="p-6">
                {editing ? (
                    <div className="space-y-4">
                        {[
                            {
                                label: 'Current Password',
                                val: current,
                                set: setCurrent,
                                show: showCurrent,
                                toggle: () => setShowCurrent((v) => !v),
                            },
                            {
                                label: 'New Password',
                                val: newPass,
                                set: setNewPass,
                                show: showNew,
                                toggle: () => setShowNew((v) => !v),
                                placeholder: 'Min. 8 characters',
                            },
                            {
                                label: 'Confirm New Password',
                                val: confirm,
                                set: setConfirm,
                                show: showConfirm,
                                toggle: () => setShowConfirm((v) => !v),
                                placeholder: 'Re-enter new password',
                            },
                        ].map(({ label, val, set, show, toggle, placeholder }) => (
                            <div key={label}>
                                <label className="mb-1.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                    {label}
                                </label>
                                <div className="relative">
                                    <input
                                        type={show ? 'text' : 'password'}
                                        value={val}
                                        onChange={(e) => set(e.target.value)}
                                        placeholder={placeholder ?? 'Enter password'}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggle}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
                                    >
                                        {show ? <HiEyeSlash className="size-4" /> : <HiEye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-4 rounded-xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-100">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                            <HiLockClosed className="size-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-700">Password</p>
                            <p className="mt-0.5 text-sm tracking-[0.2em] text-slate-400">••••••••••••</p>
                        </div>
                        <span className="rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-600">
                            Secure
                        </span>
                    </div>
                )}
            </div>
        </SectionCard>
    );
}

// ── Account Info Card (sidebar) ───────────────────────────────────────────────

function AccountInfoCard({ memberSince, userType }: { memberSince: string; userType: UserType }) {
    const { session } = useAppContext();

    const rows = [
        { icon: HiIdentification, label: 'User ID', value: `#${session?.userId?.slice(0, 8) ?? '—'}` },
        { icon: HiShieldCheck, label: 'Role', value: USER_TYPE_OPTIONS.find(o => o.value === userType)?.label ?? 'Student', highlight: true },
        { icon: MdCalendarMonth, label: 'Member Since', value: memberSince },
    ];

    return (
        <SectionCard>
            <CardHead title="Account Information" />
            <div className="space-y-2 p-5">
                {rows.map(({ icon: Icon, label, value, highlight }) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                        <Icon className={`size-4 shrink-0 ${highlight ? 'text-blue-500' : 'text-slate-400'}`} />
                        <div>
                            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">{label}</p>
                            <p
                                className={`mt-0.5 text-sm font-bold capitalize ${highlight ? 'text-blue-700' : 'text-slate-700'}`}
                            >
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

// ── Danger Zone Card (sidebar) ────────────────────────────────────────────────

function DangerZoneCard() {
    const [confirmDelete, setConfirmDelete] = useState(false);

    return (
        <SectionCard>
            <div className="border-b border-red-50 px-6 py-4">
                <h3 className="text-sm font-extrabold text-red-600">Danger Zone</h3>
                <p className="mt-0.5 text-xs text-red-400/80">Irreversible account actions</p>
            </div>
            <div className="space-y-3 p-5">
                <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-all select-none hover:border-slate-300 hover:bg-slate-50"
                >
                    <HiArrowRightOnRectangle className="size-4 shrink-0 text-slate-400" />
                    Sign out from all devices
                </button>

                {!confirmDelete ? (
                    <button
                        type="button"
                        onClick={() => setConfirmDelete(true)}
                        className="flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-all select-none hover:border-red-200 hover:bg-red-100"
                    >
                        <HiTrash className="size-4 shrink-0" />
                        Delete my account
                    </button>
                ) : (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="mb-1 text-xs font-bold text-red-700">Are you absolutely sure?</p>
                        <p className="mb-3 text-xs leading-relaxed text-red-500/80">
                            This action cannot be undone. All your data will be permanently erased.
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setConfirmDelete(false)}
                                className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="flex-1 rounded-lg bg-red-600 py-2 text-xs font-bold text-white transition-all select-none hover:bg-red-700"
                            >
                                Delete forever
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </SectionCard>
    );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ProfilePageContent() {
    const { session } = useAppContext();
    const [profile, setProfile] = useState<ProfileData | null>(null);

    const refreshProfile = useCallback(() => {
        fetch('/api/auth/profile')
            .then((r) => r.json())
            .then((json) => {
                if (json.data) setProfile(json.data);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (session) refreshProfile();
    }, [session, refreshProfile]);

    const completion = computeCompletion(profile, session?.avatar ?? 'avatar_01.png');
    const memberSince = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
        : '—';

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                    <HiArrowLeft className="size-4" />
                    Dashboard
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-sm font-semibold text-slate-700">My Profile</span>
            </div>

            {/* Hero */}
            <ProfileHero profile={profile} completion={completion} onAvatarSaved={refreshProfile} />

            {/* Cards grid */}
            <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-3 flex flex-col gap-6 lg:col-span-2">
                    <PersonalInfoCard profile={profile} onSaved={refreshProfile} />
                    <ContactCard profile={profile} onSaved={refreshProfile} />
                    <SecurityCard />
                </div>
                <div className="col-span-3 flex flex-col gap-6 lg:col-span-1">
                    <AccountInfoCard memberSince={memberSince} userType={profile?.userType ?? 'student'} />
                    <DangerZoneCard />
                </div>
            </div>
        </div>
    );
}
