'use client';

// imports
import { useState } from 'react';
import { HighlightNoticeType } from '@/assets/types/componentTypes';

export default function HighlightNotice({
    highlightNoticeList,
    collegeName,
}: {
    highlightNoticeList: HighlightNoticeType[];
    collegeName: string;
}) {
    const [extendText, setExtendText] = useState(false);

    const displayedNotifications = extendText ? highlightNoticeList : highlightNoticeList.slice(0, 2);

    return (
        <div className="bg-primary-gray mb-8 rounded-lg px-8 py-4 max-md:px-4 max-sm:p-3 max-sm:text-sm">
            <h2 className="flex flex-wrap items-center">
                <span className="font-bold">Latest Notification</span>
                <span className="text-primary-light ml-2">{collegeName}</span>
            </h2>
            <ul className="mt-2.5 ml-5 block list-disc">
                {displayedNotifications.map((highlightObject, index) => {
                    return (
                        <li key={index} className="mt-1">
                            <h3 className="inline font-bold text-slate-800">{highlightObject.title}:&nbsp;</h3>
                            <p className="inline text-slate-600">{highlightObject.noticeText}</p>
                        </li>
                    );
                })}
            </ul>
            {highlightNoticeList.length > 2 && (
                <div className="mt-2.5 flex items-end">
                    <button
                        type="button"
                        onClick={() => setExtendText((prev) => !prev)}
                        className="text-primary-base ml-auto block cursor-pointer font-bold select-none"
                    >
                        {extendText ? 'Read Less' : 'Read More'}
                    </button>
                </div>
            )}
        </div>
    );
}
