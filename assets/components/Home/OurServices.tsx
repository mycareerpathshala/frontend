// imports
import Link from 'next/link';
import {
    HiIdentification,
    HiChatBubbleLeftRight,
    HiBookOpen,
    HiDocumentText,
    HiClipboardDocumentCheck,
    HiInformationCircle,
    HiChevronRight,
} from 'react-icons/hi2';
import { IconType } from 'react-icons';

// types
interface ServiceCardPropType {
    Icon: IconType;
    badgeText?: string;
    title: string;
    desc: string;
    cta: string;
    href: string;
    bgClass: string;
    badgeBg: string;
}

// 2. Destructured Props correctly
function ServiceCard({ cardData }: { cardData: ServiceCardPropType }) {
    // Destructure properties from cardData for easier use
    const { Icon, badgeText, title, desc, cta, href, bgClass, badgeBg } = cardData;

    return (
        <div
            className={`${bgClass} rounded-3xl p-6 shadow-[0_6px_28px_rgba(16,24,40,0.08)] ring-1 ring-black/5 transition hover:scale-[1.02]`}
        >
            <div className="mb-4 flex items-center gap-2">
                <div
                    className={`${badgeBg} inline-flex items-center justify-center rounded-lg px-2 py-1 text-white`}
                    style={{ minWidth: 36, minHeight: 36 }}
                >
                    {badgeText ? (
                        <span className="text-xs font-semibold tracking-wide">{badgeText}</span>
                    ) : (
                        <Icon className="h-5 w-5" />
                    )}
                </div>
            </div>

            <h3 className="text-xl leading-snug font-extrabold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>

            <div className="mt-6">
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
                >
                    {cta}
                    <HiChevronRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

export default function OurServices() {
    const cards = [
        {
            Icon: HiIdentification,
            title: 'Profile Assessment',
            desc: 'After your application is submitted, our team of experts reviews your educational background, work experience, and personal goals',
            cta: 'Register Now',
            href: '/auth/register',
            bgClass: 'bg-blue-50',
            badgeBg: 'bg-blue-600',
        },
        {
            Icon: HiChatBubbleLeftRight,
            title: 'Dedicated Counselling',
            desc: 'Our counselors will help you choose the right country, university, and course, or connect you with current student mentors',
            cta: 'Free Mentorship',
            href: '/dashboard/counselling',
            bgClass: 'bg-rose-50',
            badgeBg: 'bg-rose-600',
        },
        {
            Icon: HiBookOpen,
            title: 'Test Prep & Events',
            desc: 'Get free advice and strategies for international exams like IELTS, TOEFL, SAT, GRE, GMAT, and info on required scores for top universities',
            cta: 'Register Now',
            href: '/auth/register',
            bgClass: 'bg-emerald-50',
            badgeBg: 'bg-emerald-600',
        },
        {
            Icon: HiDocumentText,
            title: 'Documentation & Essay',
            desc: 'Our specialists review each application and essay before submission, offering full support throughout the preparation process',
            cta: 'Avail Services',
            href: '/auth/register',
            bgClass: 'bg-amber-50',
            badgeBg: 'bg-amber-600',
        },
        {
            // The design shows a VISA badge; we use text badge for accuracy
            Icon: HiClipboardDocumentCheck,
            badgeText: 'VISA',
            title: 'VISA Application & Interview',
            desc: 'With top visa approval rates in the industry, our team helps you navigate the best strategies to secure a study visa for your dream destination',
            cta: 'Apply with us',
            href: '/auth/register',
            bgClass: 'bg-fuchsia-50',
            badgeBg: 'bg-fuchsia-600',
        },
        {
            Icon: HiInformationCircle,
            title: 'Financial aid & Scholarship',
            desc: 'Our team will advise you on budgeting for your studies, securing internships, and obtaining educational loans and scholarships',
            cta: 'Get Help on Finance',
            href: '/contact',
            bgClass: 'bg-indigo-50',
            badgeBg: 'bg-indigo-600',
        },
    ];

    return (
        <section className="mx-auto mt-18 max-w-7xl px-4 py-8 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Our Services
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Changed id type from string to number */}
                {cards.map((cardData: ServiceCardPropType, index: number) => (
                    <ServiceCard key={index} cardData={cardData} />
                ))}
            </div>
        </section>
    );
}
