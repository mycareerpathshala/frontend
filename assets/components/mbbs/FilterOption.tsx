/* eslint-disable @next/next/no-img-element */
// imports
import { mediaUrl } from '@/assets/utilities/mediaUrl';
import { CountryMinType } from '@/assets/types/countryTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

// local components
function CountryCard({
    countryData,
    localCountryFilter,
    setLocalCountryFilter,
}: {
    countryData: CountryMinType;
    localCountryFilter: string | null;
    setLocalCountryFilter: Dispatch<SetStateAction<string | null>>;
}) {
    const isSelected = localCountryFilter === countryData.documentId;

    const handleToggle = () => {
        setLocalCountryFilter((prev) => {
            // Deselect if already selected, otherwise select new
            return prev === countryData.documentId ? null : countryData.documentId;
        });
    };

    return (
        <div
            className={`flex items-center justify-start gap-3 border-b border-gray-200 px-4 py-2 transition-colors ${
                isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
            }`}
        >
            <input
                type="checkbox"
                name="country-filter"
                id={`country-${countryData.documentId}`}
                checked={isSelected}
                onChange={handleToggle}
                className="peer size-4 cursor-pointer accent-blue-500"
            />
            <label
                htmlFor={`country-${countryData.documentId}`}
                className="flex flex-1 cursor-pointer items-center justify-between select-none peer-checked:font-semibold"
            >
                <span className="text-slate-700 max-sm:text-sm">{countryData.name}</span>
                <img
                    src={`${mediaUrl(countryData.countryFlag?.url)}`}
                    alt={`${countryData.name} Flag`}
                    className="h-6 w-auto object-contain max-sm:h-4"
                />
            </label>
        </div>
    );
}

export default function FilterOption({
    countryList,
    countryFilter,
    handleCountryChange,
    setShowFilter,
}: {
    countryList: CountryMinType[];
    countryFilter: string | null;
    handleCountryChange: (id: string | null) => void;
    setShowFilter: Dispatch<SetStateAction<boolean>>;
}) {
    const [filterOption, setFilterOption] = useState<'country'>('country');
    const [localCountryFilter, setLocalCountryFilter] = useState<string | null>(countryFilter);

    const handleSetFilter = () => {
        handleCountryChange(localCountryFilter);
        setShowFilter(false);
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 backdrop-blur-sm">
            {/* Modal Container */}
            <div className="flex h-120 w-full max-w-162 flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
                {/* Header - Fixed Height */}
                <div className="flex w-full shrink-0 items-center justify-between border-b border-gray-300 px-6 py-4">
                    <h4 className="text-2xl font-semibold text-slate-800 max-sm:text-lg">Filters</h4>
                    <button
                        type="button"
                        onClick={() => setShowFilter(false)}
                        className="flex cursor-pointer items-center gap-1.5 border-b-2 border-transparent py-0.5 text-blue-600 transition-all hover:border-blue-600"
                    >
                        <span className="text-lg font-semibold text-blue-600 max-sm:text-sm">Close</span>
                        <MdOutlineClose className="size-7 max-sm:size-6" />
                    </button>
                </div>

                {/* Main Content Area - Expands to fill modal */}
                <div className="flex flex-1 overflow-hidden max-sm:flex-col">
                    {/* Left Sidebar Menu */}
                    <div className="flex w-1/3 shrink-0 flex-col items-start justify-start border-r border-gray-200 bg-slate-50 max-sm:w-full max-sm:flex-row max-sm:gap-4 max-sm:overflow-x-auto max-sm:pb-2">
                        <button
                            type="button"
                            onClick={() => setFilterOption('country')}
                            className={`${
                                filterOption === 'country'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Select Country
                        </button>
                    </div>

                    {/* Right Content Panel */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        {/* Scrollable List - This takes all remaining space */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                            <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                    Country List
                                </span>
                            </div>

                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                {countryList && countryList.length > 0 ? (
                                    countryList.map((countryData) => (
                                        <CountryCard
                                            key={countryData.documentId}
                                            countryData={countryData}
                                            localCountryFilter={localCountryFilter}
                                            setLocalCountryFilter={setLocalCountryFilter}
                                        />
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-slate-500">No countries available</div>
                                )}
                            </div>
                        </div>

                        {/* Footer - Fixed Height at bottom of right panel */}
                        <div className="flex h-16 shrink-0 items-center justify-end border-t border-gray-300 bg-white px-8">
                            <button
                                type="button"
                                onClick={handleSetFilter}
                                className="cursor-pointer rounded-md bg-blue-600 px-8 py-2 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95 max-sm:text-sm"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
