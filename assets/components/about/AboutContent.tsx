'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
    HiAcademicCap,
    HiUsers,
    HiLightBulb,
    HiStar,
    HiBriefcase,
    HiGlobeAlt,
    HiCheckBadge,
    HiSparkles,
    HiTrophy,
    HiRocketLaunch,
    HiCpuChip,
    HiShieldCheck,
} from 'react-icons/hi2';
import { FaQuoteLeft } from 'react-icons/fa6';

function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

const stats = [
    { label: 'Students Mentored', value: '10,000+', icon: HiUsers },
    { label: 'Years Experience', value: '16+', icon: HiStar },
    { label: 'NEET Students', value: '7,000+', icon: HiAcademicCap },
    { label: 'Countries Covered', value: '10+', icon: HiGlobeAlt },
];

const team = [
    {
        name: 'Kumar Ranjan',
        role: 'Founder, MyCareerPathshala & MeritPathshala',
        badge: '15+ Years of Experience',
        image: '/img/about/kumar.webp',
        bio: 'Kumar Ranjan is a distinguished career mentor with over 15 years of experience in guiding students and professionals toward achieving their academic and career aspirations. As the visionary founder of MyCareerPathshala and MeritPathshala, he has established himself as a trusted leader in the education and career counseling industry.',
        highlights: [
            { icon: HiAcademicCap, text: "Bachelor's Degree in Biotechnology — combining scientific outlook with human potential." },
            { icon: HiRocketLaunch, text: 'Founded MyCareerPathshala in 2018 — premier platform for study in India & abroad.' },
            { icon: HiTrophy, text: 'Founded MeritPathshala in 2021 — pioneer in IMAT coaching for Italy-based MBBS.' },
            { icon: HiUsers, text: 'Mentored 10,000+ students and professionals in education & career decisions.' },
            { icon: HiCpuChip, text: 'Developed cutting-edge career assessment and skill development programs.' },
        ],
        mission: "Empower individuals with the knowledge, skills, and confidence needed to excel in their academic and professional journeys.",
    },
    {
        name: 'Megha Lal',
        role: 'Admission Officer & Career Mentor',
        badge: '10+ Years of Experience',
        image: '/img/about/megha.webp',
        bio: 'Megha has been an avid career counselor with vast experience in mentoring more than 7,000+ students in their career-making journey. Her extensive expertise in NEET counseling and international education guidance has made her a key asset at MyCareerPathshala and MeritPathshala.',
        highlights: [
            { icon: HiBriefcase, text: 'Worked with Amity University, Aakash Institute, and Narayana IIT Academy (2013–present).' },
            { icon: HiUsers, text: 'Guided 7,000+ students in higher studies in India and abroad.' },
            { icon: HiCheckBadge, text: 'Specialized in AI-powered NEET seat matrix counseling at MyCareerPathshala.' },
            { icon: HiShieldCheck, text: 'HR Head — building elite teams at MyCareerPathshala and MeritPathshala (Since 2021).' },
            { icon: HiGlobeAlt, text: 'International counseling for UK, Germany, Italy, and France — higher education & visas.' },
        ],
        mission: null,
    },
    {
        name: 'Premanand Rai',
        role: 'Co-Founder, MeritPathshala',
        badge: '16+ Years of Experience',
        image: '/img/about/premanand.webp',
        bio: 'Premanand Rai is an accomplished career mentor and coach with over 16 years of experience in guiding students and professionals to achieve their educational and career aspirations. His expertise in career counseling and global education has made him a trusted guide for students worldwide.',
        highlights: [
            { icon: HiCheckBadge, text: 'Certified Career Counsellor (CCPA) — Canadian Counselling and Psychotherapy Association (2008).' },
            { icon: HiTrophy, text: 'Former Chairman of IEEE Chennai Chapter — fostering innovation and knowledge sharing.' },
            { icon: HiBriefcase, text: 'Career Coach at Sutherland Global Services and HCL, Chennai (2009–2010).' },
            { icon: HiLightBulb, text: 'Career Counselling Trainer at Margdarshak, Noida (2018–2019).' },
            { icon: HiStar, text: "Chief NEET Counselor — India's first AI-powered NEET counseling service (since 2016)." },
            { icon: HiRocketLaunch, text: 'Co-founder of MeritPathshala — pioneer in IMAT coaching for Italy-based MBBS (Since 2021).' },
            { icon: HiGlobeAlt, text: 'Counseled 5,000+ students for UG/PG/PhD and visas across UK, USA, Australia, EU & more.' },
        ],
        mission: null,
    },
];

