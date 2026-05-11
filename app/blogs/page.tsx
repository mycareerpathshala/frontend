// imports
import { Metadata } from 'next';
import BlogInteract from '@/assets/components/blogs/BlogInteract';

export const metadata: Metadata = {
    title: 'Study Abroad Blog — Tips, Guides & News',
    description: 'Read expert articles on studying abroad, university admissions, MBBS colleges, scholarships, visa guidance, and career planning. Stay informed with My Career Pathshala.',
    openGraph: {
        title: 'Study Abroad Blog — Tips, Guides & News | My Career Pathshala',
        description: 'Expert articles on studying abroad, university admissions, MBBS colleges, and career planning.',
        type: 'website',
    },
};
import BlogListing from '@/assets/components/blogs/BlogListing';
import Breadcrumb from '@/assets/components/global/Breadcrumb';
import { getBlogsData } from '@/assets/lib/cms/fetchBlog';

export default async function BlogPage() {
    const queryObject = {
        sort: ['publishedAt:desc'],
        populate: {
            blogCover: true,
        },
        pagination: {
            page: 1,
            pageSize: 10,
        },
    };
    const blogListResponse = await getBlogsData(queryObject, true);

    if (!blogListResponse) {
        return (
            <main className="mx-auto w-full max-w-7xl px-4 py-2">
                <section className="mx-auto max-w-7xl">
                    <Breadcrumb crumblist={[{ level: 1, label: 'Blogs', url: '/blogs' }]} />
                </section>
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                    <p className="text-lg font-semibold text-slate-700">Unable to load blogs right now.</p>
                    <p className="text-sm text-slate-500">Please try again later.</p>
                </div>
            </main>
        );
    }

    if (!blogListResponse.data.length) {
        return (
            <main className="mx-auto w-full max-w-7xl px-4 py-2">
                <section className="mx-auto max-w-7xl">
                    <Breadcrumb crumblist={[{ level: 1, label: 'Blogs', url: '/blogs' }]} />
                </section>
                <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                    <p className="text-lg font-semibold text-slate-700">No blogs published yet.</p>
                    <p className="text-sm text-slate-500">Check back soon.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-2">
            {/* page breadcrumb navigation */}
            <section className="mx-auto max-w-7xl">
                <Breadcrumb crumblist={[{ level: 1, label: 'Blogs', url: '/blogs' }]} />
            </section>

            {/* blog interact section */}
            <BlogInteract newestBlogs={blogListResponse.data} />

            {/* blog listing section */}
            <BlogListing initialBlogDataResponse={blogListResponse} />
        </main>
    );
}
