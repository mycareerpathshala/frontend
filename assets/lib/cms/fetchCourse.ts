// imports
import { CourseListResponseType, CourseResponseType } from '@/assets/types/courseTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

export const getCoursesForUniversity = async (
    universityID: string,
    queryObject: QueryObjectType,
    enableCache: boolean,
) => {
    try {
        const response = await fetchData(`/api/courses`, queryObject, enableCache);
        const parsedResponse: CourseListResponseType = await response.json();

        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getSingleCourseData = async (courseID: string) => {
    try {
        const queryObject = {
            populate: {
                tuitionFeeByYear: true,
                stream: {
                    populate: {
                        streamCover: true,
                    },
                },
                university: {
                    populate: {
                        location: {
                            populate: {
                                country: {
                                    populate: {
                                        countryFlag: true,
                                    },
                                },
                            },
                        },
                        applicationDateList: true,
                        universityMediaContent: {
                            populate: {
                                logo: true,
                                coverPhoto: true,
                            },
                        },
                    },
                },
            },
        };

        const response = await fetchData(`/api/courses/${courseID}`, queryObject, true);
        if (!response.ok) throw new Error(`couldn't get course data for ID: ${courseID}`);

        const parsedResponse: CourseResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getCourseIds = async () => {
    try {
        const queryObject: QueryObjectType = {
            fields: ['documentId'],
            pagination: { pageSize: 200 },
        };
        const response = await fetchData('/api/courses', queryObject, true);
        if (!response.ok) throw new Error("couldn't get course IDs");
        const parsedResponse: CourseListResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
