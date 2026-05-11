// imports
import { fetchData } from '@/assets/utilities/getRequest';
import { NextRequest, NextResponse } from 'next/server';

type SearchResultItem = {
    documentId: string;
    label: string;
    href: string;
};

type SearchResults = {
    universities: SearchResultItem[];
    courses: SearchResultItem[];
    mbbs: SearchResultItem[];
    countries: SearchResultItem[];
    blogs: SearchResultItem[];
};

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query')?.trim();

    // reject empty or too-short queries
    if (!query || query.length < 2) {
        return NextResponse.json({ status: 'success', results: null });
    }

    try {
        const pageSize = { pagination: { pageSize: 5 } };

        const [universities, courses, mbbs, countries, blogs] = await Promise.allSettled([
            fetchData(
                '/api/universities',
                { filters: { name: { $containsi: query } }, fields: ['documentId', 'name'], ...pageSize },
                false,
            ),
            fetchData(
                '/api/courses',
                { filters: { courseName: { $containsi: query } }, fields: ['documentId', 'courseName'], ...pageSize },
                false,
            ),
            fetchData(
                '/api/medical-colleges',
                { filters: { name: { $containsi: query } }, fields: ['documentId', 'name'], ...pageSize },
                false,
            ),
            fetchData(
                '/api/countries',
                { filters: { name: { $containsi: query } }, fields: ['documentId', 'name'], ...pageSize },
                false,
            ),
            fetchData(
                '/api/blogs',
                { filters: { blogTitle: { $containsi: query } }, fields: ['documentId', 'blogTitle'], ...pageSize },
                false,
            ),
        ]);

        // helper: parse a settled result, return empty array on failure
        const parse = async (result: PromiseSettledResult<Response>): Promise<{ documentId: string; [key: string]: string }[]> => {
            if (result.status === 'rejected') return [];
            try {
                const json = await result.value.json();
                return json?.data ?? [];
            } catch {
                return [];
            }
        };

        const [uniData, courseData, mbbsData, countryData, blogData] = await Promise.all([
            parse(universities),
            parse(courses),
            parse(mbbs),
            parse(countries),
            parse(blogs),
        ]);

        const results: SearchResults = {
            universities: uniData.map((item) => ({
                documentId: item.documentId,
                label: item.name,
                href: `/universities/${item.documentId}`,
            })),
            courses: courseData.map((item) => ({
                documentId: item.documentId,
                label: item.courseName,
                href: `/courses`,
            })),
            mbbs: mbbsData.map((item) => ({
                documentId: item.documentId,
                label: item.name,
                href: `/mbbs/${item.documentId}`,
            })),
            countries: countryData.map((item) => ({
                documentId: item.documentId,
                label: item.name,
                href: `/countries/${item.documentId}`,
            })),
            blogs: blogData.map((item) => ({
                documentId: item.documentId,
                label: item.blogTitle,
                href: `/blogs/${item.documentId}`,
            })),
        };

        return NextResponse.json({ status: 'success', results });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 'error', results: null }, { status: 500 });
    }
}
