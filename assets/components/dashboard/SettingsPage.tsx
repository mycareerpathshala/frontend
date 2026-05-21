'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
    HiArrowLeft,
    HiBell,
    HiCheckCircle,
    HiCog6Tooth,
    HiDocumentText,
    HiEnvelope,
    HiGlobeAlt,
    HiMegaphone,
    HiShieldCheck,
    HiSparkles,
    HiStar,
    HiTag,
    HiUserCircle,
    HiDevicePhoneMobile,
} from 'react-icons/hi2';

// ── Types ─────────────────────────────────────────────────────────────────────

interface UserSettings {
    inAppApplications:       boolean;
    inAppCounselling:        boolean;
    newCourseAlerts:         boolean;
    universityUpdates:       boolean;
    emailAdmissionDeadlines: boolean;
    emailScholarshipAlerts:  boolean;
    emailPromotional:        boolean;
    emailNewsletter:         boolean;
    emailSpecialOffers:      boolean;
    emailWeeklyDigest:       boolean;
    publicProfile:           boolean;
    showOnlineStatus:        boolean;
    shareActivityData:       boolean;
    twoFactorEnabled:        boolean;
}

const DEFAULTS: UserSettings = {
    inAppApplications:       true,
    inAppCounselling:        true,
    newCourseAlerts:         false,
    universityUpdates:       false,
    emailAdmissionDeadlines: true,
    emailScholarshipAlerts:  true,
    emailPromotional:        true,
    emailNewsletter:         true,
    emailSpecialOffers:      false,
    emailWeeklyDigest:       false,
    publicProfile:           false,
    showOnlineStatus:        true,
    shareActivityData:       false,
    twoFactorEnabled:        false,
};

