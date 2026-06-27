// Resolve a Strapi media path to a full URL.
//
// Media now lives on Cloudflare R2, so the Strapi API returns ABSOLUTE urls
// (e.g. https://media.mycareerpathshala.com/<file>). Older relative paths
// (/uploads/.. or local /img fallbacks) still get the Strapi base prepended.
//
// Use this instead of `${process.env.NEXT_PUBLIC_STRAPI_URL}${x.url}` so absolute
// R2 urls aren't double-prefixed into a broken url.
export const mediaUrl = (path?: string | null): string => {
    if (path && /^https?:\/\//.test(path)) return path;
    return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${path ?? ''}`;
};
