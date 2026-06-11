'use client';

import { useEffect, useRef, useState } from 'react';
import {
    HiShieldCheck,
    HiUser,
    HiCog6Tooth,
    HiShare,
    HiLockClosed,
    HiFingerPrint,
    HiCpuChip,
    HiInformationCircle,
    HiEnvelope,
    HiDocumentText,
    HiSparkles,
    HiExclamationTriangle,
    HiCheckCircle,
} from 'react-icons/hi2';
import { FaChildReaching } from 'react-icons/fa6';

const SECTIONS = [
    { id: 'overview', label: 'Overview', icon: HiInformationCircle },
    { id: 'information-collected', label: 'Information We Collect', icon: HiUser },
    { id: 'how-we-use', label: 'How We Use It', icon: HiCog6Tooth },
    { id: 'sharing', label: 'Sharing & Disclosure', icon: HiShare },
    { id: 'cookies', label: 'Cookies & Tracking', icon: HiCpuChip },
    { id: 'security', label: 'Data Security', icon: HiLockClosed },
    { id: 'your-rights', label: 'Your Rights', icon: HiFingerPrint },
    { id: 'third-party', label: 'Third-Party Services', icon: HiShieldCheck },
    { id: 'children', label: "Children's Privacy", icon: FaChildReaching },
    { id: 'changes', label: 'Policy Changes', icon: HiDocumentText },
    { id: 'contact', label: 'Contact Us', icon: HiEnvelope },
];

function useActiveSection() {
    const [active, setActive] = useState('overview');
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);
    return active;
}

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Section({
    id,
    icon: Icon,
    title,
    children,
}: {
    id: string;
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 pt-2">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-bg">
                    <Icon className="size-5 text-primary-base" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
        </section>
    );
}

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2.5">
            <HiCheckCircle className="mt-0.5 size-4 shrink-0 text-primary-base" />
            <span>{children}</span>
        </li>
    );
}

function Note({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <HiExclamationTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p className="text-sm text-amber-800">{children}</p>
        </div>
    );
}

