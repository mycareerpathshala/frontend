// imports
import { CountryType } from './countryTypes';
import { StrapiDataType, StrapiMediaType } from './responseTypes';

// location type
export interface LocationType {
    id: number;
    areaNeighborhood: string;
    stateProvince?: string;
    city: string;
    country?: CountryType & StrapiDataType;
}

// area size type
export interface AreaSizeType {
    id: number;
    sizeInNumber: number;
    measurementUnit: string;
}

// application date list type
export interface ApplicationDateType {
    id: number;
    session: string;
    startDate: string;
    endDate: string;
}

// college or university media content
export interface MediaContentType {
    id: number;
    logo: StrapiMediaType;
    coverPhoto: StrapiMediaType;
    photoOne: StrapiMediaType;
    photoTwo: StrapiMediaType;
    photoThree: StrapiMediaType;
    brochure?: StrapiMediaType;
}

// english proficiency type
export interface EnglishProficiencyType {
    id: number;
    toefl?: number;
    ielts: number;
    pteAcademic?: number;
    duolingo?: number;
    cambridge?: string;
    toeic?: number;
}

// highlight notice type
export interface HighlightNoticeType {
    id: number;
    title: string;
    noticeText: string;
}

// important date type
export interface ImportantDateType {
    id: number;
    tagSelector: "Undergraduate" | "Postgraduate" | "Diploma" | "Internship" | "Short Term Course";
    oneLineDescription: string;
    date: string;
}

export interface FaqType {
    id: number;
    question: string;
    answer: string;
}

export interface DynamicContentType {
    id: number;
    blockTitle: string;
    blockContent: string;
}

export interface TuitionFeeByYearType {
    id: number;
    selectYear: string;
    tuitionFee: number;
}
