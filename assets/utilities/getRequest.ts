// imports
import qs from 'qs';
import { QueryObjectType } from '../types/responseTypes';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 150;

// Master switch: while bulk content upload is in progress, disable ALL caching so
// every change in Strapi shows up instantly. Set to false once uploading is done
// to activate the tiered ISR windows below.
const CONTENT_UPLOAD_IN_PROGRESS = false;

// ISR revalidation window (seconds) per Strapi endpoint; 0 = no caching (always fresh).
const BLOG_REVALIDATE_SECONDS = 1800; // 30 min — most frequently updated content
const CATALOG_REVALIDATE_SECONDS = 21600; // 6 h — universities, medical colleges, courses
const REFERENCE_REVALIDATE_SECONDS = 86400; // 24 h — countries, streams, terms, fallbacks

const REVALIDATE_BY_PATH: [prefix: string, seconds: number][] = [
    ['/api/blogs', BLOG_REVALIDATE_SECONDS],
    ['/api/universities', CATALOG_REVALIDATE_SECONDS],
    ['/api/medical-colleges', CATALOG_REVALIDATE_SECONDS],
    ['/api/courses', CATALOG_REVALIDATE_SECONDS],
    ['/api/countries', REFERENCE_REVALIDATE_SECONDS],
    ['/api/streams', REFERENCE_REVALIDATE_SECONDS],
    ['/api/terms-and-condition', REFERENCE_REVALIDATE_SECONDS],
    ['/api/fallbacks', REFERENCE_REVALIDATE_SECONDS],
];

const getRevalidateSeconds = (urlPath: string) => {
    if (CONTENT_UPLOAD_IN_PROGRESS) return 0;
    const rule = REVALIDATE_BY_PATH.find(([prefix]) => urlPath.startsWith(prefix));
    return rule ? rule[1] : CATALOG_REVALIDATE_SECONDS;
};

// general fetch request — retries up to MAX_RETRIES times on transient failures
export const fetchData = async (urlPath: string, queryObject: QueryObjectType, enableCache: boolean = true) => {
    const query = qs.stringify(queryObject, {
        encodeValuesOnly: true,
    });

    const apiURL = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
    const apiToken = process.env.STRAPI_API_TOKEN;
    if (!apiURL || !apiToken) {
        throw new Error('failed reading local environment variables');
    }

    const revalidate = enableCache ? getRevalidateSeconds(urlPath) : 0;

    const url = `${apiURL}${urlPath}?${query}`;
    const options: RequestInit = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            Connection: 'close',
        },
        ...(revalidate > 0 ? { next: { revalidate } } : { cache: 'no-store' as const }),
    };

    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                const err = new Error(`couldn't get data from API (HTTP ${res.status})`);
                // 4xx = bad request — retrying won't help, fail immediately
                if (res.status >= 400 && res.status < 500) throw err;
                lastError = err;
            } else {
                return res;
            }
        } catch (err) {
            // Re-throw 4xx immediately (already thrown above)
            if (err instanceof Error && /HTTP 4\d\d/.test(err.message)) throw err;
            lastError = err;
        }
        if (attempt < MAX_RETRIES) {
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
        }
    }

    throw lastError;
};
