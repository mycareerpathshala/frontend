/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CountryMinType } from '@/assets/types/countryTypes';
import { MedicalResponseType } from '@/assets/types/mbbsTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import SpinnerMini from '../global/SpinnerMini';
import FilterBlock from './FilterBlock';
import FilterOption from './FilterOption';
import MedicalCard from './MedicalCard';

const sortMap = {
    byNameAZ: 'name:asc',
    byNameZA: 'name:desc',
    byTuitionLH: 'totalTuitionFee:asc',
    byAcceptance: 'avgAcceptanceRate:desc',
};

type MedicalItem = MedicalResponseType['data'][number];

export default function MedicalListing() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [items, setItems] = useState<MedicalItem[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [countryList, setCountryList] = useState<CountryMinType[] | null>(null);

    const [page, setPage] = useState<number>(1);
    const [countryFilter, setCountryFilter] = useState<string | null>(searchParams.get('countryID') || null);
    const [dataFilter, setDataFilter] = useState<'byNameAZ' | 'byNameZA' | 'byTuitionLH' | 'byAcceptance'>('byNameAZ');

    const [, startTransition] = useTransition();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const filteredData = useMemo(
        () => countryList?.find((c) => c.documentId === countryFilter) ?? null,
        [countryList, countryFilter],
    );

    const updateURL = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('page');

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

    useEffect(() => {
        document.body.style.overflow = showFilter ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilter]);

    // Fetch: replace on page 1, append on subsequent pages
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchMbbsData = async () => {
            if (page === 1) setIsLoading(true);
            else setIsLoadingMore(true);

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
                        page,
                        pageSize: 10,
                    },
                };

                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/mbbs?${queryString}`, { signal });

                if (!response.ok) throw new Error("Couldn't get mbbs colleges!");
                const parsedResponse = await response.json();
                if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

                const { data, meta } = parsedResponse.response;

                if (page === 1) {
                    setItems(data);
                } else {
                    setItems((prev) => [...prev, ...data]);
                }
                setHasMore(meta.pagination.page < meta.pagination.pageCount);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                console.error(err);
            } finally {
                if (page === 1) setIsLoading(false);
                else setIsLoadingMore(false);
            }
        };

        fetchMbbsData();
        return () => controller.abort();
    }, [page, countryFilter, dataFilter]);

    // IntersectionObserver — triggers next page load when sentinel enters viewport
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: '200px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, isLoading, isLoadingMore, items.length]);

    // Initial country list fetch
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

    const handleCountryChange = (id: string | null) => {
        startTransition(() => {
            setCountryFilter(id);
            setPage(1);
            updateURL({ countryID: id });
        });
    };

    const handleSortChange = (sort: any) => {
        setDataFilter(sort);
        setPage(1);
    };

    const handleClearFilters = () => {
        startTransition(() => {
            setCountryFilter(null);
            setDataFilter('byNameAZ');
            setPage(1);
            updateURL({ countryID: null });
        });
    };

    if (isLoading && items.length === 0) {
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
                {/* Overlay when filter changes while items are visible */}
                {isLoading && items.length > 0 && (
                    <div className="absolute inset-0 z-20 flex items-start justify-center bg-white/40 pt-20 backdrop-blur-[2px]">
                        <SpinnerMini />
                    </div>
                )}

                {items.length > 0 ? (
                    <div
                        className={`transition-opacity duration-300 ${isLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
                    >
                        <div className="flex flex-col gap-6">
                            {items.map((singleMbbs) => (
                                <MedicalCard universityData={singleMbbs} key={singleMbbs.documentId} />
                            ))}
                        </div>

                        {/* Sentinel triggers IntersectionObserver for next page */}
                        <div ref={sentinelRef} className="h-2" />

                        {isLoadingMore && (
                            <div className="flex justify-center py-8">
                                <SpinnerMini />
                            </div>
                        )}

                        {!hasMore && !isLoadingMore && !isLoading && (
                            <p className="py-8 text-center text-sm text-slate-400">All medical colleges loaded</p>
                        )}
                    </div>
                ) : (
                    !isLoading && (
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