type TeamMember = (typeof team)[number];

function TeamCard({ member, reverse }: { member: TeamMember; reverse: boolean }) {
    const { ref, visible } = useReveal(0.08);

    return (
        <div
            ref={ref}
            className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
            <div className={`flex max-lg:flex-col ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Photo */}
                <div className="relative h-auto w-72 shrink-0 max-lg:h-72 max-lg:w-full">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 lg:hidden">
                        <p className="text-xl font-bold text-white">{member.name}</p>
                        <p className="text-sm text-blue-200">{member.role}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8 max-sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-2xl font-bold text-slate-900 max-lg:hidden">{member.name}</p>
                            <p className="mt-0.5 text-sm font-medium text-primary-base max-lg:hidden">{member.role}</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-bg px-3 py-1 text-xs font-semibold text-primary-base">
                            <HiStar className="size-3.5" />
                            {member.badge}
                        </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.bio}</p>

                    <div className="mt-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Key Highlights</p>
                        <ul className="space-y-2.5">
                            {member.highlights.map((h) => (
                                <li key={h.text} className="flex items-start gap-2.5 text-sm text-slate-600">
                                    <h.icon className="mt-0.5 size-4 shrink-0 text-primary-base" />
                                    <span>{h.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {member.mission && (
                        <div className="mt-6 flex gap-3 rounded-xl bg-primary-gray p-4">
                            <FaQuoteLeft className="mt-0.5 size-4 shrink-0 text-primary-lighter" />
                            <p className="text-sm italic leading-relaxed text-slate-600">{member.mission}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AboutContent() {
    const heroReveal = useReveal(0);
    const statsReveal = useReveal(0.05);
    const teamHeadReveal = useReveal(0.1);

    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary-base to-primary-light py-24 max-sm:py-16">
                <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/5" />
                <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03]" />

                <div
                    ref={heroReveal.ref}
                    className={`relative mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${heroReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
                        <HiSparkles className="size-4" />
                        About Us
                    </span>
                    <h1 className="mt-5 text-5xl font-bold leading-tight text-white max-lg:text-4xl max-sm:text-3xl">
                        Empowering Every Student&apos;s
                        <br className="max-sm:hidden" />
                        <span className="text-yellow-300"> Career Journey</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100 max-sm:text-base">
                        Since 2018, MyCareerPathshala has been a trusted guide for students seeking the right path in education and careers — in India and across the world.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b border-slate-100 bg-white">
                <div
                    ref={statsReveal.ref}
                    className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4"
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`flex flex-col items-center gap-2 text-center transition-all duration-500 ${statsReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-bg">
                                <stat.icon className="size-6 text-primary-base" />
                            </div>
                            <p className="text-3xl font-bold text-primary-dark max-sm:text-2xl">{stat.value}</p>
                            <p className="text-sm text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="bg-primary-gray py-20 max-sm:py-12">
                <div className="mx-auto max-w-6xl px-6">
                    <div
                        ref={teamHeadReveal.ref}
                        className={`mb-14 text-center transition-all duration-600 ${teamHeadReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                    >
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary-base">Our Team</p>
                        <h2 className="mt-2 text-4xl font-bold text-slate-900 max-sm:text-3xl">Meet the Mentors</h2>
                        <p className="mx-auto mt-3 max-w-xl text-slate-500">
                            Passionate experts with decades of combined experience dedicated to shaping successful futures.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {team.map((member, index) => (
                            <TeamCard key={member.name} member={member} reverse={index % 2 !== 0} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
