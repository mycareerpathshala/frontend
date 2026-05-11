'use client';

// imports
import { FmgePassingRatioType } from '@/assets/types/mbbsTypes';
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

export default function FmgePassingRatio({ fmgePassingRatioData }: { fmgePassingRatioData: FmgePassingRatioType[] }) {
    const cleanData = fmgePassingRatioData
        .sort((a, b) => new Date(b.selectDate).getTime() - new Date(a.selectDate).getTime())
        .map((record) => {
            const yearOnly = new Date(record.selectDate).getFullYear().toString();
            return {
                ...record,
                selectDate: yearOnly,
            };
        });

    // Initialize with the first record
    const [selectedData, setSelectedData] = useState<FmgePassingRatioType>(cleanData[0]);

    // Handle change on the SELECT element
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const record = cleanData.find((r) => r.id === parseInt(e.target.value));
        if (record) {
            setSelectedData(record);
        }
    };

    // Calculate percentage once for use in multiple places
    const percentage =
        selectedData.totalAppeared > 0 ? Math.round((selectedData.totalPassed / selectedData.totalAppeared) * 100) : 0;

    return (
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
            <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                <h2 className="text-xl font-bold">FMGE Passing Ratio</h2>
            </div>

            <div className="px-4 pt-4 pb-6 md:px-8 md:pb-8">
                <div className="w-full rounded-2xl">
                    <div className="space-y-6 md:space-y-10">
                        {/* Year Selector & Tooltip Percentage */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative w-48">
                                <label
                                    htmlFor="fmge-year"
                                    className="absolute -top-1.5 left-3 z-10 bg-white px-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase"
                                >
                                    Select Year
                                </label>
                                <select
                                    id="fmge-year"
                                    name="year"
                                    value={selectedData.id}
                                    onChange={handleSelectChange}
                                    className="w-full appearance-none rounded-lg border border-gray-400 bg-white px-4 py-2 text-lg font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                                >
                                    {cleanData.map((record) => (
                                        <option key={record.id} value={record.id}>
                                            {record.selectDate}
                                        </option>
                                    ))}
                                </select>
                                <HiChevronDown className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2 text-slate-600" />
                            </div>

                            {/* The Tooltip-style Box */}
                            <div className="relative min-w-30 self-start rounded-xl border border-slate-100 bg-white p-4 text-center shadow-xl sm:-mt-4">
                                <p className="text-2xl leading-none font-bold text-blue-600">{percentage}%</p>
                                <p className="mt-1 text-[10px] font-bold tracking-tight text-slate-400 uppercase">
                                    FMGE Passing Rate
                                </p>
                                {/* Tooltip Arrow — only visible when side-by-side */}
                                <div className="absolute -bottom-2 left-1/2 hidden h-4 w-4 -translate-x-1/2 rotate-45 border-r border-b border-slate-100 bg-white sm:block"></div>
                            </div>
                        </div>

                        {/* Bar Chart Section */}
                        <div className="space-y-4 md:space-y-6">
                            {/* Appeared Bar */}
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
                                <span className="text-md leading-tight font-medium text-slate-600 sm:w-56">
                                    No. of students appeared
                                </span>
                                <div className="flex flex-1 items-center gap-4">
                                    <div className="h-4 flex-1 rounded-sm bg-blue-600"></div>
                                    <span className="text-md w-8 font-bold text-slate-500">
                                        {selectedData.totalAppeared}
                                    </span>
                                </div>
                            </div>

                            {/* Passed Bar */}
                            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-6">
                                <span className="text-md leading-tight font-medium text-slate-600 sm:w-56">
                                    No. of students passed
                                </span>
                                <div className="flex flex-1 items-center gap-4">
                                    <div
                                        className="h-4 rounded-sm bg-blue-400 transition-all duration-700 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                    <span className="text-md w-8 font-bold text-slate-500">
                                        {selectedData.totalPassed}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
