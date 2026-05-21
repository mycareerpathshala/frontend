/* eslint-disable @next/next/no-img-element */
// imports
import { CountryMinType } from '@/assets/types/countryTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { StreamType } from '@/assets/types/streamTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { HiAcademicCap, HiCheck } from 'react-icons/hi2';
import { LiaInternetExplorer, LiaSchoolSolid } from 'react-icons/lia';
import { MdAutoStories, MdCastForEducation, MdOutlineClose, MdScience, MdSchool, MdWork } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';

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
                isSelected ? 'bg-sky-50' : 'hover:bg-sky-100'
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
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${countryData.countryFlag?.url}`}
                    alt={`${countryData.name} Flag`}
                    className="h-6 w-auto object-contain max-sm:h-4"
                />
            </label>
        </div>
    );
}

function StreamCard({
    streamData,
    localStreamFilter,
    setLocalStreamFilter,
}: {
    streamData: StreamType & StrapiDataType;
    localStreamFilter: string | null;
    setLocalStreamFilter: Dispatch<SetStateAction<string | null>>;
}) {
    return (
        <button
            type="button"
            onClick={() => {
                setLocalStreamFilter(streamData.documentId);
            }}
            className={`${streamData.documentId === localStreamFilter ? 'outline-sky-500' : 'outline-transparent'} group relative block cursor-pointer overflow-hidden rounded-md outline-4 outline-offset-4 hover:outline-sky-400`}
        >
            <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${streamData.streamCover?.formats?.small?.url ? streamData.streamCover.formats.small.url : '/img/placeholders/stream_placeholder.jpg'}`}
                alt={`${streamData.name} Cover`}
                className=""
            />
            <div
                className={`${streamData.documentId === localStreamFilter ? 'bg-black/40' : ''} absolute inset-0 z-0 h-full w-full group-hover:bg-black/30`}
            ></div>
            <div className="absolute bottom-0 w-full p-2">
                <p className="z-50 text-center font-bold text-white transition-all duration-200 ease-in-out group-hover:scale-110 max-sm:text-sm">
                    {streamData.name}
                </p>
            </div>
        </button>
    );
}

type CourseLevel = 'Undergraduate' | 'Postgraduate' | 'PhD / Doctorate' | 'Diploma / Certificate' | 'Foundation / Pathway' | 'Vocational Training' | 'Language Course';

