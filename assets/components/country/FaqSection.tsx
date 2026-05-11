'use client';

// imports
import { FaqType } from '@/assets/types/componentTypes';
import { useState } from 'react';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function FaqSection({ faqDataList }: { faqDataList: FaqType[] }) {
    const [showAnswer, setShowAnswer] = useState<number | null>(null);

    return (
        <div id="faq" className="mx-auto mt-20 w-full">
            <div>
                <div className="border-l-primary-base flex items-center gap-3 border-l-4 py-2 pl-4">
                    <HiChatBubbleLeftRight className="size-12 text-blue-500" />
                    <h3 className="flex flex-col items-start">
                        <span className="text-[22px] font-semibold">Common questions asked</span>
                        <span>
                            Stuck on something? We&apos;re here to help with all your questions and answer in one place
                        </span>
                    </h3>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
                {faqDataList.map((faq) => {
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
                                <div className="m-0 px-4 py-4">
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
        </div>
    );
}