export default function PrivacyContent() {
    const active = useActiveSection();
    const heroRef = useRef<HTMLDivElement>(null);
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroVisible(true); obs.disconnect(); } }, { threshold: 0 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-base to-primary-light py-20 max-sm:py-14">
                <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/5" />
                <div className="absolute -bottom-28 -left-16 size-72 rounded-full bg-white/5" />
                <div
                    ref={heroRef}
                    className={`relative mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
                        <HiSparkles className="size-4" />
                        Legal
                    </span>
                    <h1 className="mt-5 text-5xl font-bold text-white max-lg:text-4xl max-sm:text-3xl">
                        Privacy Policy
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-blue-100">
                        We are committed to protecting your personal information and being transparent about how we use it.
                    </p>
                    <p className="mt-4 text-sm text-blue-200">Effective Date: June 11, 2026 &nbsp;·&nbsp; Jurisdiction: Delhi, India</p>
                </div>
            </section>

            {/* Body */}
            <div className="mx-auto flex max-w-6xl gap-10 px-6 py-14 max-lg:flex-col max-sm:px-4">

                {/* Sticky TOC */}
                <aside className="w-60 shrink-0 max-lg:w-full">
                    <div className="sticky top-24 max-lg:static">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Contents</p>
                        <nav className="flex flex-col gap-1 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                            {SECTIONS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => scrollTo(id)}
                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${active === id ? 'bg-primary-bg text-primary-base' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                                >
                                    <Icon className="size-4 shrink-0" />
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Sections */}
                <div className="min-w-0 flex-1 space-y-12">

                    <Section id="overview" icon={HiInformationCircle} title="Overview">
                        <p>
                            MyCareerPathshala (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{' '}
                            <span className="font-medium text-primary-base">www.mycareerpathshala.com</span> and related services including MeritPathshala. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                        </p>
                        <p>
                            By accessing or using our services, you consent to the data practices described in this policy. If you do not agree, please discontinue use of our platform.
                        </p>
                        <Note>
                            This policy applies to all users of MyCareerPathshala including students, professionals, and visitors to our website.
                        </Note>
                    </Section>

                    <Section id="information-collected" icon={HiUser} title="Information We Collect">
                        <p>We collect information you provide directly as well as data generated through your use of the platform.</p>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                            <p className="mb-3 font-semibold text-slate-800">Account & Profile Information</p>
                            <ul className="space-y-2">
                                <Bullet>Full name, email address, and phone number (at registration)</Bullet>
                                <Bullet>Date of birth and nationality</Bullet>
                                <Bullet>Academic background — qualifications, scores, and preferred study destinations</Bullet>
                                <Bullet>Profile preferences such as target countries and course interests</Bullet>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                            <p className="mb-3 font-semibold text-slate-800">Application & Counselling Data</p>
                            <ul className="space-y-2">
                                <Bullet>University or medical college applications you submit through our platform</Bullet>
                                <Bullet>Counselling session requests, preferred dates, and communication history</Bullet>
                                <Bullet>Documents you upload in support of your applications</Bullet>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                            <p className="mb-3 font-semibold text-slate-800">Automatically Collected Data</p>
                            <ul className="space-y-2">
                                <Bullet>IP address, browser type, device type, and operating system</Bullet>
                                <Bullet>Pages visited, time spent, and navigation patterns on our website</Bullet>
                                <Bullet>Referral source (how you arrived at our platform)</Bullet>
                            </ul>
                        </div>
                    </Section>

                    <Section id="how-we-use" icon={HiCog6Tooth} title="How We Use Your Information">
                        <p>We use the information we collect for the following purposes:</p>
                        <ul className="space-y-2">
                            <Bullet>Creating and managing your account and verifying your identity via OTP</Bullet>
                            <Bullet>Processing university and medical college applications on your behalf</Bullet>
                            <Bullet>Scheduling and conducting career counselling sessions</Bullet>
                            <Bullet>Sending transactional emails — registration confirmation, OTP, application status updates</Bullet>
                            <Bullet>Providing personalised university, course, and MBBS abroad recommendations</Bullet>
                            <Bullet>Responding to your enquiries and support requests</Bullet>
                            <Bullet>Improving our platform, features, and content quality</Bullet>
                            <Bullet>Complying with legal obligations under Indian law (IT Act 2000 and DPDP Act 2023)</Bullet>
                        </ul>
                        <Note>
                            We do not use your data for automated decision-making that has legal or similarly significant effects without your explicit consent.
                        </Note>
                    </Section>

                    <Section id="sharing" icon={HiShare} title="Sharing & Disclosure">
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following limited circumstances:
                        </p>
                        <ul className="space-y-2">
                            <Bullet>
                                <span className="font-medium text-slate-800">Educational Institutions:</span> When you apply to a university or medical college through our platform, we share the information necessary to process your application.
                            </Bullet>
                            <Bullet>
                                <span className="font-medium text-slate-800">Service Providers:</span> Trusted third-party vendors (e.g., email delivery, hosting) who process data on our behalf under strict confidentiality agreements.
                            </Bullet>
                            <Bullet>
                                <span className="font-medium text-slate-800">Legal Requirements:</span> Where required by law, court order, or government authority in accordance with Indian law.
                            </Bullet>
                            <Bullet>
                                <span className="font-medium text-slate-800">Business Transfers:</span> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.
                            </Bullet>
                        </ul>
                    </Section>

                    <Section id="cookies" icon={HiCpuChip} title="Cookies & Tracking">
                        <p>
                            Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyse usage patterns.
                        </p>
                        <div className="overflow-hidden rounded-xl border border-slate-100">
                            <table className="w-full text-sm">
                                <thead className="bg-primary-base text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold">Type</th>
                                        <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ['Essential', 'Authentication tokens, session management — required for the platform to function.'],
                                        ['Functional', 'Remembering your preferences, language, and display settings.'],
                                        ['Analytical', 'Understanding how visitors use our site to improve features and content.'],
                                    ].map(([type, purpose], i) => (
                                        <tr key={type} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                            <td className="px-4 py-3 font-medium text-slate-800">{type}</td>
                                            <td className="px-4 py-3 text-slate-600">{purpose}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>You can control cookie preferences through your browser settings. Disabling essential cookies may affect platform functionality.</p>
                    </Section>

                    <Section id="security" icon={HiLockClosed} title="Data Security">
                        <p>
                            We implement industry-standard security measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction.
                        </p>
                        <ul className="space-y-2">
                            <Bullet>Passwords are hashed using bcrypt — we never store plain-text passwords</Bullet>
                            <Bullet>All data is transmitted over HTTPS with TLS encryption</Bullet>
                            <Bullet>Authentication uses short-lived JWT tokens with secure signing</Bullet>
                            <Bullet>Database access is restricted to authorised internal systems only</Bullet>
                            <Bullet>Email verification via OTP is required before account activation</Bullet>
                        </ul>
                        <Note>
                            While we take every precaution, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password and keep your credentials confidential.
                        </Note>
                    </Section>

                    <Section id="your-rights" icon={HiFingerPrint} title="Your Rights">
                        <p>
                            Under the Digital Personal Data Protection Act (DPDP) 2023 and applicable Indian regulations, you have the following rights regarding your personal data:
                        </p>
                        <ul className="space-y-2">
                            <Bullet><span className="font-medium text-slate-800">Access:</span> Request a copy of the personal data we hold about you.</Bullet>
                            <Bullet><span className="font-medium text-slate-800">Correction:</span> Request correction of inaccurate or incomplete data.</Bullet>
                            <Bullet><span className="font-medium text-slate-800">Erasure:</span> Request deletion of your account and associated personal data.</Bullet>
                            <Bullet><span className="font-medium text-slate-800">Portability:</span> Receive your data in a structured, machine-readable format.</Bullet>
                            <Bullet><span className="font-medium text-slate-800">Withdraw Consent:</span> Opt out of non-essential communications at any time.</Bullet>
                            <Bullet><span className="font-medium text-slate-800">Grievance:</span> Lodge a complaint with our Data Protection Officer.</Bullet>
                        </ul>
                        <p>To exercise any of these rights, contact us at <span className="font-medium text-primary-base">info@mycareerpathshala.com</span>. We will respond within 30 days.</p>
                    </Section>

                    <Section id="third-party" icon={HiShieldCheck} title="Third-Party Services">
                        <p>We use the following third-party services that may process your data as part of delivering our platform:</p>
                        <div className="space-y-3">
                            {[
                                {
                                    name: 'Resend',
                                    desc: 'Email delivery provider used to send transactional emails such as OTPs, registration confirmations, and application updates.',
                                    link: 'resend.com/privacy',
                                },
                                {
                                    name: 'Strapi CMS',
                                    desc: 'Our content management system used to serve publicly available content — university listings, blog posts, and course information. No personal data is stored in the CMS.',
                                    link: null,
                                },
                                {
                                    name: 'Hosting Provider (VPS)',
                                    desc: 'Our application and database are hosted on a private VPS server. All data at rest is stored in India.',
                                    link: null,
                                },
                            ].map((s) => (
                                <div key={s.name} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <p className="font-semibold text-slate-800">{s.name}</p>
                                    <p className="mt-1 text-slate-600">{s.desc}</p>
                                    {s.link && <p className="mt-1 text-xs text-primary-base">Privacy Policy: {s.link}</p>}
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section id="children" icon={FaChildReaching} title="Children's Privacy">
                        <p>
                            Our services are intended for users who are 13 years of age or older. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
                        </p>
                        <p>
                            If you are a parent or guardian and believe your child has provided personal information without your consent, please contact us immediately at{' '}
                            <span className="font-medium text-primary-base">info@mycareerpathshala.com</span> and we will promptly delete the information.
                        </p>
                    </Section>

                    <Section id="changes" icon={HiDocumentText} title="Policy Changes">
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable law. When we make material changes, we will:
                        </p>
                        <ul className="space-y-2">
                            <Bullet>Update the &quot;Effective Date&quot; at the top of this page</Bullet>
                            <Bullet>Notify registered users via email where the changes are significant</Bullet>
                            <Bullet>Display a notice on our platform for a reasonable period</Bullet>
                        </ul>
                        <p>Your continued use of our services after changes are posted constitutes acceptance of the updated policy.</p>
                    </Section>

                    <Section id="contact" icon={HiEnvelope} title="Contact Us">
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out:</p>
                        <div className="rounded-xl border border-primary-bg bg-primary-gray p-6">
                            <p className="text-base font-bold text-slate-900">MyCareerPathshala</p>
                            <div className="mt-3 space-y-2">
                                <p><span className="font-medium text-slate-700">Email:</span>{' '}
                                    <a href="mailto:info@mycareerpathshala.com" className="text-primary-base hover:underline">info@mycareerpathshala.com</a>
                                </p>
                                <p><span className="font-medium text-slate-700">Phone:</span> +91-9861905-906</p>
                                <p><span className="font-medium text-slate-700">Jurisdiction:</span> Delhi, India</p>
                                <p><span className="font-medium text-slate-700">Governing Law:</span> Information Technology Act, 2000 &amp; DPDP Act, 2023</p>
                            </div>
                        </div>
                    </Section>

                </div>
            </div>
        </main>
    );
}
