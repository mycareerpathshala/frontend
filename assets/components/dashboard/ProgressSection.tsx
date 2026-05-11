'use client';

import { useState } from 'react';
import {
    HiAcademicCap,
    HiArrowRight,
    HiCheck,
    HiCheckCircle,
    HiClock,
    HiDocumentText,
    HiFlag,
    HiGlobeAlt,
    HiIdentification,
    HiMinusCircle,
} from 'react-icons/hi2';

type StepStatus = 'completed' | 'current' | 'upcoming';

interface Step {
    id: number;
    label: string;
    Icon: React.ElementType;
    status: StepStatus;
}

interface Task {
    label: string;
    sub: string;
    done: boolean;
}

interface StepDetail {
    intro: string;
    tasks: Task[];
    cta: string;
}

const STEPS: Step[] = [
    { id: 1, label: 'Onboard with us', Icon: HiFlag, status: 'current' },
    { id: 2, label: 'Eligibility for best fit', Icon: HiAcademicCap, status: 'upcoming' },
    { id: 3, label: 'Apply to Universities', Icon: HiDocumentText, status: 'upcoming' },
    { id: 4, label: 'Application Status', Icon: HiGlobeAlt, status: 'upcoming' },
    { id: 5, label: 'VISA Status', Icon: HiIdentification, status: 'upcoming' },
];

const STEP_DETAILS: Record<number, StepDetail> = {
    1: {
        intro: 'Welcome! Explore universities and courses of your choice. Save, shortlist, and compare your options of interest.',
        tasks: [
            {
                label: 'Tell us more about yourself',
                sub: 'We need some information to help you find the best universities for you.',
                done: false,
            },
            {
                label: 'Wait is over',
                sub: 'Boost your career with immense opportunities abroad with world-class infrastructure and education.',
                done: true,
            },
        ],
        cta: 'Tell us more',
    },
    2: {
        intro: 'Get matched with the best universities based on your academic profile and career preferences.',
        tasks: [
            {
                label: 'Take the eligibility test',
                sub: 'A short test to help us match you with the most suitable universities.',
                done: false,
            },
            {
                label: 'Review your university matches',
                sub: 'Browse universities curated specifically for your profile.',
                done: false,
            },
        ],
        cta: 'Start eligibility test',
    },
    3: {
        intro: 'Apply to your shortlisted universities with step-by-step guided support from our counsellors.',
        tasks: [
            {
                label: 'Upload your documents',
                sub: 'Submit transcripts, passport, and other required application documents.',
                done: false,
            },
            {
                label: 'Write your Statement of Purpose',
                sub: 'Get expert help crafting a compelling SOP to improve your chances.',
                done: false,
            },
        ],
        cta: 'Start applying',
    },
    4: {
        intro: 'Track your application status in real time and stay updated on every stage of your journey.',
        tasks: [
            {
                label: 'Application under review',
                sub: 'Your application has been submitted and is being reviewed by the university.',
                done: false,
            },
            {
                label: 'Accept or decline offer letter',
                sub: 'Once received, review and respond to the offer letter within the deadline.',
                done: false,
            },
        ],
        cta: 'View application status',
    },
    5: {
        intro: 'Complete your VISA process with expert guidance. We will walk you through every requirement.',
        tasks: [
            {
                label: 'Book your visa appointment',
                sub: 'Schedule your visa interview at the nearest consulate or embassy.',
                done: false,
            },
            {
                label: 'Visa approved',
                sub: 'Congratulations! Once approved, you are ready to begin your journey abroad.',
                done: false,
            },
        ],
        cta: 'Start visa process',
    },
};

