// imports
import {
    ApplicationDateType,
    AreaSizeType,
    EnglishProficiencyType,
    FaqType,
    HighlightNoticeType,
    ImportantDateType,
    LocationType,
    MediaContentType,
    TuitionFeeByYearType,
} from './componentTypes';
import { StrapiCollectionMetaType, StrapiDataType, StrapiResponseType, StrapiSingleMetaType } from './responseTypes';

// mbbs application requirement types
export interface MedicalApplicationRequirementType {
    id: number;
    applicationFee?: number;
    neetScoreMinimum: number;
    secondaryGPAMinimum: number;
    higherSecondaryGPAMinimum: number;
    totalGPAMinimum: number;
    physicsScoreMinimum: number;
    chemistryScoreMinimum: number;
    biologyScoreMinimum: number;
    englishProficiency?: EnglishProficiencyType;
    applicationDateList?: ApplicationDateType[];
}

// fmge passing ratio data type
export interface FmgePassingRatioType {
    id: number;
    selectDate: string;
    totalAppeared: number;
    totalPassed: number;
}

// medical faq type
export interface MedicalFaqType {
    id: number;
    selectTopic: 'College' | 'Campus' | 'Cost' | 'Admission' | 'Syllabus';
    faqList: FaqType[];
}

// main mbbs type
export interface MedicalCollegeType {
    name: string;
    acronym: string;
    type: string;
    est: string;
    shortDescription: string;
    fullDescription: string;
    officialWebsite?: string;
    numOfCampus: number;
    campusLocality: string;
    avgNumOfForeginStudents: number;
    scholarship: boolean;
    avgAcceptanceRate: number;
    totalTuitionFee: number;
    degreeDurationInMonths: number;
    internshipDurationInMonths: number;
    teachingLanguage: string;

    // populated types
    location?: LocationType;
    campusSize?: AreaSizeType;
    otherFees?: {
        id: number;
        name: string;
        amount: number;
    }[];
    tuitionFeeByYear?: TuitionFeeByYearType[];
    collegeMediaContent?: MediaContentType;
    fmgePassingRecordByYear?: FmgePassingRatioType[];
    applicationRequirements?: MedicalApplicationRequirementType;
    highlightNoticeList?: HighlightNoticeType[];
    importantDateList?: ImportantDateType[];
    faqs?: MedicalFaqType[];
    rankingInfo?: {
        id: number;
        countryRank: number;
        worldRank: number;
    };
    syllabusDynamicPage?: {
        id: number;
        blockTitle: string;
        blockContent: string;
    };
    overviewDynamicPage?: {
        id: number;
        blockTitle: string;
        blockContent: string;
    };
    feeDynamicPage?: {
        id: number;
        blockTitle: string;
        blockContent: string;
    };
    admissionDynamicPage?: {
        id: number;
        blockTitle: string;
        blockContent: string;
    };
    faqDynamicPage?: {
        id: number;
        blockTitle: string;
        blockContent: string;
    };
}

// medical response types
// medical response type min

export type MedicalResponseType = StrapiResponseType<(MedicalCollegeType & StrapiDataType)[], StrapiCollectionMetaType>;
export type MedicalSingleResponseType = StrapiResponseType<MedicalCollegeType & StrapiDataType, StrapiSingleMetaType>;
