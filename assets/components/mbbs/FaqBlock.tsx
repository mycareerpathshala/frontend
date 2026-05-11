'use client';

// imports
import { MedicalFaqType } from '@/assets/types/mbbsTypes';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

// faq type
interface FlatFaqType {
    id: number;
    question: string;
    answer: string;
    topicName: string;
}

export default function FaqBlock({ faqData }: { faqData: MedicalFaqType[] }) {
    const [showAnswer, setShowAnswer] = useState<number | null>(null);

    const faqObjectList = faqData.flatMap((faqObject) => {
        const { faqList, selectTopic } = faqObject;

        return faqList.map((faq) => ({
            ...faq,
            topicName: selectTopic,
        }));
    });

    // console.log(faqObjectList);

    return (
        <div className="mt-10 flex flex-col gap-3 px-1">
            {faqObjectList.map((faq: FlatFaqType) => {
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
                            <div className="bg-white px-4 py-4">
                                <p className="flex items-start justify-start gap-1">
                                    <span className="font-semibold text-sky-700">Answer:</span>&nbsp;
                                    <span className="text-left">{faq.answer}</span>
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
