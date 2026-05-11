/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// imports
import qs from 'qs';
import BlogGrid from './BlogGrid';
import { useEffect, useRef, useState } from 'react';
import ModernPagination from '../global/ModernPagination';
import SpinnerMini from '../global/SpinnerMini';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { BlogListResponseType } from '@/assets/types/blogTypes';

export default function BlogListing({
    initialBlogDataResponse,
}: {
    initialBlogDataResponse: BlogListResponseType | null;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filterCategory, setFilterCategory] = useState<
        'General' | 'University' | 'Country' | 'Course' | 'Exam' | 'MBBS' | null
    >(null);
    const [blogsDataResponse, setBlogsDataResponse] = useState<BlogListResponseType | null>(initialBlogDataResponse);
    const [pageNum, setPageNum] = useState<number>(1);

    const blogCategories = ['General', 'University', 'Country', 'Course', 'Exam', 'MBBS'] as const;

    // use ref for first render
    const isFirstRender = useRef(!!initialBlogDataResponse);

    // blogs data useEffect
    useEffect(() => {
        // check first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchBlogData = async () => {
            // loading state
            setIsLoading(true);

            try {
                const queryObject: QueryObjectType = {
                    sort: ['publishedAt:desc'],
                    // filter from state
                    filters: filterCategory ? { category: { $eq: filterCategory } } : {},
                    populate: {
                        blogCover: true,
                    },
                    pagination: {
                        page: pageNum,
                        pageSize: 10,
                    },
                };

                const queryString = qs.stringify(queryObject, {
                    encodeValuesOnly: true,
                });

                const response = await fetch(`/api/blogs?${queryString}`, { signal });
                if (!response.ok) {
                    throw new Error("couldn't get blogs data!");
                }

                const parsedResponse = await response.json();
                if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

                setBlogsDataResponse(parsedResponse.response);
            } catch (err: any) {
                // FIX: Silence the AbortError overlay
                if (err.name === 'AbortError') return;
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        // run the fetch function
        fetchBlogData();

        return () => controller.abort();
    }, [filterCategory, pageNum]);

    return (
        <section className="mt-14 max-w-7xl">
            {/* Category Tabs (static) */}
            <div className="mb-6 flex w-full flex-wrap gap-4 max-sm:gap-2.5">
                <button
                    type="button"
                    onClick={() => setFilterCategory(null)}
                    className={`focus-visible:ring-primary-base/60 relative cursor-pointer rounded-md border px-7 py-3 text-sm font-semibold tracking-wide transition select-none focus-visible:ring-2 focus-visible:outline-none max-sm:px-4 ${
                        filterCategory === null
                            ? 'border-primary-base bg-primary-base text-white shadow'
                            : 'hover:border-primary-base hover:text-primary-base border-slate-300 bg-white text-slate-800'
                    }`}
                >
                    All
                </button>
                {blogCategories.map((category, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setFilterCategory(category)}
                            className={`focus-visible:ring-primary-base/60 relative cursor-pointer rounded-md border px-7 py-3 text-sm font-semibold tracking-wide transition select-none focus-visible:ring-2 focus-visible:outline-none max-sm:px-4 ${
                                category === filterCategory
                                    ? 'border-primary-base bg-primary-base text-white shadow'
                                    : 'hover:border-primary-base hover:text-primary-base border-slate-300 bg-white text-slate-800'
                            }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            {isLoading ? (
                <div className="h-100 w-full">
                    <SpinnerMini />
                </div>
            ) : (
                <div className="mb-8">
                    {blogsDataResponse?.data.length ? (
                        <>
                            <BlogGrid blogDataList={blogsDataResponse.data} />
                            <ModernPagination dataFor="Blogs" metaData={blogsDataResponse.meta} pageNum={pageNum} setPageNum={setPageNum} />
                        </>
                    ) : (
                        <div className="h-60 w-full">
                            <div className="flex items-center justify-center rounded-lg border border-gray-400 px-2 py-4">
                                <p className="text-center">No blogs found</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
