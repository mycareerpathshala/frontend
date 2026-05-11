// imports
import { QueryObjectType, StrapiCollectionMetaType, StrapiResponseType } from '@/assets/types/responseTypes';
import { UniversityResponseMaxType, UniversitySingleResponseType, UniversityTypeForCountry } from '@/assets/types/universityTypes';
import { fetchData } from '@/assets/utilities/getRequest';

// get universities list
export const getUniversitiesId = async (queryObject: QueryObjectType, enableCache: boolean): Promise<UniversityResponseMaxType | null> => {
    try {
        const response = await fetchData('/api/universities', queryObject, enableCache);
        if (!response.ok) throw new Error("couldn't get universities data from cms");

        const parsedResponse: UniversityResponseMaxType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// get university list for country page
export const getUniversitiesForCountry = async (countryID: string) => {
    try {
        // query object
        const queryObject = {
            filters: {
                location: {
                    country: {
                        documentId: {
                            $eq: countryID,
                        },
                    },
                },
            },
            fields: ['id', 'documentId', 'name', 'acronym'],
            populate: {
                avgTuitionFee: true,
                location: {
                    populate: {
                        country: {
                            fields: ['id', 'documentId', 'name'],
                        },
                    },
                },
                universityMediaContent: {
                    populate: {
                        logo: true,
                    },
                },
            },
            pagination: {
                pageSize: 5,
                page: 1,
            },
        };

        const response = await fetchData('/api/universities', queryObject, true);

        const parsedResponse: StrapiResponseType<UniversityTypeForCountry[], StrapiCollectionMetaType> =
            await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// get single university data
export const getSingleUniversityData = async (universityID: string) => {
    try {
        const queryObject = {
            populate: {
                location: {
                    populate: {
                        country: {
                            fields: ['name'],
                            populate: {
                                countryFlag: true,
                            },
                        },
                    },
                },
                campusSize: true,
                avgTuitionFee: true,
                otherFees: true,
                applicationDateList: true,
                universityMediaContent: {
                    populate: {
                        logo: true,
                        coverPhoto: true,
                        photoOne: true,
                        photoTwo: true,
                        photoThree: true,
                        brochure: true,
                    },
                },
                highlightNoticeList: true,
                importantDateList: true,
                rankingInfo: true,
                applicationRequirements: {
                    populate: {
                        applicationFee: true,
                        englishProficiencyRequirements: true,
                        standardizeExamRequirements: true,
                        midSchoolGPA: true,
                        highSchoolGPA: true,
                        bachelorGPA: true,
                        requiredDocuments: true,
                    },
                },
                faqs: {
                    populate: {
                        faqList: true,
                    },
                },
                admissionDynamicPage: true,
                scholarshipDynamicPage: true,
            },
        };

        const response = await fetchData(`/api/universities/${universityID}`, queryObject, true);
        if (!response.ok) throw new Error(`couldn't get university data for ID: ${universityID}`);

        const parsedResponse: UniversitySingleResponseType = await response.json();

        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
