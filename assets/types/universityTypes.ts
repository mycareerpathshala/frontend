// imports
import {
    ApplicationDateType,
    AreaSizeType,
    DynamicContentType,
    EnglishProficiencyType,
    FaqType,
    HighlightNoticeType,
    ImportantDateType,
    LocationType,
    MediaContentType,
} from './componentTypes';
import { StrapiCollectionMetaType, StrapiDataType, StrapiResponseType, StrapiSingleMetaType } from './responseTypes';

// gpa requirement type
export interface GPARequirementType {
    id: number;
    gpaScale: number;
    minGPA: number;
    minPercentage: number;
}

// standardize exam type
export interface StandardizeExamType {
    id: number;
    gmatAverage?: number;
    greAverage?: number;
    satAverage?: number;
    actAverage?: number;
    lsatAverage?: number;
    mcatAverage?: number;
}

// university ranking type
export interface WorldRankingType {
    id: number;
    recordedDate: string;
    qsRanking?: number;
    theRanking?: number;
    usnwrRanking?: number;
}

// university faq type
export interface UniversityFaqType {
    id: number;
    selectTopic: 'University' | 'Course' | 'Campus' | 'Cost' | 'Admission';
    faqList: FaqType[];
}

// required documents type
export interface RequiredDocumentsType {
    id: number;
    name: string;
    type: string;
    requiredOrNot: boolean;
}

// admission requirement types
export interface ApplicationRequirementType {
    id: number;
    title?: string;
    level?: 'Undergraduate' | 'Postgraduate';
    applicationPortalURL?: string;
    applicationFee?: {
        id: number;
        minimum: number;
        maximum: number;
    };
    midSchoolGPA?: GPARequirementType;
    highSchoolGPA?: GPARequirementType;
    bachelorGPA?: GPARequirementType;
    englishProficiencyRequirements?: EnglishProficiencyType;
    standardizeExamRequirements?: StandardizeExamType;
    requiredDocuments?: RequiredDocumentsType[];
}

// full university type
export interface UniversityType {
    name: string;
    acronym?: string;
    type: string;
    est: string;
    shortDescription: string;
    fullDescription: string;
    officialWebsite?: string;
    numOfCourses: number;
    numOfCampus: number;
    campusLocality: string;
    avgNumOfForeginStudents: number;
    scholarship: boolean;
    avgAcceptanceRate: number;

    // populated fields
    location?: LocationType;
    campusSize?: AreaSizeType;
    avgTuitionFee?: {
        id: number;
        minimum: number;
        maximum: number;
    };
    otherFees?: {
        id: number;
        name: string;
        amount: number;
    }[];
    applicationDateList?: ApplicationDateType[];
    universityMediaContent?: MediaContentType;
    highlightNoticeList?: HighlightNoticeType[];
    importantDateList?: ImportantDateType[];
    rankingInfo?: WorldRankingType[];
    faqs?: UniversityFaqType[];
    overviewDynamicPage?: DynamicContentType;
    courseDynamicPage?: DynamicContentType;
    admissionDynamicPage?: DynamicContentType;
    scholarshipDynamicPage?: DynamicContentType;
    faqDynamicPage?: DynamicContentType;
    applicationRequirements?: ApplicationRequirementType[];
    howToApply?: { id: number; bulletPoint: string }[];
}

// university response types
export type UniversityResponseType = StrapiResponseType<(UniversityType & StrapiDataType)[], StrapiCollectionMetaType>;
export type UniversitySingleResponseType = StrapiResponseType<UniversityType & StrapiDataType, StrapiSingleMetaType>;

export type UniversityDataMaxType = UniversityType & StrapiDataType;
export type UniversityResponseMaxType = StrapiResponseType<UniversityDataMaxType[], StrapiCollectionMetaType>;

// university min type for country page
export type UniversityTypeForCountry = Pick<
    UniversityType,
    'name' | 'acronym' | 'avgTuitionFee' | 'location' | 'universityMediaContent'
> &
    StrapiDataType;
