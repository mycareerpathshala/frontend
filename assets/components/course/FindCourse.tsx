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
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import CourseCard from './CourseCard';
import FilterBlock from './FilterBlock';
import FilterOption from './FilterOption';
import SpinnerMini from '../global/SpinnerMini';
import ModernPagination from '../global/ModernPagination';

export default function FindCourse({
    countryDataResponse,
    streamDataResponse,
}: {
    countryDataResponse: CountryListResponseType;
    streamDataResponse: StreamListResponseType;
}) {
    const { session } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [courseDataListResponse, setCourseDataListResponse] = useState<CourseListResponseType | null>(null);

    // navigation hooks
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // UI-only state (modal open/close — no reason to put this in the URL)
    const [showFilter, setShowFilter] = useState<boolean>(false);

    // all filter state is derived from the URL — no useState needed
    const countryFilter = searchParams.get('countryFilter');
    const streamFilter = searchParams.get('streamFilter');
    const levelFilter = searchParams.get('levelFilter') as 'Undergraduate' | 'Postgraduate' | null;
    const deliveryMethodFilter = searchParams.get('deliveryMethodFilter') as 'On-Campus' | 'Online' | 'Blended' | null;
    const studyLanguageFilter = searchParams.get('studyLanguageFilter');
    const courseOfferingFilter = searchParams.get('courseOfferingFilter') as 'Full-Time' | 'Part-Time' | null;
    const pageNum = Number(searchParams.get('page') ?? '1');

    // transition hook
    const [isPending, startTransition] = useTransition();

    // central function to write any filter update back to the URL in one router.push
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

            // page 1 = no param in URL (keeps the URL clean)
            if (resetPage) params.delete('page');

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [searchParams, router, pathname],
    );

    // full filter list
    const activeFilters = useMemo(() => {
        const active = [];

        // 1) country filter
        if (countryFilter) {
            const country = countryDataResponse.data.find((c) => c.documentId === countryFilter);
            active.push({
                key: 'countryFilter',
                label: 'Country',
                value: country?.name || 'Selected',
            });
        }

        // 2) stream filter
        if (streamFilter) {
            const stream = streamDataResponse.data.find((s) => s.documentId === streamFilter);
            active.push({
                key: 'streamFilter',
                label: 'Stream',
                value: stream?.name || 'Selected',
            });
        }

        // 3) level filter
        if (levelFilter) {
            active.push({ key: 'levelFilter', label: 'Course Level', value: levelFilter });
        }

        // 4) delivery method filter
        if (deliveryMethodFilter) {
            active.push({ key: 'deliveryMethodFilter', label: 'Delivery Method', value: deliveryMethodFilter });
        }

        // 5) study language filter
        if (studyLanguageFilter) {
            active.push({ key: 'studyLanguageFilter', label: 'Language', value: studyLanguageFilter });
        }

        // 6) course offering filter
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

    // key === the URL param name, so we can remove it directly with no mapping
    const removeFilter = useCallback(
        (key: string) => {
            startTransition(() => {
                updateParams({ [key]: null });
            });
        },
        [updateParams],
    );

    // body scroll lock
    useEffect(() => {
        document.body.style.overflow = showFilter ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showFilter]);

    // get courses useEffect — searchParams as the single dependency covers all filters + page
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchCourseData = async () => {
            // loading state
            setIsLoading(true);

            try {
                const dynamicFilters = {
                    // Country: Nested deep into the University relation
                    ...(countryFilter && {
                        university: {
                            location: {
                                country: {
                                    documentId: { $eq: countryFilter },
                                },
                            },
                        },
                    }),

                    // Stream: Filter by the Course's stream
                    ...(streamFilter && {
                        stream: {
                            documentId: { $eq: streamFilter },
                        },
                    }),

                    // Level: Undergraduate or Postgraduate
                    ...(levelFilter && {
                        courseLevel: { $eq: levelFilter },
                    }),

                    // Delivery Method: On-Campus, Online, etc.
                    ...(deliveryMethodFilter && {
                        deliveryMethod: { $eq: deliveryMethodFilter },
                    }),

                    // Study Language: e.g., English, Arabic, etc.
                    ...(studyLanguageFilter && {
                        teachingLanguage: { $eq: studyLanguageFilter },
                    }),

                    // Course Offering: Full-Time or Part-Time
                    ...(courseOfferingFilter && {
                        courseOfferings: { $eq: courseOfferingFilter },
                    }),
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
                                        country: {
                                            fields: ['id', 'documentId', 'name'],
                                        },
                                    },
                                },
                                universityMediaContent: {
                                    populate: {
                                        logo: true,
                                        coverPhoto: true,
                                    },
                                },
                            },
                        },
                    },
                    pagination: {
                        page: pageNum,
                        pageSize: 12,
                    },
                };

                const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
                const response = await fetch(`/api/courses?${queryString}`, { signal });

                if (!response.ok) throw new Error('Fetch failed');
                const parsedResponse: { status: 'success' | 'error'; response: CourseListResponseType } =
                    await response.json();
                if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

                setCourseDataListResponse(parsedResponse.response);
            } catch (err: any) {
                // FIX: Silence the AbortError overlay
                if (err.name === 'AbortError') return;
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

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

    // Resolve human-readable names from the active filter chips for display + auto-naming
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

    return (
        <>
            {/* filter options */}
            {showFilter && (
                <FilterOption
                    countryList={countryDataResponse.data}
                    streamList={streamDataResponse.data}
                    setShowFilter={setShowFilter}
                    // current filter values (to initialise local state inside the modal)
                    countryFilter={countryFilter}
                    streamFilter={streamFilter}
                    levelFilter={levelFilter}
                    deliveryMethodFilter={deliveryMethodFilter}
                    studyLanguageFilter={studyLanguageFilter}
                    courseOfferingFilter={courseOfferingFilter}
                    // single batched callback — avoids 6 separate router.push calls
                    onApply={(filters: FilterOptionApplyPayload) => updateParams(filters)}
                />
            )}

            {/* filter block */}
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
                {/* loader overlay */}
                {isLoading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                        <SpinnerMini />
                    </div>
                )}

                {courseDataListResponse && courseDataListResponse.data.length > 0 ? (
                    <div
                        className={`transition-all duration-300 ${isLoading ? 'pointer-events-none opacity-30' : 'opacity-100'}`}
                    >
                        <div className="mt-8 grid grid-cols-3 flex-col gap-4 max-xl:gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                            {courseDataListResponse.data.map((courseData) => {
                                return <CourseCard key={courseData.documentId} courseData={courseData} />;
                            })}
                        </div>

                        {/* pagination inside the dimmed wrapper */}
                        {courseDataListResponse.meta && (
                            <ModernPagination
                                dataFor="Courses"
                                metaData={courseDataListResponse.meta}
                                pageNum={pageNum}
                                setPageNum={(newPage: number) => {
                                    updateParams({ page: String(newPage) }, false);
                                    window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                            />
                        )}
                    </div>
                ) : (
                    !isLoading &&
                    courseDataListResponse !== null && (
                        <div>
                            <div className="py-32 text-center">
                                <p className="text-xl font-medium text-slate-400">No Universities Found!</p>
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
                        </div>
                    )
                )}
            </section>
        </>
    );
}
