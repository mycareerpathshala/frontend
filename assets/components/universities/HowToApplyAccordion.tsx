'use client';

import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

interface Props {
    universityName: string;
    howToApply: { id: number; bulletPoint: string }[];
}

export default function HowToApplyAccordion({ universityName, howToApply }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/40 px-5 py-4">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between"
            >
                <p className="text-base max-md:text-sm">
                    How to apply in <span className="font-bold">{universityName}</span> with{' '}
                    <span className="text-primary-base">my </span>
                    <span className="text-secondary-base font-bold">career </span>
                    <span className="text-primary-base">pathshala</span>
                </p>
                <span className="flex items-center gap-2 shrink-0 pl-4">
                    <span className="text-[15px] font-semibold whitespace-nowrap max-md:text-sm">Know More</span>
                    <HiChevronDown
                        className={`size-6 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </span>
            </button>

            {/* smooth accordion */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 300ms ease',
                }}
            >
                <div className="overflow-hidden">
                    <div className="mt-4 space-y-3">
                        {howToApply.map((item, index) => (
                            <div key={item.id} className="flex items-start gap-3">
                                <span className="bg-primary-base mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                                    {index + 1}
                                </span>
                                <p className="text-[15px] leading-relaxed text-gray-700 max-md:text-sm">
                                    {item.bulletPoint}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
