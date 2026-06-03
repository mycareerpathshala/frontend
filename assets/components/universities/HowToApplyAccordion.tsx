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
        <div className="mt-8">
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
                    <ul className="mt-4 space-y-2 pl-5">
                        {howToApply.map((item) => (
                            <li key={item.id} className="list-disc text-[15px] text-gray-700 max-md:text-sm">
                                {item.bulletPoint}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
