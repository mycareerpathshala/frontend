'use client';

import { MedicalFaqType } from '@/assets/types/mbbsTypes';
// imports
import { useState } from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function FaqSection({
    faqs,
    initialTopic,
}: {
    faqs: MedicalFaqType[];
    initialTopic: MedicalFaqType['selectTopic'];
}) {
    // topics are: ['University' | 'Course' | 'Campus' | 'Cost' | 'Admission']
    const [topic, setTopic] = useState<MedicalFaqType['selectTopic']>(initialTopic);
    const [showAnswer, setShowAnswer] = useState<number | null>(null);

    // selected faq topic
    const selectedFaq = faqs.find((faqObject) => faqObject.selectTopic === topic);

    return (
        <div id="faq" className="mt-12 rounded-lg border border-gray-200 p-6 max-sm:px-2">
            <div>
                <div className="flex items-center gap-3">
                    <HiChatBubbleLeftRight className="size-10 text-yellow-500" />
                    <h2 className="text-[22px] font-semibold">Common questions asked</h2>
                </div>

                <div className="mt-4 flex items-center gap-4 overflow-x-auto pb-2">
                    {(['College', 'Campus', 'Cost', 'Admission', 'Syllabus'] as const).map(
                        (item: MedicalFaqType['selectTopic'], index: number) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setTopic(item)}
                                    className={`${
                                        topic === item
                                            ? 'text-primary-base border-b-primary-base'
                                            : 'hover:border-b-primary-base hover:text-primary-base'
                                    } select-none' cursor-pointer border border-b-2 border-transparent py-2 whitespace-nowrap transition-all duration-200 ease-in-out`}
                                >
                                    On {item}
                                </button>
                            );
                        },
                    )}
                </div>
            </div>

            {selectedFaq ? (
                <div className="mt-4 flex flex-col gap-2">
                    {selectedFaq?.faqList.map((faq) => {
                        return (
                            <div key={faq.id} className="overflow-hidden rounded-xl border border-sky-400">
                                <div
                                    className="flex cursor-pointer items-center justify-between bg-sky-100 py-2 pr-2"
                                    onClick={() =>
                                        setShowAnswer((prev) => {
                                            if (prev && prev === faq.id) return null;
                                            return faq.id;
                                        })
                                    }
                                >
                                    <p className="pl-2 select-none">
                                        <span className="text-primary-base font-semibold">Question:</span>&nbsp;
                                        <span className="font-medium">{faq.question}</span>
                                    </p>
                                    <span>
                                        {showAnswer === faq.id ? (
                                            <MdKeyboardArrowUp className="size-7" />
                                        ) : (
                                            <MdKeyboardArrowDown className="size-7" />
                                        )}
                                    </span>
                                </div>

                                {showAnswer === faq.id && (
                                    <div className="px-4 py-4">
                                        <p>
                                            <span className="font-semibold text-sky-700">Answer:</span>&nbsp;
                                            <span>{faq.answer}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-4 overflow-hidden rounded-xl border-2 border-red-200 px-4 py-2">
                    No faq question found for {topic}.
                </div>
            )}
        </div>
    );
}
