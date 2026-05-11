import type { Metadata } from 'next';
import Link from 'next/link';
import {
    HiEnvelope,
    HiPhone,
    HiClock,
    HiCheckCircle,
    HiArrowTopRightOnSquare,
    HiChatBubbleLeftRight,
    HiSparkles,
    HiQuestionMarkCircle,
} from 'react-icons/hi2';
import { FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { MdQrCode2, MdSupportAgent } from 'react-icons/md';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: "Get in touch with My Career Pathshala — we're here to guide your career journey.",
};

const socialChannels = [
    {
        icon: FaFacebook,
        label: 'Facebook',
        handle: '@mycareerpathshala',
        desc: 'Follow for updates, tips, and career news from our community.',
        cta: 'Follow on Facebook',
        href: 'https://facebook.com',
        iconBg: 'bg-[#1877F2]',
        cardBorder: 'hover:border-blue-200 hover:shadow-blue-100/60',
        textAccent: 'text-blue-600',
        ctaBg: 'bg-[#1877F2]',
        badgeBg: 'bg-blue-50 text-blue-600',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        handle: '@mycareerpathshala',
        desc: 'Student stories, campus life photos, and career inspiration reels.',
        cta: 'Follow on Instagram',
        href: 'https://instagram.com',
        iconBg: 'bg-linear-to-br from-purple-500 via-pink-500 to-orange-400',
        cardBorder: 'hover:border-pink-200 hover:shadow-pink-100/60',
        textAccent: 'text-pink-600',
        ctaBg: 'bg-linear-to-r from-purple-500 via-pink-500 to-orange-400',
        badgeBg: 'bg-pink-50 text-pink-600',
    },
    {
        icon: FaYoutube,
        label: 'YouTube',
        handle: 'My Career Pathshala',
        desc: 'Watch counselling sessions, university tours, and student guides.',
        cta: 'Subscribe',
        href: 'https://youtube.com',
        iconBg: 'bg-[#FF0000]',
        cardBorder: 'hover:border-red-200 hover:shadow-red-100/60',
        textAccent: 'text-red-600',
        ctaBg: 'bg-[#FF0000]',
        badgeBg: 'bg-red-50 text-red-600',
    },
    {
        icon: FaLinkedinIn,
        label: 'LinkedIn',
        handle: 'My Career Pathshala',
        desc: 'Connect with our counsellors and a growing alumni network.',
        cta: 'Connect on LinkedIn',
        href: 'https://linkedin.com',
        iconBg: 'bg-[#0A66C2]',
        cardBorder: 'hover:border-sky-200 hover:shadow-sky-100/60',
        textAccent: 'text-sky-600',
        ctaBg: 'bg-[#0A66C2]',
        badgeBg: 'bg-sky-50 text-sky-600',
    },
];

const heroPills = [
    { icon: HiEnvelope, label: 'Email' },
    { icon: FaWhatsapp, label: 'WhatsApp' },
    { icon: HiPhone, label: 'Call' },
    { icon: FaFacebook, label: 'Facebook' },
    { icon: FaInstagram, label: 'Instagram' },
    { icon: FaYoutube, label: 'YouTube' },
];

