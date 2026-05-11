/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CountryMinType } from '@/assets/types/countryTypes';
import { MedicalResponseType } from '@/assets/types/mbbsTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import ModernPagination from '../global/ModernPagination';
import SpinnerMini from '../global/SpinnerMini';
import FilterBlock from './FilterBlock';
import FilterOption from './FilterOption';
import MedicalCard from './MedicalCard';

// Define how to translate state into Strapi sort strings
const sortMap = {
    byNameAZ: 'name:asc',
    byNameZA: 'name:desc',
    byTuitionLH: 'totalTuitionFee:asc',
    byAcceptance: 'avgAcceptanceRate:desc',
};

export default function MedicalListing() {
    // URL syncing hooks
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [mbbsData, setMbbsData] = useState<MedicalResponseType | null>(null);
    const [countryList, setCountryList] = useState<CountryMinType[] | null>(null);

    // Initialize state from URL Search Params
    const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('page')) || 1);
    const [countryFilter, setCountryFilter] = useState<string | null>(searchParams.get('countryID') || null);

    // Sort stays as local state only (not synced to URL per your preference)
    const [dataFilter, setDataFilter] = useState<'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byAcceptance'>('byNameAZ');

    const [isPending, startTransition] = useTransition();

    // Memoized filtered country data for the FilterBlock display
    const filteredData = useMemo(
        () => countryList?.find((c) => c.documentId === countryFilter) ?? null,
        [countryList, countryFilter],
    );

    // Centralized URL Update Logic
    const updateURL = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value);
                } else {
                    params.delete(key);
                }
            });

            replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [pathname, replace, searchParams],
    );

    // Body scroll lock for filter mobile overlay
    useEffect(() => {
        document.body.style.overflow = showFilter ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilter]);

    // Data fetching logic
    const fetchMbbsData = useCallback(
        async (signal: AbortSignal) => {
            setIsLoading(true);

            try {
                const queryObject: QueryObjectType = {
                    sort: [sortMap[dataFilter as keyof typeof sortMap]],
                    filters: countryFilter ? { location: { country: { documentId: { $eq: countryFilter } } } } : {},
                    populate: {
                        location: {
                            populate: {
                                country: { fields: ['name'] },
                            },
                        },
                        fmgePassingRecordByYear: true,
                        collegeMediaContent: {
                            populate: {
                                logo: true,
                                coverPhoto: true,
                            },
                        },
                    },
                    pagination: {
                        page: pageNum,
                        pageSize: 10,
                    },
                };

                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/mbbs?${queryString}`, { signal });

                if (!response.ok) throw new Error("Couldn't get mbbs colleges!");

                const parsedResponse = await response.json();
                if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

                setMbbsData(parsedResponse.response);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        [pageNum, countryFilter, dataFilter],
    );

    // Fetch triggering useEffect
    useEffect(() => {
        const controller = new AbortController();
        fetchMbbsData(controller.signal);
        return () => controller.abort();
    }, [fetchMbbsData]);

    // Initial Country Fetch
    useEffect(() => {
        const controller = new AbortController();
        const fetchCountryData = async () => {
            try {
                const queryObject: QueryObjectType = { fields: ['name'], populate: { countryFlag: true } };
                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/countries?${queryString}`, { signal: controller.signal });
                const parsedResponse = await response.json();
                if (parsedResponse.status === 'success') setCountryList(parsedResponse.response.data);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error(err);
            }
        };
        fetchCountryData();
        return () => controller.abort();
    }, []);

    // Interaction Handlers
    const handleCountryChange = (id: string | null) => {
        startTransition(() => {
            setCountryFilter(id);
            setPageNum(1);
            updateURL({ countryID: id, page: '1' });
        });
    };

    const handleSortChange = (sort: any) => {
        setDataFilter(sort);
        setPageNum(1);
        updateURL({ page: '1' });
    };

    const handlePageChange = (page: number) => {
        setPageNum(page);
        updateURL({ page: page.toString() });
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handleClearFilters = () => {
        startTransition(() => {
            setCountryFilter(null);
            setDataFilter('byNameAZ');
            setPageNum(1);
            updateURL({ countryID: null, page: '1' });
        });
    };

    // Initial Loading State
    if (isLoading && !mbbsData) {
        return (
            <div className="animate-in fade-in flex flex-col items-center justify-center py-40 duration-700">
                <SpinnerMini />
                <p className="mt-4 text-sm font-medium text-slate-400">Loading medical colleges...</p>
            </div>
        );
    }

    return (
        <>
            {showFilter && countryList && (
                <FilterOption
                    countryList={countryList}
                    countryFilter={countryFilter}
                    handleCountryChange={handleCountryChange}
                    setShowFilter={setShowFilter}
                />
            )}

            <FilterBlock
                setShowFilter={setShowFilter}
                filteredData={filteredData}
                handleCountryChange={handleCountryChange}
                dataFilter={dataFilter}
                handleSortChange={handleSortChange}
            />

            <section className="relative mt-8 min-h-100 w-full">
                {/* Smooth Overlay during fetch/transition */}
                {(isLoading || isPending) && mbbsData && (
                    <div className="absolute inset-0 z-20 flex items-start justify-center bg-white/40 pt-20 backdrop-blur-[2px]">
                        <SpinnerMini />
                    </div>
                )}

                {!isLoading && mbbsData && mbbsData.data.length > 0 ? (
                    <div
                        className={`transition-opacity duration-300 ${isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                    >
                        <div className="flex flex-col gap-6">
                            {mbbsData.data.map((singleMbbs) => (
                                <MedicalCard universityData={singleMbbs} key={singleMbbs.documentId} />
                            ))}
                        </div>

                        {mbbsData?.meta && (
                            <>
                                {/* <Pagination metaData={mbbsData.meta} pageNum={pageNum} setPageNum={handlePageChange} /> */}
                                <ModernPagination
                                    dataFor="Medical Colleges"
                                    metaData={mbbsData.meta}
                                    pageNum={pageNum}
                                    setPageNum={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    !isLoading &&
                    mbbsData && (
                        <div className="animate-in fade-in zoom-in py-32 text-center duration-300">
                            <p className="text-xl font-medium text-slate-400">No Medical University Found!</p>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="mt-2 cursor-pointer border-b-2 border-transparent py-0.5 text-blue-600 select-none hover:border-blue-600"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )
                )}
            </section>
        </>
    );
}
