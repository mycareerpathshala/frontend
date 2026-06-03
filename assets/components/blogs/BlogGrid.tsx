/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import { BlogType } from '@/assets/types/blogTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { formatDateToBlogStringDate } from '@/assets/utilities/helperFunction';

// local components
function BlogCard({ blogData }: { blogData: BlogType & StrapiDataType }) {
    return (
        <a
            href={`/blogs/${blogData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:bg-primary-gray/50 flex gap-4 rounded-lg p-2 no-underline transition"
        >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-200">
                <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blogData.blogCover.formats?.small?.url}`}
                    alt="Blog thumbnail"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        {blogData.category}
                    </span>
                    <span className="bg-primary-lighter/60 text-primary-base rounded-sm px-2 py-0.5 text-[11px] font-medium">
                        {blogData.subCategory}
                    </span>
                </div>
                <h5 className="group-hover:text-primary-base line-clamp-2 text-sm leading-snug font-semibold text-slate-900">
                    {blogData.blogTitle}
                </h5>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500">
                    <span>{formatDateToBlogStringDate(blogData.publishedAt)}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-primary-base group-hover:underline">{blogData.authorName}</span>
                </div>
            </div>
        </a>
    );
}

export default function BlogGrid({ blogDataList }: { blogDataList: (BlogType & StrapiDataType)[] }) {
    return (
        <div>
            {/* Blog Grid (2 columns md+) */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {blogDataList.map((blogData, idx) => (
                    <BlogCard key={idx} blogData={blogData} />
                ))}
            </div>
        </div>
    );
}
