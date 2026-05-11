import type { MetadataRoute } from 'next';
import { getBlogsData } from '@/assets/lib/cms/fetchBlog';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';
import { getMedicalCollegesData } from '@/assets/lib/cms/fetchMedical';
import { getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mycareerpathshala.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL,                              lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
        { url: `${BASE_URL}/universities`,            lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
        { url: `${BASE_URL}/mbbs`,                   lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
        { url: `${BASE_URL}/courses`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/countries`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/blogs`,                  lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
        { url: `${BASE_URL}/contact`,                lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    ];

    const [universitiesData, mbbsData, blogsData, countriesData] = await Promise.all([
        getUniversitiesId({ fields: ['documentId'] }, true),
        getMedicalCollegesData({ fields: ['documentId'] }, true),
        getBlogsData({ fields: ['documentId'] }, true),
        getCountriesData({ fields: ['documentId'] }, true),
    ]);

    const universityRoutes: MetadataRoute.Sitemap = (universitiesData?.data ?? []).map((u) => ({
        url: `${BASE_URL}/universities/${u.documentId}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const mbbsRoutes: MetadataRoute.Sitemap = (mbbsData?.data ?? []).map((m) => ({
        url: `${BASE_URL}/mbbs/${m.documentId}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blogsData?.data ?? []).map((b) => ({
        url: `${BASE_URL}/blogs/${b.documentId}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const countryRoutes: MetadataRoute.Sitemap = (countriesData?.data ?? []).map((c) => ({
        url: `${BASE_URL}/countries/${c.documentId}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...universityRoutes, ...mbbsRoutes, ...blogRoutes, ...countryRoutes];
}
