// imports
import qs from 'qs';
import { QueryObjectType } from '../types/responseTypes';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 150;

// Master switch: while bulk content upload is in progress, disable ALL caching so
// every change in Strapi shows up instantly. Set to false to use the ISR window below.
const CONTENT_UPLOAD_IN_PROGRESS = false;

// ISR revalidation window (seconds) applied to EVERY Strapi endpoint. 0 = no caching (always fresh).
const REVALIDATE_SECONDS = 1800; // 30 min — uniform across all content

const getRevalidateSeconds = () => (CONTENT_UPLOAD_IN_PROGRESS ? 0 : REVALIDATE_SECONDS);

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

    const revalidate = enableCache ? getRevalidateSeconds() : 0;

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
