'use client';

// imports
import { BlogType } from '@/assets/types/blogTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { formatDateToBlogStringDate } from '@/assets/utilities/helperFunction';
import Link from 'next/link';
import { useState } from 'react';
import { HiArrowRight, HiCalendar } from 'react-icons/hi2';

// inline components
function SingleBlog({
    blogData,
    active = false,
    handleClick,
}: {
    blogData: BlogType & StrapiDataType;
    active: boolean;
    handleClick: () => void;
}) {
    return (
        <div
            onClick={handleClick}
            className={`group flex cursor-pointer flex-col gap-2 rounded-md border-l-4 px-4 py-3 transition-colors duration-150 ${
                active
                    ? 'border-primary-base bg-primary-gray'
                    : 'hover:border-primary-base hover:bg-primary-gray border-transparent'
            }`}
        >
            <div>
                <p
                    className={`group-hover:text-primary-base line-clamp-2 text-sm leading-snug font-medium text-slate-800 ${active ? 'text-primary-base' : ''}`}
                >
                    {blogData.blogTitle.length >= 64 ? `${blogData.blogTitle.slice(0, 60)}...` : blogData.blogTitle}
                </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                <span>{formatDateToBlogStringDate(blogData.publishedAt)}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                {/* sub category */}
                <span className="text-primary-base">{blogData.category}</span>
            </div>
        </div>
    );
}

function BlogDisplay({ blogData }: { blogData: BlogType & StrapiDataType }) {
    return (
        <div
            className="relative flex h-130 items-end overflow-hidden rounded-xl bg-cover bg-center md:col-span-8"
            style={{
                backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${blogData.blogCover.formats?.medium?.url})`,
            }}
        >
            {/* overlay */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

            {/* badge */}
            <div className="absolute top-4 left-4">
                <p className="bg-primary-base inline-block rounded-md px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase shadow">
                    Latest
                </p>
            </div>

            {/* content */}
            <div className="relative z-10 flex w-full flex-col gap-5 p-4 text-white md:p-8">
                <div className="max-w-3xl">
                    <h4 className="text-xl leading-snug font-bold tracking-wide md:text-[32px] md:leading-[1.15]">
                        {blogData.blogTitle.length >= 64 ? `${blogData.blogTitle.slice(0, 60)}...` : blogData.blogTitle}
                    </h4>
                </div>
                <div className="w-full rounded-md bg-white/10 p-3 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium tracking-wide md:text-xs">
                        {/* published date */}
                        <span className="flex items-center gap-1">
                            <HiCalendar className="h-4 w-4 text-white/80" />
                            {formatDateToBlogStringDate(blogData.publishedAt)}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {/* author */}
                        <span className="capitalize">{blogData.authorName}</span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        {/* comments placeholder */}
                        {/* <span>20 Comments</span> */}
                        {/* sub category */}
                        <span className="text-primary-lighter">{blogData.category}</span>
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span className="text-primary-lighter">{blogData.subCategory}</span>
                    </div>
                </div>
                <div className="max-w-2xl space-y-5">
                    {/* <p className="line-clamp-2 text-sm leading-relaxed font-medium text-white/80 md:text-base md:leading-relaxed">
                        Do you know that the best part about the UK education
                        system is that it provides international students...
                    </p> */}
                    <div>
                        <Link
                            target="_blank"
                            href={`/blogs/${blogData.documentId}`}
                            className="text-primary-base hover:bg-primary-base inline-flex items-center gap-2 rounded-md bg-white px-5 py-2 text-sm font-semibold shadow-sm transition hover:text-white"
                        >
                            Read Blog
                            <HiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// blog interact section
export default function BlogInteract({ newestBlogs }: { newestBlogs: (BlogType & StrapiDataType)[] }) {
    const [selectedBlogIndex, setSelectedBlogIndex] = useState<number>(0);

    // useEffect for blog list data
    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;

    //     const fetchBlogData = async () => {
    //         // loading state
    //         setIsLoading(true);

    //         try {
    //             const queryObject: QueryObjectType = {
    //                 sort: ['publishedAt:desc'],
    //                 populate: {
    //                     blogContents: true,
    //                     blogCover: true,
    //                 },
    //                 pagination: {
    //                     page: 1,
    //                     pageSize: 10,
    //                 },
    //             };

    //             const queryString = qs.stringify(queryObject, {
    //                 encodeValuesOnly: true,
    //             });

    //             const response = await fetch(`/api/blogs?${queryString}`, { signal });
    //             if (!response.ok) {
    //                 throw new Error("couldn't get blogs data!");
    //             }

    //             const parsedResponse = await response.json();
    //             if (parsedResponse.status === 'error') throw new Error('Unsuccessful response');

    //             setBlogListResponse(parsedResponse.response.data);
    //         } catch (err: any) {
    //             // FIX: Silence the AbortError overlay
    //             if (err.name === 'AbortError') return;
    //             console.error(err);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     // run the fetch function
    //     fetchBlogData();

    //     return () => controller.abort();
    // }, []);

    return (
        <section className="mt-4 grid max-w-7xl gap-6 md:grid-cols-12">
            {/* blog list */}
            <div className="md:col-span-4">
                {/* Equal-height wrapper with internal scroll */}
                <div className="flex min-h-0 flex-col rounded-xl md:h-130">
                    <div className="mb-3">
                        <h4 className="bg-primary-base/10 text-primary-base rounded-md px-4 py-2 text-sm font-semibold tracking-wide uppercase">
                            Newest
                        </h4>
                    </div>
                    <div className="thin-scrollbar flex-1 space-y-0.5 overflow-y-auto pr-2">
                        {newestBlogs.map((blogData, index) => {
                            return (
                                <SingleBlog
                                    key={index}
                                    blogData={blogData}
                                    active={index === selectedBlogIndex}
                                    handleClick={() => setSelectedBlogIndex(index)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* latest blog cover */}
            <BlogDisplay blogData={newestBlogs[selectedBlogIndex]} />
        </section>
    );
}
