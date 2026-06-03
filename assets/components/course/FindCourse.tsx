/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// imports
import { useAppContext } from '@/assets/context/AppContext';
import { autoPreferenceName } from '@/assets/lib/preferences';
import { CountryListResponseType } from '@/assets/types/countryTypes';
import { CourseListResponseType } from '@/assets/types/courseTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { StreamListResponseType } from '@/assets/types/streamTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FilterOptionApplyPayload } from './FilterOption';
import qs from 'qs';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import CourseCard from './CourseCard';
import FilterBlock from './FilterBlock';
import FilterOption from './FilterOption';
import SpinnerMini from '../global/SpinnerMini';

type CourseItem = CourseListResponseType['data'][number];

export default function FindCourse({
    countryDataResponse,
    streamDataResponse,
}: {
    countryDataResponse: CountryListResponseType;
    streamDataResponse: StreamListResponseType;
}) {
    const { session } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [items, setItems] = useState<CourseItem[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const sentinelRef = useRef<HTMLDivElement>(null);

    // All filter state derived from URL (page excluded)
    const countryFilter = searchParams.get('countryFilter');
    const streamFilter = searchParams.get('streamFilter');
    const levelFilter = searchParams.get('levelFilter') as 'Undergraduate' | 'Postgraduate' | 'PhD / Doctorate' | 'Diploma / Certificate' | 'Foundation / Pathway' | 'Vocational Training' | 'Language Course' | null;
    const deliveryMethodFilter = searchParams.get('deliveryMethodFilter') as 'On-Campus' | 'Online' | 'Blended' | null;
    const studyLanguageFilter = searchParams.get('studyLanguageFilter');
    const courseOfferingFilter = searchParams.get('courseOfferingFilter') as 'Full-Time' | 'Part-Time' | null;

    // Stable string representing active filters (excludes page) — used to detect filter changes
    const filterKey = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        return params.toString();
    }, [searchParams]);

    // Reset page and items when filters change
    useEffect(() => {
        setPage(1);
    }, [filterKey]);

    const updateParams = useCallback(
        (updates: Record<string, string | null>, resetPage = true) => {
            const params = new URLSearchParams(searchParams.toString());

            for (const [key, value] of Object.entries(updates)) {
                if (value === null) {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            }

            if (resetPage) params.delete('page');

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname],
    );

    const activeFilters = useMemo(() => {
        const active = [];

        if (countryFilter) {
            const country = countryDataResponse.data.find((c) => c.documentId === countryFilter);
            active.push({ key: 'countryFilter', label: 'Country', value: country?.name || 'Selected' });
        }
        if (streamFilter) {
            const stream = streamDataResponse.data.find((s) => s.documentId === streamFilter);
            active.push({ key: 'streamFilter', label: 'Stream', value: stream?.name || 'Selected' });
        }
        if (levelFilter) {
            active.push({ key: 'levelFilter', label: 'Course Level', value: levelFilter });
        }
        if (deliveryMethodFilter) {
            active.push({ key: 'deliveryMethodFilter', label: 'Delivery Method', value: deliveryMethodFilter });
        }
        if (studyLanguageFilter) {
            active.push({ key: 'studyLanguageFilter', label: 'Language', value: studyLanguageFilter });
        }
        if (courseOfferingFilter) {
            active.push({ key: 'courseOfferingFilter', label: 'Course Offering', value: courseOfferingFilter });
        }

        return active;
    }, [
        countryFilter,
        countryDataResponse.data,
        streamFilter,
        streamDataResponse.data,
        levelFilter,
        deliveryMethodFilter,
        studyLanguageFilter,
        courseOfferingFilter,
    ]);

    const removeFilter = useCallback(
        (key: string) => {
            startTransition(() => {
                updateParams({ [key]: null });
            });
        },
        [updateParams],
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

        const fetchCourseData = async () => {
            if (page === 1) setIsLoading(true);
            else setIsLoadingMore(true);

            try {
                const dynamicFilters = {
                    ...(countryFilter && {
                        university: {
                            location: { country: { documentId: { $eq: countryFilter } } },
                        },
                    }),
                    ...(streamFilter && { stream: { documentId: { $eq: streamFilter } } }),
                    ...(levelFilter && { courseLevel: { $eq: levelFilter } }),
                    ...(deliveryMethodFilter && { deliveryMethod: { $eq: deliveryMethodFilter } }),
                    ...(studyLanguageFilter && { teachingLanguage: { $eq: studyLanguageFilter } }),
                    ...(courseOfferingFilter && { courseOfferings: { $eq: courseOfferingFilter } }),
                };

                const queryObject: QueryObjectType = {
                    filters: dynamicFilters,
                    populate: {
                        tuitionFeeByYear: true,
                        university: {
                            fields: ['id', 'documentId', 'name'],
                            populate: {
                                applicationDateList: true,
                                location: {
                                    populate: {
                                        country: { fields: ['id', 'documentId', 'name'] },
                                    },
                                },
                                universityMediaContent: {
                                    populate: { logo: true, coverPhoto: true },
                                },
                            },
                        },
                    },
                    pagination: { page, pageSize: 12 },
                };

                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/courses?${queryString}`, { signal });

                if (!response.ok) throw new Error('Fetch failed');
                const parsedResponse: { status: 'success' | 'error'; response: CourseListResponseType } =
                    await response.json();
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

        fetchCourseData();
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filterKey]);

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

    const clearAllFilters = () => {
        startTransition(() => {
            updateParams({
                countryFilter: null,
                streamFilter: null,
                levelFilter: null,
                deliveryMethodFilter: null,
                studyLanguageFilter: null,
                courseOfferingFilter: null,
            });
        });
    };

    const countryName = activeFilters.find((f) => f.key === 'countryFilter')?.value ?? null;
    const streamName = activeFilters.find((f) => f.key === 'streamFilter')?.value ?? null;

    const handleSaveChoice = useCallback(
        async (name: string): Promise<boolean> => {
            if (!session?.userId) return false;
            try {
                const res = await fetch('/api/user/preferences', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        countryFilter,
                        countryName,
                        streamFilter,
                        streamName,
                        levelFilter,
                        deliveryMethodFilter,
                        studyLanguageFilter,
                        courseOfferingFilter,
                    }),
                });
                return res.ok;
            } catch {
                return false;
            }
        },
        [
            session,
            countryFilter,
            countryName,
            streamFilter,
            streamName,
            levelFilter,
            deliveryMethodFilter,
            studyLanguageFilter,
            courseOfferingFilter,
        ],
    );

    if (isLoading && items.length === 0) {
        return (
            <div className="animate-in fade-in flex flex-col items-center justify-center py-40 duration-700">
                <SpinnerMini />
                <p className="mt-4 text-sm font-medium text-slate-400">Loading courses...</p>
            </div>
        );
    }

    return (
        <>
            {showFilter && (
                <FilterOption
                    countryList={countryDataResponse.data}
                    streamList={streamDataResponse.data}
                    setShowFilter={setShowFilter}
                    countryFilter={countryFilter}
                    streamFilter={streamFilter}
                    levelFilter={levelFilter}
                    deliveryMethodFilter={deliveryMethodFilter}
                    studyLanguageFilter={studyLanguageFilter}
                    courseOfferingFilter={courseOfferingFilter}
                    onApply={(filters: FilterOptionApplyPayload) => updateParams(filters)}
                />
            )}

            <FilterBlock
                setShowFilter={setShowFilter}
                clearAllFilters={clearAllFilters}
                activeFilters={activeFilters}
                isPending={isPending}
                removeFilter={removeFilter}
                onSaveChoice={
                    session
                        ? handleSaveChoice
                        : async () => {
                              router.push('/auth/login');
                              return false;
                          }
                }
                defaultSaveName={autoPreferenceName(countryName, streamName, levelFilter)}
            />

            <section className="relative mt-8 min-h-80 w-full">
                {/* Overlay when filter changes while items are visible */}
                {isLoading && items.length > 0 && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                        <SpinnerMini />
                    </div>
                )}

                {items.length > 0 ? (
                    <div
                        className={`transition-all duration-300 ${isLoading ? 'pointer-events-none opacity-30' : 'opacity-100'}`}
                    >
                        <div className="mt-8 grid grid-cols-3 flex-col gap-4 max-xl:gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                            {items.map((courseData) => (
                                <CourseCard key={courseData.documentId} courseData={courseData} />
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
                            <p className="py-8 text-center text-sm text-slate-400">All courses loaded</p>
                        )}
                    </div>
                ) : (
                    !isLoading && (
                        <div className="py-32 text-center">
                            <p className="text-xl font-medium text-slate-400">No Courses Found!</p>
                            <button
                                type="button"
                                onClick={() => {
                                    updateParams({
                                        countryFilter: null,
                                        streamFilter: null,
                                    });
                                }}
                                className="mt-2 cursor-pointer border-b-2 border-transparent py-0.5 text-blue-600 select-none hover:border-blue-600"
                            >
                                Clear filters
                            </button>
                        </div>
                    )
                )}
            </section>
        </>
    );
}
