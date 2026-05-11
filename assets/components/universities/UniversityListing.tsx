/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// imports
import qs from 'qs';
import { CountryMinType } from '@/assets/types/countryTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { UniversityResponseType } from '@/assets/types/universityTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import ModernPagination from '../global/ModernPagination';
import SpinnerMini from '../global/SpinnerMini';
import FilterBlock from './FilterBlock';
import FilterOption from './FilterOption';
import UniversityCard from './UniversityCard';

// constant data
// Define how to translate state into Strapi sort strings
const sortMap = {
    byNameAZ: 'name:asc',
    byNameZA: 'name:desc',
    byTuitionLH: 'avgTuitionFee.minimum:asc', // Nested field sorting
    byStudentLH: 'avgNumOfForeginStudents:asc',
};

export default function UniversityListing() {
    // url syncing
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [universityData, setUniversityData] = useState<UniversityResponseType | null>(null);
    const [countryList, setCountryList] = useState<CountryMinType[] | null>(null);

    // update to url sync
    const [pageNum, setPageNum] = useState<number>(Number(searchParams.get('page')) || 1);
    const [countryFilter, setCountryFilter] = useState<string | null>(searchParams.get('countryID') || null);
    const [dataFilter, setDataFilter] = useState<'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byStudentLH'>('byNameAZ');

    // using transition for smoother ui updates
    const [isPending, startTransition] = useTransition();

    // static filtered data
    const filteredData = useMemo(
        () => countryList?.find((c) => c.documentId === countryFilter) ?? null,
        [countryList, countryFilter],
    );

    // update url
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

    // use effect for body scroll lock
    useEffect(() => {
        document.body.style.overflow = showFilter ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilter]);

    // optimized fetch with abort controller
    const fetchUniversityData = useCallback(
        async (signal: AbortSignal) => {
            setIsLoading(true);

            try {
                const queryObject: QueryObjectType = {
                    // Apply the sort here
                    sort: [sortMap[dataFilter as keyof typeof sortMap]],
                    filters: countryFilter ? { location: { country: { documentId: { $eq: countryFilter } } } } : {},
                    populate: {
                        location: { populate: { country: { fields: ['name'] } } },
                        avgTuitionFee: true,
                        universityMediaContent: { populate: { logo: true, coverPhoto: true } },
                    },
                    pagination: { page: pageNum, pageSize: 10 },
                };

                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/universities?${queryString}`, { signal });

                if (!response.ok) throw new Error('Fetch failed');
                const parsedResponse = await response.json();
                if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

                setUniversityData(parsedResponse.response);
            } catch (err: any) {
                // FIX: Silence the AbortError overlay
                if (err.name === 'AbortError') return;
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },
        [pageNum, countryFilter, dataFilter],
    );

    // data fetching useEffect
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // calling the fetch function
        fetchUniversityData(signal);

        // clean up function
        return () => controller.abort();
    }, [fetchUniversityData]);

    // Reset to page 1 whenever country or sort changes
    // useEffect(() => {
    //     setPageNum(1);
    // }, [countryFilter, dataFilter]);

    // handle change countries
    const handleCountryChange = (id: string | null) => {
        startTransition(() => {
            setCountryFilter(id);
            setPageNum(1);
            updateURL({ countryID: id, page: '1' });
        });
    };

    const handleSortChange = (sort: 'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byStudentLH') => {
        setDataFilter(sort);
        setPageNum(1);
        updateURL({ page: '1' });
    };

    const handlePageChange = (page: number) => {
        setPageNum(page);
        updateURL({ page: page.toString() });
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = showFilter ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilter]);

    // Fetch Countries (Initial load only)
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

    // 2. Helper to wrap state changes in transition
    const handleClearFilters = () => {
        startTransition(() => {
            setCountryFilter(null);
            setDataFilter('byNameAZ');
            setPageNum(1);
            updateURL({ countryID: null, page: null });
        });
    };

    // secure loading state
    if (isLoading && !universityData) {
        return (
            <div className="animate-in fade-in flex flex-col items-center justify-center py-40 duration-700">
                <SpinnerMini />
                <p className="mt-4 text-sm font-medium text-slate-400">Loading universities...</p>
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

            <section className="relative mt-8 min-h-150 w-full">
                {/* 3. Using isPending OR isLoading for the Overlay during updates */}
                {(isLoading || isPending) && universityData && (
                    <div className="absolute inset-0 z-20 flex items-start justify-center bg-white/40 pt-20 backdrop-blur-[2px]">
                        <SpinnerMini />
                    </div>
                )}

                {!isLoading && universityData && universityData.data.length > 0 ? (
                    <div
                        className={`transition-opacity duration-300 ${isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                    >
                        <div className="flex flex-col gap-6">
                            {universityData.data.map((uni) => (
                                <UniversityCard singleUniversity={uni} key={uni.documentId} />
                            ))}
                        </div>
                        {universityData.meta && (
                            <>
                                {/* <Pagination
                                    metaData={universityData.meta}
                                    pageNum={pageNum}
                                    setPageNum={handlePageChange}
                                /> */}
                                <ModernPagination
                                    dataFor="Universities"
                                    metaData={universityData.meta}
                                    pageNum={pageNum}
                                    setPageNum={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    !isLoading &&
                    universityData && (
                        <div className="animate-in fade-in zoom-in py-32 text-center duration-300">
                            <p className="text-xl font-medium text-slate-400">No Universities Found!</p>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="mt-2 cursor-pointer text-blue-600 hover:underline"
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
