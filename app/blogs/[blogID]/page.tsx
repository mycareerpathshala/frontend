/* eslint-disable @next/next/no-img-element */
// imports

import MarkViewerBlog from '@/assets/components/blogs/MarkViewBlog';
import { getBlogsData, getSingleBlogData } from '@/assets/lib/cms/fetchBlog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HiCalendarDays, HiClock, HiUser } from 'react-icons/hi2';

export async function generateMetadata({ params }: { params: Promise<{ blogID: string }> }): Promise<Metadata> {
    const { blogID } = await params;
    const res = await getSingleBlogData(blogID, { fields: ['blogTitle', 'authorName', 'category'], populate: { blogCover: true } }, true);
    if (!res?.data) return { title: 'Blog' };
    const { data } = res;
    const description = `${data.category} article${data.authorName ? ` by ${data.authorName}` : ''} on My Career Pathshala.`;
    const ogImage = data.blogCover?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.blogCover.url}` : undefined;
    return {
        title: data.blogTitle,
        description,
        openGraph: {
            title: data.blogTitle,
            description,
            type: 'article',
            ...(ogImage && { images: [{ url: ogImage }] }),
        },
        twitter: {
            card: ogImage ? 'summary_large_image' : 'summary',
            title: data.blogTitle,
            description,
            ...(ogImage && { images: [ogImage] }),
        },
    };
}

export async function generateStaticParams() {
    const blogsResponse = await getBlogsData({ fields: ['documentId'] }, true);

    if (!blogsResponse) return [];

    return blogsResponse.data.map((blog) => ({
        blogID: blog.documentId,
    }));
}

export default async function SingleBlogPage({ params }: { params: Promise<{ blogID: string }> }) {
    const { blogID } = await params;

    const blogDataResponse = await getSingleBlogData(
        blogID,
        {
            populate: {
                blogCover: true,
            },
        },
        true,
    );

    if (!blogDataResponse) {
        notFound();
    }

    const { data: blogData } = blogDataResponse;

    // published date
    const { publishedAt } = blogData;
    const date = new Date(publishedAt);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    return (
        <main className="mt-8 px-4">
            <section className="mx-auto w-full max-w-5xl">
                <div>
                    <p className="text-secondary-base text-sm font-bold tracking-widest uppercase max-sm:text-xs">
                        {blogData.category}
                    </p>
                </div>
                <h1 className="mt-3 text-5xl leading-tight font-bold max-lg:text-4xl max-sm:mt-2 max-sm:text-3xl">
                    {blogData.blogTitle}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600 max-sm:mt-4 max-sm:text-xs">
                    {blogData?.authorName && (
                        <>
                            <span className="flex items-center justify-start gap-2">
                                <HiUser className="size-4 text-slate-500" />
                                <span className="font-medium text-slate-800">{blogData.authorName}</span>
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                        </>
                    )}

                    {blogData?.timeRequiredToRead && (
                        <>
                            <span className="inline-flex items-center gap-2">
                                <HiClock className="size-4 text-slate-500" />
                                <span>{blogData.timeRequiredToRead} mins read</span>
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                        </>
                    )}

                    <span className="inline-flex items-center gap-2">
                        <HiCalendarDays className="size-4 text-slate-500" />
                        <span>{formattedDate}</span>
                    </span>
                </div>
            </section>

            {/* cover image */}
            <section className="mx-auto mt-8 w-full max-w-5xl max-sm:mt-4">
                <div className="relative h-145 w-full max-lg:h-90 max-sm:h-65">
                    <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blogData.blogCover.formats?.medium?.url ? blogData.blogCover.formats.medium.url : '/img/blog/blog_cover_fallback.jpg'}`}
                        alt="Blog Cover Image"
                        className="absolute inset-0 h-full w-full rounded-xl object-cover"
                    />
                </div>
            </section>

            {/* content */}
            <section className="mx-auto mt-10 w-full max-w-5xl">
                {blogData.blogContent ? (
                    <MarkViewerBlog content={blogData.blogContent} />
                ) : (
                    <div>
                        <p>No Content Found</p>
                    </div>
                )}
            </section>
        </main>
    );
}
