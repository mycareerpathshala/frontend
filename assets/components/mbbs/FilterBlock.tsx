'use client';

import { mediaUrl } from '@/assets/utilities/mediaUrl';
import { useAppContext } from '@/assets/context/AppContext';
import { CountryMinType } from '@/assets/types/countryTypes';
// imports
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { HiCheck, HiChevronDown, HiFunnel, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { LuArrowDownUp } from 'react-icons/lu';

export default function FilterBlock({
    setShowFilter,
    filteredData,
    handleCountryChange,
    dataFilter,
    handleSortChange,
}: {
    setShowFilter: Dispatch<SetStateAction<boolean>>;
    filteredData: CountryMinType | null;
    handleCountryChange: (id: string | null) => void;
    dataFilter: 'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byAcceptance';
    handleSortChange: (sort: 'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byAcceptance') => void;
}) {
    const { setSearchEnabled } = useAppContext();
    const [showDataFilter, setShowDataFilter] = useState<boolean>(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    const filterLabels = {
        byNameAZ: 'Name (A → Z)',
        byNameZA: 'Name (Z → A)',
        byTuitionLH: 'Tuition (Low → High)',
        byAcceptance: 'Acceptance Rate',
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (showDataFilter && dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setShowDataFilter(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDataFilter]);

    return (
        <section className="mt-8 rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4">
            {/* top row — label */}
            <div className="mb-3">
                <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Refine Results</span>
            </div>

            {/* bottom row — controls */}
            <div className="relative flex items-center justify-between gap-3 max-sm:flex-col">
                {/* Left — country filter */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setShowFilter(true)}
                        className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium shadow-xs transition-all select-none ${
                            filteredData
                                ? 'border-blue-300 bg-blue-50 text-blue-700 hover:border-blue-400 hover:bg-blue-100'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >
                        {filteredData ? (
                            <>
                                <span className="size-4 shrink-0 overflow-hidden rounded-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`${mediaUrl(filteredData.countryFlag?.url)}`}
                                        alt={filteredData.name}
                                        className="size-full object-cover"
                                    />
                                </span>
                                <span className="max-sm:text-sm">{filteredData.name}</span>
                            </>
                        ) : (
                            <>
                                <HiFunnel className="size-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-500" />
                                <span>All Countries</span>
                            </>
                        )}
                        <HiChevronDown className="size-3.5 shrink-0 opacity-50" />
                    </button>

                    {filteredData && (
                        <button
                            type="button"
                            onClick={() => handleCountryChange(null)}
                            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-500 shadow-xs transition-all select-none hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                            <HiXMark className="size-3.5 shrink-0" />
                            Clear
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setSearchEnabled(true)}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-xs transition-all select-none hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <HiMagnifyingGlass className="size-4 shrink-0 opacity-60" />
                        <span>Search</span>
                    </button>
                </div>

                {/* Right — sort */}
                <div ref={dropDownRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setShowDataFilter((v) => !v)}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium shadow-xs transition-all select-none ${
                            showDataFilter
                                ? 'border-blue-300 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                    >
                        <LuArrowDownUp className="size-3.5 shrink-0 opacity-60" />
                        <span>{filterLabels[dataFilter]}</span>
                        <HiChevronDown
                            className={`size-3.5 shrink-0 opacity-50 transition-transform duration-200 ${showDataFilter ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {showDataFilter && (
                        <div className="absolute top-full right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg max-sm:-right-4">
                            <div className="p-1">
                                {(Object.keys(filterLabels) as Array<keyof typeof filterLabels>).map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => {
                                            handleSortChange(key);
                                            setShowDataFilter(false);
                                        }}
                                        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors select-none ${
                                            dataFilter === key
                                                ? 'bg-blue-50 font-semibold text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                    >
                                        {filterLabels[key]}
                                        {dataFilter === key && <HiCheck className="size-3.5 shrink-0 text-blue-600" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
