'use client';

// imports
import { ImportantDateType } from '@/assets/types/componentTypes';
import { formatDateToMonthYear } from '@/assets/utilities/helperFunction';
import { useState } from 'react';

export default function ImportantDates({
    importantDateList,
    universityName,
}: {
    importantDateList: ImportantDateType[];
    universityName: string;
}) {
    const tagList: Set<'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Internship' | 'Short Term Course'> = new Set(
        importantDateList.map((singleObj) => singleObj.tagSelector),
    );

    const [selectedTag, setSelectedTag] = useState<
        'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Internship' | 'Short Term Course'
    >(importantDateList[0].tagSelector);

    return (
        <div className="mt-8 w-full overflow-hidden rounded-lg border border-sky-300 px-6 pt-6 pb-8 shadow-sm max-sm:px-3">
            <h3 className="flex flex-col border-l-4 border-blue-500 py-1 pl-4">
                <span className="text-sm text-gray-400">{universityName}</span>
                <span className="mt-1 text-2xl font-semibold text-blue-800 max-sm:text-xl">Important Dates</span>
            </h3>

            {/* tag selector */}
            <div className="mt-6 flex flex-wrap items-center gap-3 px-4 py-2 max-sm:gap-2 max-sm:px-2">
                <span>Category:</span>
                {[...tagList].map(
                    (tag: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Internship' | 'Short Term Course', index) => {
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedTag(tag)}
                                className={`${selectedTag === tag ? 'text-red-600 outline-red-400' : 'text-slate-900 outline-transparent'} cursor-pointer rounded-md bg-red-100 px-3 py-1 text-sm outline-2 outline-offset-4 select-none hover:bg-rose-400 hover:text-white`}
                            >
                                {tag}
                            </button>
                        );
                    },
                )}
            </div>

            <div className="mt-6 flex w-full flex-col overflow-hidden rounded-lg border border-gray-200">
                {/* Table Header */}
                <div className="flex w-full divide-x divide-white border-b border-gray-200 bg-sky-200 font-semibold text-gray-700">
                    <div className="w-2/3 px-4 py-4 text-center tracking-wider max-sm:px-2 max-sm:py-3 max-sm:text-sm">Application</div>
                    <div className="w-1/3 px-4 py-4 text-center tracking-wider max-sm:px-2 max-sm:py-3 max-sm:text-sm">Deadlines / Dates</div>
                </div>

                {/* Table Body */}
                <div className="flex flex-col divide-y divide-gray-200 text-sm max-sm:text-xs">
                    {importantDateList
                        .filter((dateObj) => dateObj.tagSelector === selectedTag)
                        .map((importantDate, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex w-full divide-x divide-gray-200 bg-white transition-colors"
                                >
                                    <div className="w-2/3 px-4 py-3 text-gray-800 max-sm:px-2 max-sm:py-2">
                                        {importantDate.oneLineDescription}
                                    </div>
                                    <div className="w-1/3 px-4 py-3 text-center text-gray-600 max-sm:px-2 max-sm:py-2">
                                        {formatDateToMonthYear(importantDate.date)}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
