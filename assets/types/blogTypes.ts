// imports
import {
    StrapiCollectionMetaType,
    StrapiDataType,
    StrapiMediaType,
    StrapiResponseType,
    StrapiSingleMetaType,
} from './responseTypes';

// blog type
export interface BlogType {
    blogTitle: string;
    slug: string;
    category: 'General' | 'University' | 'Country' | 'Course' | 'Exam' | 'MBBS';
    subCategory?: string;
    blogCover: StrapiMediaType;
    timeRequiredToRead: number;
    authorName: string;
    blogContent?: string;
}

// response type
export type BlogListResponseType = StrapiResponseType<(BlogType & StrapiDataType)[], StrapiCollectionMetaType>;
export type BlogResponseType = StrapiResponseType<BlogType & StrapiDataType, StrapiSingleMetaType>;
