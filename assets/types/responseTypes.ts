// imports

// strapi media type (format)
export interface StrapiImageFormatType {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null | string;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

// strapi media type (media)
export interface StrapiMediaType {
    id: number;
    documentId: string;
    name: string;
    lternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        large?: StrapiImageFormatType;
        small?: StrapiImageFormatType;
        medium?: StrapiImageFormatType;
        thumbnail?: StrapiImageFormatType;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | string;
    provider: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// strapi pagination type
export interface StrapiPaginationType {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

// for collection data (meta info)
export interface StrapiCollectionMetaType {
    pagination: StrapiPaginationType;
}

// for single data (single record meta)
export type StrapiSingleMetaType = Record<string, unknown>;

// general api response (common)
export interface StrapiResponseType<T, M = StrapiSingleMetaType | StrapiCollectionMetaType> {
    data: T;
    meta: M;
}

// base collection base
export interface StrapiDataType {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// query data type
export interface QueryObjectType {
    populate?: Record<string, unknown>;
    sort?: string[];
    filters?: Record<string, unknown>;
    fields?: string[];
    pagination?: Record<string, unknown>;
}
