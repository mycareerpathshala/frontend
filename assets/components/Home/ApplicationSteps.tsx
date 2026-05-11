// Easy steps block with stacked sticky scroll effect and Heroicons only

// imports
import {
    HiPencilSquare,
    HiUserGroup,
    HiAcademicCap,
    HiBuildingLibrary,
    HiDocumentCheck,
    HiClipboardDocumentList,
    HiEnvelopeOpen,
} from 'react-icons/hi2';
import React from 'react';
import { IconType } from 'react-icons';

// types
interface StepRowPropType {
    Icon: IconType;
    step: number;
    title: string;
    desc: string;
    align?: string;
}

// no JS needed for reveal; sticky stacking handled by CSS positioning
function StepBadge({ children }: { children: React.ReactNode }) {
    return (
        <div className="pointer-events-none absolute -top-3 left-6 inline-flex items-center rounded-md bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm select-none">
            {children}
        </div>
    );
}

function StepRow({ stepData }: { stepData: StepRowPropType }) {
    // align left/right controls where the icon sits to resemble screenshot variety
    const iconBlock = (
        <div className="hidden shrink-0 items-center justify-center sm:flex">
            <div className="relative h-32 w-40">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-100 to-blue-50" />
                <stepData.Icon className="absolute right-4 bottom-4 h-22 w-22 text-blue-900/20" />
                <stepData.Icon className="absolute right-3 bottom-3 h-16 w-16 text-blue-600" />
            </div>
        </div>
    );

    return (
        <div className="sticky top-46 mb-10 h-55 sm:h-60 md:h-65 lg:h-55">
            <div style={{ zIndex: 10 + stepData.step }}>
                <div className="relative rounded-2xl border border-blue-200 bg-white px-6 py-10 shadow-[0_6px_28px_rgba(16,24,40,0.06)]">
                    <StepBadge>Step {stepData.step}</StepBadge>
                    <div className={`flex items-center gap-6 ${stepData.align === 'right' ? 'flex-row-reverse' : ''}`}>
                        {iconBlock}
                        <div className="min-w-0 flex-1">
                            <h3 className="mb-2 text-2xl leading-snug font-extrabold text-gray-900 max-sm:text-lg">
                                {stepData.title}
                            </h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{stepData.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ApplicationSteps() {
    const steps = [
        {
            step: 1,
            title: 'Register with My Career Pathshala',
            desc: 'Begin your study abroad journey by registering on our platform, which provides comprehensive support throughout the process. Our website ensures a smooth start by guiding you through each step tailored to your academic and career goals.',
            Icon: HiPencilSquare,
            align: 'right',
        },
        {
            step: 2,
            title: 'Career Counselling',
            desc: 'Receive expert career counselling to identify your strengths, interests, and the best-fit study abroad programs. Our counsellors help you align your academic aspirations with the right career path.',
            Icon: HiUserGroup,
            align: 'left',
        },
        {
            step: 3,
            title: 'Entrance Test Guidance',
            desc: 'We provide detailed guidance on entrance tests like IELTS, TOEFL, GRE, GMAT, SAT, ACT, CAT and IMAT including which scores are required by different universities. Our experts help you prepare effectively to meet the specific test requirements of your target institutions.',
            Icon: HiAcademicCap,
            align: 'right',
        },
        {
            step: 4,
            title: 'Shortlist University',
            desc: 'Get assistance in shortlisting universities that match your profile, preferences, and career goals. We ensure you apply to institutions that offer the best opportunities for your chosen field of study.',
            Icon: HiBuildingLibrary,
            align: 'left',
        },
        {
            step: 5,
            title: 'Documentation',
            desc: 'Our team supports you in organizing and preparing all necessary documents, ensuring accuracy and completeness for your university applications. We guide you through every required document, from transcripts to recommendation letters.',
            Icon: HiDocumentCheck,
            align: 'right',
        },
        {
            step: 6,
            title: 'Application',
            desc: 'Submit your applications with confidence using our step-by-step guidance. We help you complete and submit applications to your shortlisted universities, ensuring that you meet all deadlines and requirements.',
            Icon: HiClipboardDocumentList,
            align: 'left',
        },
        {
            step: 7,
            title: 'University Letter and VISA',
            desc: 'Once accepted, we assist with the next steps, including securing your university admission letter and applying for your student visa. Our experts ensure you are well-prepared for a successful visa application process.',
            Icon: HiEnvelopeOpen,
            align: 'right',
        },
    ];

    return (
        <section className="relative mx-auto mt-12 mb-20 flex min-h-[240vh] max-w-7xl flex-col items-center px-4 py-10">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Easy steps to get into your dream university
            </h2>

            <div className="mt-8">
                {steps.map((stepData: StepRowPropType) => (
                    <StepRow key={stepData.step} stepData={stepData} />
                ))}
            </div>
        </section>
    );
}