export default function ContactPage() {
    return (
        <>
            {/* ── HERO ── */}
            <section className="from-primary-dark via-primary-base to-primary-light relative overflow-hidden bg-linear-to-br py-20 md:py-28">
                {/* decorative blobs */}
                <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/8 blur-3xl" />
                <div className="absolute -bottom-28 -left-20 size-80 rounded-full bg-white/6 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 size-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/4 blur-3xl" />

                <div className="relative mx-auto max-w-4xl px-4 text-center">
                    {/* badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 ring-1 ring-white/25 backdrop-blur-sm">
                        <HiChatBubbleLeftRight className="size-4 text-white" />
                        <span className="text-sm font-semibold text-white">We&apos;re here for you</span>
                    </div>

                    {/* heading */}
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                        Get in{' '}
                        <span className="relative inline-block">
                            Touch
                            <HiSparkles className="absolute -top-4 -right-7 size-6 text-yellow-300 opacity-90" />
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100 md:text-lg">
                        Whether you have questions about admissions, need personalised counselling, or just want to say
                        hello — our team is ready to guide your career journey.
                    </p>

                    {/* channel pills */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                        {heroPills.map(({ icon: Icon, label }) => (
                            <span
                                key={label}
                                className="flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm"
                            >
                                <Icon className="size-3.5" />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <main className="mx-auto mt-8 max-w-7xl px-4 pb-20">
                {/* Intro */}
                <div className="mb-8 max-w-2xl">
                    <h2 className="text-2xl font-extrabold text-slate-800">How can we help you?</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        Pick the channel that&apos;s most convenient for you. Our counselling team is available across
                        multiple platforms — choose your preferred way to connect and we&apos;ll get back to you
                        promptly.
                    </p>
                </div>

                {/* ── PRIMARY CONTACT CARDS ── */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* Email */}
                    <div className="group flex flex-col rounded-3xl border border-blue-100 bg-blue-50 p-6 transition-all duration-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-300/50">
                                <HiEnvelope className="size-7 text-white" />
                            </div>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                Within 24h
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Email Us</h3>
                        <p className="mt-0.5 text-sm font-semibold text-blue-600">info@mycareerpathshala.com</p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                            Send us your queries, application documents, or any questions. We respond within 24 hours on
                            working days.
                        </p>
                        <Link
                            href="mailto:info@mycareerpathshala.com"
                            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300/50 active:scale-95"
                        >
                            <HiEnvelope className="size-4" />
                            Send an Email
                        </Link>
                    </div>

                    {/* WhatsApp */}
                    <div className="group flex flex-col rounded-3xl border border-green-100 bg-green-50 p-6 transition-all duration-200 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/60">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg shadow-green-300/50">
                                <FaWhatsapp className="size-7 text-white" />
                            </div>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Fast reply
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">WhatsApp</h3>
                        <p className="mt-0.5 text-sm font-semibold text-green-600">+91 98765 43210</p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                            Chat with our counselling team instantly. Share documents, ask questions, and get
                            personalised advice on the go.
                        </p>
                        <Link
                            href="https://wa.me/919876543210"
                            target="_blank"
                            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#1ebe5a] hover:shadow-lg hover:shadow-green-300/50 active:scale-95"
                        >
                            <FaWhatsapp className="size-4" />
                            Chat on WhatsApp
                        </Link>
                    </div>

                    {/* Phone */}
                    <div className="group flex flex-col rounded-3xl border border-teal-100 bg-teal-50 p-6 transition-all duration-200 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/60">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-600 shadow-lg shadow-teal-300/50">
                                <HiPhone className="size-7 text-white" />
                            </div>
                            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                                Mon–Sat
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">Call Us</h3>
                        <p className="mt-0.5 text-sm font-semibold text-teal-600">+91 98765 43210</p>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                            Speak directly with a career counsellor. Available Monday to Saturday, 10 AM – 7 PM IST.
                        </p>
                        <Link
                            href="tel:+919876543210"
                            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-300/50 active:scale-95"
                        >
                            <HiPhone className="size-4" />
                            Call Now
                        </Link>
                    </div>
                </div>

                {/* ── WHATSAPP FEATURED CARD (QR) ── */}
                <div className="mt-6 overflow-hidden rounded-3xl bg-linear-to-br from-[#075E54] to-[#128C7E] p-8 shadow-2xl shadow-green-900/25 md:p-10">
                    <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
                        {/* left: text */}
                        <div className="max-w-lg">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                                <FaWhatsapp className="size-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-white md:text-3xl">Message us on WhatsApp</h3>
                            <p className="mt-3 text-sm leading-relaxed text-green-100">
                                The fastest way to get personalised guidance. Share your requirements, documents, or
                                questions — our team responds promptly. Scan the QR code with your phone camera or tap
                                the button below.
                            </p>
                            <ul className="mt-5 space-y-2.5">
                                {[
                                    'Personalised counselling sessions',
                                    'Document verification guidance',
                                    'University & course recommendations',
                                    'Application tracking & follow-up',
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-green-100">
                                        <HiCheckCircle className="size-4.5 shrink-0 text-green-300" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="https://wa.me/919876543210"
                                target="_blank"
                                className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#075E54] shadow-xl shadow-black/20 transition-all duration-150 hover:bg-green-50 hover:shadow-2xl active:scale-95"
                            >
                                <FaWhatsapp className="size-5" />
                                Open WhatsApp Chat
                                <HiArrowTopRightOnSquare className="size-4 opacity-60" />
                            </Link>
                        </div>

                        {/* right: QR placeholder */}
                        <div className="flex shrink-0 flex-col items-center gap-4">
                            <div className="flex size-52 items-center justify-center rounded-3xl bg-white p-5 shadow-2xl ring-4 ring-white/30">
                                <MdQrCode2 className="size-full text-[#075E54] opacity-60" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-xs font-semibold text-white/80">Scan with your phone camera</p>
                                <p className="text-[11px] text-green-300">Opens WhatsApp directly</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SOCIAL MEDIA ── */}
                <div className="mt-14">
                    <div className="mb-6">
                        <h2 className="text-2xl font-extrabold text-slate-800">Follow us on Social Media</h2>
                        <p className="mt-1.5 text-sm text-slate-500">
                            Stay updated with the latest news, student success stories, and career insights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {socialChannels.map(
                            ({ icon: Icon, label, handle, desc, cta, href, iconBg, cardBorder, textAccent, ctaBg }) => (
                                <div
                                    key={label}
                                    className={`flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-lg ${cardBorder}`}
                                >
                                    <div
                                        className={`mb-4 flex size-12 items-center justify-center rounded-xl ${iconBg} shadow-md`}
                                    >
                                        <Icon className="size-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-800">{label}</h3>
                                    <p className={`mt-0.5 text-xs font-semibold ${textAccent}`}>{handle}</p>
                                    <p className="mt-2.5 flex-1 text-xs leading-relaxed text-slate-500">{desc}</p>
                                    <Link
                                        href={href}
                                        target="_blank"
                                        className={`mt-4 flex items-center justify-center gap-1.5 rounded-xl ${ctaBg} px-3 py-2.5 text-xs font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95`}
                                    >
                                        {cta}
                                        <HiArrowTopRightOnSquare className="size-3" />
                                    </Link>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* ── SUPPORT INFO STRIP ── */}
                <div className="mt-10 grid grid-cols-1 gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-3">
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                            <HiClock className="size-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Office Hours</p>
                            <p className="mt-0.5 text-xs text-slate-500">Monday – Saturday</p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-600">10:00 AM – 7:00 PM IST</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                            <HiCheckCircle className="size-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Response Time</p>
                            <p className="mt-0.5 text-xs text-slate-500">Email: within 24 hours</p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-600">WhatsApp: within 2 hours</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                            <MdSupportAgent className="size-5 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Languages Supported</p>
                            <p className="mt-0.5 text-xs text-slate-500">Our team speaks</p>
                            <p className="mt-0.5 text-xs font-semibold text-slate-600">English • Hindi</p>
                        </div>
                    </div>
                </div>

                {/* ── CLOSING CTA ── */}
                <div className="from-primary-base to-primary-light mt-10 rounded-3xl bg-linear-to-br px-8 py-10 text-center shadow-xl shadow-blue-200/50">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                        <HiQuestionMarkCircle className="size-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">Still have questions?</h3>
                    <p className="mx-auto mt-2.5 max-w-sm text-sm leading-relaxed text-blue-100">
                        Can&apos;t find what you&apos;re looking for? Drop us a direct email and our team will make sure
                        you get the right answer — no question is too small.
                    </p>
                    <Link
                        href="mailto:info@mycareerpathshala.com"
                        className="text-primary-base mt-6 inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3 text-sm font-bold shadow-lg shadow-black/15 transition-all duration-150 hover:bg-blue-50 hover:shadow-xl active:scale-95"
                    >
                        <HiEnvelope className="size-4" />
                        info@mycareerpathshala.com
                    </Link>
                </div>
            </main>
        </>
    );
}
