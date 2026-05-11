// imports
import { FaqType } from './componentTypes';
import {
    StrapiCollectionMetaType,
    StrapiDataType,
    StrapiMediaType,
    StrapiResponseType,
    StrapiSingleMetaType,
} from './responseTypes';

// country types
export interface ValueUnitComponent {
    id: number;
    value: number;
    selectUnit: string;
}

export interface MinMaxComponent {
    id: number;
    minimum: number;
    maximum: number;
}

export interface RequirementComponent {
    id: number;
    requirementType: string;
    requirementDetails: string;
}

export interface VisaCategoryComponent {
    id: number;
    title: string;
    visaCost: number;
    category: string;
    smallDescription: string;
}

export interface WorkOpportunitiesComponent {
    id: number;
    partTimeWork: string;
    postStudyWork: string;
}

export interface MonthlyExpenseItem {
    id: number;
    expenseName: string;
    expenseRange: MinMaxComponent;
}

// main country type (single response)
export interface CountryType {
    name: string;
    description: string;
    countryCode: string;
    phoneCode: string;
    capital: string;
    numOfUniversities: number;
    nativeLanguage: string;
    numOfIntlStudents: string | number;
    visaSuccessRate: number;
    countryCurrency: string;
    livingCostIndex: number;

    // Populated Relations & Components
    countryFlag?: StrapiMediaType;
    coverImage?: StrapiMediaType;
    estimatedPopulation?: ValueUnitComponent;
    countryGDB?: ValueUnitComponent;
    costOfLiving?: MinMaxComponent;
    feesPerYear?: MinMaxComponent;
    docsAndCertification?: RequirementComponent[]; // Array / Repeatable
    visaCategories?: VisaCategoryComponent[]; // Array / Repeatable
    workOpportunities?: WorkOpportunitiesComponent;
    faqList?: FaqType[]; // Array / Repeatable
    monthlyExpenseRange?: MonthlyExpenseItem[]; // Array / Repeatable
}

// response

export type CountryListResponseType = StrapiResponseType<(CountryType & StrapiDataType)[], StrapiCollectionMetaType>;
export type CountryResponseType = StrapiResponseType<CountryType & StrapiDataType, StrapiSingleMetaType>;
export type CountryMinType = Pick<
    CountryType & StrapiDataType,
    'documentId' | 'id' | 'name' | 'countryFlag' | 'nativeLanguage'
>;
