// imports
import { TuitionFeeByYearType } from './componentTypes';
import { StrapiCollectionMetaType, StrapiDataType, StrapiResponseType, StrapiSingleMetaType } from './responseTypes';
import { StreamType } from './streamTypes';
import { UniversityType } from './universityTypes';

// course types
export interface CourseType {
    courseName: string;
    courseDescription: string;
    courseLevel: 'Undergraduate' | 'Postgraduate';
    degreeName: string;
    majorName: string;
    courseDuration: number;
    deliveryMethod: string;
    teachingLanguage: string;
    courseOfferings: string;
    dynamicContent?: string;
    tuitionFeeByYear?: TuitionFeeByYearType[];
    stream?: StreamType;
    university?: UniversityType & StrapiDataType;
}

// course type responses
export type CourseResponseType = StrapiResponseType<CourseType & StrapiDataType, StrapiSingleMetaType>;
export type CourseListResponseType = StrapiResponseType<(CourseType & StrapiDataType)[], StrapiCollectionMetaType>;