// ── Shared primitives ─────────────────────────────────────────────────────────

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 ${className}`}>
            {children}
        </div>
    );
}

function CardHead({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: React.ElementType }) {
    return (
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
            {Icon && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="size-4 text-blue-500" />
                </div>
            )}
            <div>
                <h3 className="text-sm font-extrabold text-slate-800">{title}</h3>
                {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
            </div>
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none ${
                checked ? 'bg-blue-600' : 'bg-slate-200'
            }`}
        >
            <span
                className={`pointer-events-none inline-block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
                    checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
            />
        </button>
    );
}

function ToggleRow({
    icon: Icon,
    iconColor = 'text-slate-400',
    iconBg = 'bg-slate-100',
    label,
    description,
    checked,
    onChange,
    badge,
}: {
    icon: React.ElementType;
    iconColor?: string;
    iconBg?: string;
    label: string;
    description?: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    badge?: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-slate-50 py-4 last:border-0">
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                    <Icon className={`size-4 ${iconColor}`} />
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-700">{label}</p>
                        {badge && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 ring-1 ring-blue-100">
                                {badge}
                            </span>
                        )}
                    </div>
                    {description && <p className="mt-0.5 text-xs text-slate-400">{description}</p>}
                </div>
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

// ── Notification Preferences Card ─────────────────────────────────────────────

function NotificationPreferencesCard({
    settings,
    onUpdate,
}: {
    settings: UserSettings;
    onUpdate: (patch: Partial<UserSettings>) => void;
}) {
    return (
        <SectionCard>
            <CardHead
                icon={HiBell}
                title="Notification Preferences"
                subtitle="Control which in-app notifications you receive"
            />
            <div className="px-6">
                <p className="pt-4 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Alert types</p>
                <ToggleRow
                    icon={HiDocumentText}
                    iconBg="bg-green-50"
                    iconColor="text-green-500"
                    label="Application Status Updates"
                    description="Get notified when your application status changes"
                    checked={settings.inAppApplications}
                    onChange={v => onUpdate({ inAppApplications: v })}
                />
                <ToggleRow
                    icon={HiUserCircle}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-500"
                    label="Counselling Reminders"
                    description="Upcoming session alerts and follow-ups"
                    checked={settings.inAppCounselling}
                    onChange={v => onUpdate({ inAppCounselling: v })}
                />
                <ToggleRow
                    icon={HiSparkles}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-500"
                    label="New Course Alerts"
                    description="Notify when courses matching your interests are added"
                    checked={settings.newCourseAlerts}
                    onChange={v => onUpdate({ newCourseAlerts: v })}
                />
                <ToggleRow
                    icon={HiGlobeAlt}
                    iconBg="bg-sky-50"
                    iconColor="text-sky-500"
                    label="University Listing Updates"
                    description="Alerts for new universities or seat availability changes"
                    checked={settings.universityUpdates}
                    onChange={v => onUpdate({ universityUpdates: v })}
                />
                <div className="pb-2" />
            </div>
        </SectionCard>
    );
}

// ── Email & Marketing Card ────────────────────────────────────────────────────

function EmailMarketingCard({
    settings,
    onUpdate,
}: {
    settings: UserSettings;
    onUpdate: (patch: Partial<UserSettings>) => void;
}) {
    return (
        <SectionCard>
            <CardHead
                icon={HiEnvelope}
                title="Email & Marketing"
                subtitle="Manage email communications sent to your inbox"
            />
            <div className="px-6">
                <p className="pt-4 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Transactional</p>
                <ToggleRow
                    icon={HiDocumentText}
                    iconBg="bg-green-50"
                    iconColor="text-green-500"
                    label="Admission Deadline Reminders"
                    description="Timely reminders about application cut-off dates"
                    checked={settings.emailAdmissionDeadlines}
                    onChange={v => onUpdate({ emailAdmissionDeadlines: v })}
                />
                <ToggleRow
                    icon={HiStar}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-500"
                    label="Scholarship & Aid Alerts"
                    description="Opportunities you may qualify for based on your profile"
                    checked={settings.emailScholarshipAlerts}
                    onChange={v => onUpdate({ emailScholarshipAlerts: v })}
                />

                <p className="pt-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Marketing</p>
                <ToggleRow
                    icon={HiMegaphone}
                    iconBg="bg-rose-50"
                    iconColor="text-rose-500"
                    label="Promotional Emails"
                    description="Offers, campaigns and announcements from us"
                    checked={settings.emailPromotional}
                    onChange={v => onUpdate({ emailPromotional: v })}
                />
                <ToggleRow
                    icon={HiEnvelope}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-500"
                    label="Newsletter"
                    description="Monthly curated content about studying abroad"
                    checked={settings.emailNewsletter}
                    onChange={v => onUpdate({ emailNewsletter: v })}
                />
                <ToggleRow
                    icon={HiTag}
                    iconBg="bg-orange-50"
                    iconColor="text-orange-500"
                    label="Special Offers & Deals"
                    description="Exclusive discounts and limited-time promotions"
                    checked={settings.emailSpecialOffers}
                    onChange={v => onUpdate({ emailSpecialOffers: v })}
                />
                <ToggleRow
                    icon={HiSparkles}
                    iconBg="bg-indigo-50"
                    iconColor="text-indigo-500"
                    label="Weekly Digest"
                    description="A roundup of top universities, courses, and updates"
                    checked={settings.emailWeeklyDigest}
                    onChange={v => onUpdate({ emailWeeklyDigest: v })}
                />
                <div className="pb-2" />
            </div>
        </SectionCard>
    );
}

// ── Privacy & Visibility Card ─────────────────────────────────────────────────

function PrivacyCard({
    settings,
    onUpdate,
}: {
    settings: UserSettings;
    onUpdate: (patch: Partial<UserSettings>) => void;
}) {
    return (
        <SectionCard>
            <CardHead icon={HiShieldCheck} title="Privacy & Visibility" subtitle="Control who can see your activity" />
            <div className="px-6">
                <ToggleRow
                    icon={HiGlobeAlt}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-500"
                    label="Public Profile"
                    description="Allow others to view your basic profile information"
                    checked={settings.publicProfile}
                    onChange={v => onUpdate({ publicProfile: v })}
                />
                <ToggleRow
                    icon={HiUserCircle}
                    iconBg="bg-green-50"
                    iconColor="text-green-500"
                    label="Show Online Status"
                    description="Let counsellors see when you are active on the platform"
                    checked={settings.showOnlineStatus}
                    onChange={v => onUpdate({ showOnlineStatus: v })}
                />
                <ToggleRow
                    icon={HiSparkles}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-500"
                    label="Share Activity Data"
                    description="Help us improve recommendations using anonymised usage data"
                    checked={settings.shareActivityData}
                    onChange={v => onUpdate({ shareActivityData: v })}
                />
                <div className="pb-2" />
            </div>
        </SectionCard>
    );
}

// ── Security Card ─────────────────────────────────────────────────────────────

function SecurityCard({
    settings,
    onUpdate,
}: {
    settings: UserSettings;
    onUpdate: (patch: Partial<UserSettings>) => void;
}) {
    return (
        <SectionCard>
            <CardHead icon={HiShieldCheck} title="Security" subtitle="Manage how you verify your identity" />
            <div className="px-6">
                <ToggleRow
                    icon={HiDevicePhoneMobile}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-500"
                    label="Two-Factor Authentication"
                    description="Require a 6-digit email code each time you sign in"
                    badge="Recommended"
                    checked={settings.twoFactorEnabled}
                    onChange={v => onUpdate({ twoFactorEnabled: v })}
                />
                <div className="pb-2" />
            </div>
        </SectionCard>
    );
}

// ── Summary sidebar card ──────────────────────────────────────────────────────

function SettingsSummaryCard({
    settings,
    saving,
}: {
    settings: UserSettings;
    saving: boolean;
}) {
    const inAppOn   = [settings.inAppApplications, settings.inAppCounselling].filter(Boolean).length;
    const emailOn   = [
        settings.emailAdmissionDeadlines, settings.emailScholarshipAlerts,
        settings.emailPromotional, settings.emailNewsletter,
        settings.emailSpecialOffers, settings.emailWeeklyDigest,
    ].filter(Boolean).length;

    const items = [
        { label: 'In-app notifications on', value: `${inAppOn} / 4`,                             icon: HiBell,        color: 'text-blue-500'  },
        { label: 'Email subscriptions on',   value: `${emailOn} / 6`,                            icon: HiEnvelope,    color: 'text-indigo-500'},
        { label: '2-Factor Authentication',  value: settings.twoFactorEnabled ? 'On' : 'Off',    icon: HiShieldCheck, color: settings.twoFactorEnabled ? 'text-green-500' : 'text-slate-400' },
    ];

    return (
        <SectionCard>
            <CardHead icon={HiCog6Tooth} title="Settings Overview" subtitle="Your current preferences at a glance" />
            <div className="space-y-2 p-5">
                {items.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                        <Icon className={`size-4 shrink-0 ${color}`} />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">{label}</p>
                            <p className="mt-0.5 text-sm font-bold text-slate-700">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-100 px-5 pb-5">
                <div className={`mt-4 rounded-xl px-4 py-3.5 ring-1 transition-colors ${saving ? 'bg-amber-50 ring-amber-100' : 'bg-green-50 ring-green-100'}`}>
                    <div className="flex items-center gap-2.5">
                        <HiCheckCircle className={`size-4 shrink-0 ${saving ? 'text-amber-400' : 'text-green-500'}`} />
                        <p className={`text-xs font-bold ${saving ? 'text-amber-700' : 'text-green-700'}`}>
                            {saving ? 'Saving changes…' : 'All changes saved'}
                        </p>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function SettingsPageContent() {
    const [settings, setSettings] = useState<UserSettings>(DEFAULTS);
    const [saving,   setSaving]   = useState(false);
    const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => {
        fetch('/api/notifications/preferences')
            .then(r => r.json())
            .then(({ settings: s }) => { if (s) setSettings(s); })
            .catch(() => {});
    }, []);

    function handleUpdate(patch: Partial<UserSettings>) {
        setSettings(prev => ({ ...prev, ...patch }));
        setSaving(true);
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(async () => {
            await fetch('/api/notifications/preferences', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patch),
            }).catch(() => {});
            setSaving(false);
        }, 600);
    }

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
                <span className="text-sm font-semibold text-slate-700">Settings</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left — main settings */}
                <div className="col-span-3 flex flex-col gap-6 lg:col-span-2">
                    <NotificationPreferencesCard settings={settings} onUpdate={handleUpdate} />
                    <EmailMarketingCard           settings={settings} onUpdate={handleUpdate} />
                </div>

                {/* Right — sidebar */}
                <div className="col-span-3 flex flex-col gap-6 lg:col-span-1">
                    <SettingsSummaryCard settings={settings} saving={saving} />
                    <SecurityCard       settings={settings} onUpdate={handleUpdate} />
                    <PrivacyCard        settings={settings} onUpdate={handleUpdate} />
                </div>
            </div>
        </div>
    );
}