export default function ProgressSection() {
    const [activeStep, setActiveStep] = useState(1);
    const detail = STEP_DETAILS[activeStep];
    const step = STEPS[activeStep - 1];

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            {/* ── Step tracker ── */}
            <div className="relative px-6 pt-8 pb-0">
                {/* Full background connector line */}
                <div className="absolute top-13 right-[calc(10%+20px)] left-[calc(10%+20px)] h-0.5 bg-slate-200" />
                {/* Completed connector line */}
                <div
                    className="absolute top-13 left-[calc(10%+20px)] h-0.5 bg-blue-600 transition-all duration-500"
                    style={{
                        width: `calc(${((activeStep - 1) / (STEPS.length - 1)) * 80}% )`,
                    }}
                />

                <div className="flex items-start">
                    {STEPS.map((s) => {
                        const isActive = s.id === activeStep;
                        const isCompleted = s.id < activeStep;

                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveStep(s.id)}
                                className="group flex flex-1 cursor-pointer flex-col items-center gap-2"
                            >
                                {/* "You are here" badge */}
                                <div
                                    className={`mb-1 flex h-5 items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-white shadow-sm shadow-blue-300">
                                        You are here
                                    </span>
                                </div>

                                {/* Circle */}
                                <div
                                    className={`relative z-10 flex size-10 items-center justify-center rounded-full text-sm font-bold ring-2 ring-offset-2 transition-all duration-200 ${
                                        isCompleted
                                            ? 'bg-blue-600 text-white ring-blue-200'
                                            : isActive
                                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-blue-300'
                                              : 'bg-slate-100 text-slate-400 ring-transparent group-hover:ring-slate-200'
                                    }`}
                                >
                                    {isCompleted ? <HiCheck className="size-5" /> : s.id}
                                </div>

                                {/* Labels */}
                                <div className="px-1 text-center">
                                    <p className="text-[10px] font-medium text-slate-400">Step{s.id}</p>
                                    <p
                                        className={`text-[11px] leading-tight font-semibold transition-colors ${
                                            isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                                        }`}
                                    >
                                        {s.label}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── In-progress indicator bar ── */}
            <div className="mx-6 mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                    <HiClock className="size-3.5 text-white" />
                </div>
                <div className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 text-sm font-bold text-blue-700">Step{step.id}</span>
                    <span className="truncate text-sm text-blue-600">{step.label}</span>
                </div>
                <span className="ml-auto shrink-0 rounded-full border border-amber-200 bg-amber-100 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-amber-600">
                    in progress
                </span>
            </div>

            {/* ── Step detail ── */}
            <div className="grid grid-cols-3 gap-6 p-6">
                {/* Left: description + tasks + CTA */}
                <div className="col-span-2">
                    <p className="mb-6 text-sm leading-relaxed text-slate-500">{detail.intro}</p>

                    <div className="space-y-4">
                        {detail.tasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-3">
                                {task.done ? (
                                    <HiCheckCircle className="mt-0.5 size-5 shrink-0 text-green-500" />
                                ) : (
                                    <HiMinusCircle className="mt-0.5 size-5 shrink-0 text-slate-300" />
                                )}
                                <div>
                                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                                        <p className="text-sm font-bold text-slate-700">{task.label}</p>
                                        <span
                                            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                                                task.done
                                                    ? 'border-green-100 bg-green-50 text-green-600'
                                                    : 'border-slate-200 bg-slate-100 text-slate-400'
                                            }`}
                                        >
                                            {task.done ? 'Complete' : 'Not Complete'}
                                        </span>
                                    </div>
                                    <p className="text-xs leading-relaxed text-slate-400">{task.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 flex items-center gap-2 rounded-xl border-2 border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition-all select-none hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
                        {detail.cta}
                        <HiArrowRight className="size-4" />
                    </button>
                </div>

                {/* Right: illustration */}
                <div className="flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {/* Outer ring */}
                        <div className="flex size-36 items-center justify-center rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50">
                            <step.Icon className="size-16 text-blue-200" />
                        </div>
                        {/* Badge top-right */}
                        <div className="absolute -top-2 -right-2 flex size-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-300">
                            <HiCheck className="size-4.5 text-white" />
                        </div>
                        {/* Badge bottom-left */}
                        <div className="absolute -bottom-2 -left-2 flex size-9 items-center justify-center rounded-xl bg-amber-400 shadow-lg shadow-amber-200">
                            <HiClock className="size-4.5 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
