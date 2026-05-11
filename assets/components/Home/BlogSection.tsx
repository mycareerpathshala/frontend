// imports
import { getBlogsData } from '@/assets/lib/cms/fetchBlog';
import BlogInteract from '../blogs/BlogInteract';

export default async function BlogSection() {
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

    return (
        <section className="mx-auto mt-16 mb-12 max-w-7xl px-4 py-10">
            <h2 className="mb-12 text-4xl font-bold">
                <span>Most recent blogs from us</span>
            </h2>
            {blogListResponse?.data.length ? <BlogInteract newestBlogs={blogListResponse.data} /> : null}
        </section>
    );
}