const LEVEL_META: Record<CourseLevel, {
    Icon:      React.ElementType;
    iconBg:    string;
    iconColor: string;
    activeBg:  string;
    activeBorder: string;
}> = {
    'Undergraduate':       { Icon: MdSchool,         iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   activeBg: 'bg-blue-50',   activeBorder: 'border-blue-500' },
    'Postgraduate':        { Icon: HiAcademicCap,    iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', activeBg: 'bg-indigo-50', activeBorder: 'border-indigo-500' },
    'PhD / Doctorate':     { Icon: MdScience,        iconBg: 'bg-purple-100', iconColor: 'text-purple-600', activeBg: 'bg-purple-50', activeBorder: 'border-purple-500' },
    'Diploma / Certificate': { Icon: TbCertificate,  iconBg: 'bg-amber-100',  iconColor: 'text-amber-600',  activeBg: 'bg-amber-50',  activeBorder: 'border-amber-500' },
    'Foundation / Pathway':  { Icon: MdCastForEducation, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', activeBg: 'bg-emerald-50', activeBorder: 'border-emerald-500' },
    'Vocational Training': { Icon: MdWork,           iconBg: 'bg-orange-100', iconColor: 'text-orange-600', activeBg: 'bg-orange-50', activeBorder: 'border-orange-500' },
    'Language Course':     { Icon: MdAutoStories,    iconBg: 'bg-teal-100',   iconColor: 'text-teal-600',   activeBg: 'bg-teal-50',   activeBorder: 'border-teal-500' },
};

function LevelCard({
    levelData,
    localLevelFilter,
    setLocalLevelFilter,
}: {
    levelData: CourseLevel;
    localLevelFilter: CourseLevel | null;
    setLocalLevelFilter: Dispatch<SetStateAction<CourseLevel | null>>;
}) {
    const isSelected = levelData === localLevelFilter;
    const { Icon, iconBg, iconColor, activeBg, activeBorder } = LEVEL_META[levelData];

    return (
        <button
            type="button"
            onClick={() => setLocalLevelFilter((p) => (p === levelData ? null : levelData))}
            className={`relative flex w-full items-center gap-3 rounded-2xl border-2 px-3.5 py-3 text-left transition-all duration-150 select-none ${
                isSelected
                    ? `${activeBorder} ${activeBg} shadow-sm`
                    : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-white'
            }`}
        >
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${isSelected ? iconBg : 'bg-white'} transition-colors`}>
                <Icon className={`size-4.5 ${iconColor}`} />
            </div>
            <span className={`text-xs font-bold leading-snug ${isSelected ? 'text-slate-800' : 'text-slate-600'}`}>
                {levelData}
            </span>
            {isSelected && (
                <div className={`absolute top-2 right-2 flex size-4 items-center justify-center rounded-full ${iconBg}`}>
                    <HiCheck className={`size-2.5 ${iconColor}`} />
                </div>
            )}
        </button>
    );
}

function DeliveryMethodCard({
    deliveryMethodData,
    localDeliveryMethodFilter,
    setLocalDeliveryMethodFilter,
}: {
    deliveryMethodData: 'On-Campus' | 'Online' | 'Blended';
    localDeliveryMethodFilter: 'On-Campus' | 'Online' | 'Blended' | null;
    setLocalDeliveryMethodFilter: Dispatch<SetStateAction<'On-Campus' | 'Online' | 'Blended' | null>>;
}) {
    return (
        <button
            type="button"
            onClick={() => setLocalDeliveryMethodFilter(deliveryMethodData)}
            className={`${deliveryMethodData === localDeliveryMethodFilter ? 'border-sky-500 bg-sky-50' : 'border border-sky-100'} group flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-3 py-2 text-gray-900 select-none hover:bg-sky-100`}
        >
            <span>
                {deliveryMethodData === 'On-Campus' && <LiaSchoolSolid className="size-5 max-sm:size-4" />}
                {deliveryMethodData === 'Online' && <LiaInternetExplorer className="size-5 max-sm:size-4" />}
                {deliveryMethodData === 'Blended' && <FaUsers className="size-5 max-sm:size-4" />}
            </span>
            <span className="font-semibold max-sm:text-sm">{deliveryMethodData}</span>
        </button>
    );
}

function LanguageCard({
    languageData,
    localStudyLanguageFilter,
    setLocalStudyLanguageFilter,
}: {
    languageData: string;
    localStudyLanguageFilter: string | null;
    setLocalStudyLanguageFilter: Dispatch<SetStateAction<string | null>>;
}) {
    const isSelected = localStudyLanguageFilter === languageData;

    const handleToggle = () => {
        setLocalStudyLanguageFilter((prev) => {
            // Deselect if already selected, otherwise select new
            return prev === languageData ? null : languageData;
        });
    };

    return (
        <div
            className={`flex items-center justify-start gap-3 border-b border-gray-200 px-4 py-2 transition-colors ${
                isSelected ? 'bg-sky-50' : 'hover:bg-sky-100'
            }`}
        >
            <input
                type="checkbox"
                name="language-filter"
                id={`language-${languageData}`}
                checked={isSelected}
                onChange={handleToggle}
                className="peer size-4 cursor-pointer accent-blue-500"
            />
            <label
                htmlFor={`language-${languageData}`}
                className="flex flex-1 cursor-pointer items-center justify-between select-none peer-checked:font-semibold"
            >
                <span className="text-slate-700 max-sm:text-sm">{languageData}</span>
            </label>
        </div>
    );
}

function CourseOfferingCard({
    courseOfferingData,
    localCourseOfferingFilter,
    setLocalCourseOfferingFilter,
}: {
    courseOfferingData: 'Full-Time' | 'Part-Time';
    localCourseOfferingFilter: 'Full-Time' | 'Part-Time' | null;
    setLocalCourseOfferingFilter: Dispatch<SetStateAction<'Full-Time' | 'Part-Time' | null>>;
}) {
    return (
        <button
            type="button"
            onClick={() => setLocalCourseOfferingFilter(courseOfferingData)}
            className={`${courseOfferingData === localCourseOfferingFilter ? 'border-sky-500 bg-sky-50' : 'border border-sky-100'} group flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-3 py-2 font-semibold text-gray-900 select-none hover:bg-sky-100 max-sm:text-sm`}
        >
            {courseOfferingData}
        </button>
    );
}

export type FilterOptionApplyPayload = {
    countryFilter: string | null;
    streamFilter: string | null;
    levelFilter: CourseLevel | null;
    deliveryMethodFilter: 'On-Campus' | 'Online' | 'Blended' | null;
    studyLanguageFilter: string | null;
    courseOfferingFilter: 'Full-Time' | 'Part-Time' | null;
};

export default function FilterOption({
    countryList,
    streamList,
    setShowFilter,
    countryFilter,
    streamFilter,
    levelFilter,
    deliveryMethodFilter,
    studyLanguageFilter,
    courseOfferingFilter,
    onApply,
}: {
    countryList: CountryMinType[];
    streamList: (StreamType & StrapiDataType)[];
    setShowFilter: Dispatch<SetStateAction<boolean>>;
    countryFilter: string | null;
    streamFilter: string | null;
    levelFilter: CourseLevel | null;
    deliveryMethodFilter: 'On-Campus' | 'Online' | 'Blended' | null;
    studyLanguageFilter: string | null;
    courseOfferingFilter: 'Full-Time' | 'Part-Time' | null;
    onApply: (filters: FilterOptionApplyPayload) => void;
}) {
    const [filterOption, setFilterOption] = useState<
        'country' | 'stream' | 'level' | 'deliveryMethod' | 'studyLanguage' | 'courseOffering'
    >('country');
    const [localCountryFilter, setLocalCountryFilter] = useState<string | null>(countryFilter);
    const [localStreamFilter, setLocalStreamFilter] = useState<string | null>(streamFilter);
    const [localLevelFilter, setLocalLevelFilter] = useState<'Undergraduate' | 'Postgraduate' | 'PhD / Doctorate' | 'Diploma / Certificate' | 'Foundation / Pathway' | 'Vocational Training' | 'Language Course' | null>(levelFilter);
    const [localDeliveryMethodFilter, setLocalDeliveryMethodFilter] = useState<
        'On-Campus' | 'Online' | 'Blended' | null
    >(deliveryMethodFilter);
    const [localStudyLanguageFilter, setLocalStudyLanguageFilter] = useState<string | null>(studyLanguageFilter);
    const [localCourseOfferingFilter, setLocalCourseOfferingFilter] = useState<'Full-Time' | 'Part-Time' | null>(
        courseOfferingFilter,
    );

    const handleSetFilter = () => {
        onApply({
            countryFilter: localCountryFilter,
            streamFilter: localStreamFilter,
            levelFilter: localLevelFilter,
            deliveryMethodFilter: localDeliveryMethodFilter,
            studyLanguageFilter: localStudyLanguageFilter,
            courseOfferingFilter: localCourseOfferingFilter,
        });

        setShowFilter(false);
    };

    // language list
    const languageList = [...new Set(countryList.map((item) => item.nativeLanguage))];

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4 backdrop-blur-sm">
            {/* Modal Container */}
            <div className="border-secondary-lighter flex h-120 w-full max-w-162 flex-col overflow-hidden rounded-lg border-2 bg-white shadow-2xl">
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
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Choose Country
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterOption('stream')}
                            className={`${
                                filterOption === 'stream'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Select Stream
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterOption('level')}
                            className={`${
                                filterOption === 'level'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Course Level
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterOption('deliveryMethod')}
                            className={`${
                                filterOption === 'deliveryMethod'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Delivery Method
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterOption('studyLanguage')}
                            className={`${
                                filterOption === 'studyLanguage'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Study Language
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilterOption('courseOffering')}
                            className={`${
                                filterOption === 'courseOffering'
                                    ? 'border-l-4 border-blue-500 bg-white font-semibold text-blue-600 max-sm:border-b-4 max-sm:border-l-0'
                                    : 'border-b border-gray-200 text-slate-600 hover:bg-slate-100'
                            } text-md w-full cursor-pointer px-6 py-4 text-left transition-colors max-sm:w-fit max-sm:p-3 max-sm:text-sm max-sm:whitespace-nowrap`}
                        >
                            Course Offering
                        </button>
                    </div>

                    {/* Right Content Panel */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        {/* Scrollable List - This takes all remaining space */}
                        {/* country filter options */}
                        {filterOption === 'country' && (
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
                        )}

                        {/* stream filter options */}
                        {filterOption === 'stream' && (
                            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                                <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                    <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                        Stream List
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-5 overflow-hidden rounded-lg border border-gray-200 p-4 max-sm:gap-2 max-sm:p-2">
                                    {streamList && streamList.length > 0 ? (
                                        streamList.map((streamData) => (
                                            <StreamCard
                                                key={streamData.documentId}
                                                streamData={streamData}
                                                localStreamFilter={localStreamFilter}
                                                setLocalStreamFilter={setLocalStreamFilter}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-500">No streams available</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* level filter options */}
                        {filterOption === 'level' && (
                            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                                <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                    <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                        Choose Level
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    {(['Undergraduate', 'Postgraduate', 'PhD / Doctorate', 'Diploma / Certificate', 'Foundation / Pathway', 'Vocational Training', 'Language Course'] as const).map(
                                        (levelData, index, arr) => (
                                            <div
                                                key={levelData}
                                                className={index === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2' : ''}
                                            >
                                                <LevelCard
                                                    levelData={levelData}
                                                    localLevelFilter={localLevelFilter}
                                                    setLocalLevelFilter={setLocalLevelFilter}
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {/* deliveryMethod filter options */}
                        {filterOption === 'deliveryMethod' && (
                            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                                <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                    <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                        Select Delivery Method
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-3">
                                    {(['On-Campus', 'Online', 'Blended'] as const).map(
                                        (deliveryMethodData: 'On-Campus' | 'Online' | 'Blended', index) => {
                                            return (
                                                <DeliveryMethodCard
                                                    key={index}
                                                    deliveryMethodData={deliveryMethodData}
                                                    localDeliveryMethodFilter={localDeliveryMethodFilter}
                                                    setLocalDeliveryMethodFilter={setLocalDeliveryMethodFilter}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        )}

                        {/* studyLanguage filter options */}
                        {filterOption === 'studyLanguage' && (
                            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                                <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                    <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                        Select Language
                                    </span>
                                </div>

                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                    {languageList && languageList.length > 0 ? (
                                        languageList.map((languageData: string, index) => (
                                            <LanguageCard
                                                key={index}
                                                languageData={languageData}
                                                localStudyLanguageFilter={localStudyLanguageFilter}
                                                setLocalStudyLanguageFilter={setLocalStudyLanguageFilter}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-slate-500">No streams available</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* deliveryMethod filter options */}
                        {filterOption === 'courseOffering' && (
                            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 max-sm:p-3">
                                <div className="mb-3 flex items-center justify-between max-sm:mb-4">
                                    <span className="text-lg font-semibold text-slate-800 max-sm:text-base">
                                        Course Offering Type
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-3">
                                    {(['Full-Time', 'Part-Time'] as const).map(
                                        (courseOfferingData: 'Full-Time' | 'Part-Time', index) => {
                                            return (
                                                <CourseOfferingCard
                                                    key={index}
                                                    courseOfferingData={courseOfferingData}
                                                    localCourseOfferingFilter={localCourseOfferingFilter}
                                                    setLocalCourseOfferingFilter={setLocalCourseOfferingFilter}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        )}

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
