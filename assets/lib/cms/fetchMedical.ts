// imports
import { MedicalResponseType, MedicalSingleResponseType } from '@/assets/types/mbbsTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

// get all medical colleges list (used for generateStaticParams and general listing)
export const getMedicalCollegesData = async (queryObject: QueryObjectType, enableCache: boolean): Promise<MedicalResponseType | null> => {
    try {
        const response = await fetchData('/api/medical-colleges', queryObject, enableCache);
        if (!response.ok) throw new Error("couldn't get medical colleges data from cms");

        const parsedResponse: MedicalResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// get mbbs data min
export const getSingleMedicalData = async (medicalID: string) => {
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
                otherFees: true,
                tuitionFeeByYear: true,
                collegeMediaContent: {
                    populate: {
                        logo: true,
                        coverPhoto: true,
                        photoOne: true,
                        photoTwo: true,
                        photoThree: true,
                        brochure: true,
                    },
                },
                fmgePassingRecordByYear: true,
                applicationRequirements: {
                    populate: {
                        englishProficiency: true,
                        applicationDateList: true,
                    },
                },
                highlightNoticeList: true,
                faqs: {
                    populate: {
                        faqList: true,
                    },
                },
                rankingInfo: true,
                syllabusDynamicPage: true,
            },
        };

        const response = await fetchData(`/api/medical-colleges/${medicalID}`, queryObject, true);
        if (!response.ok) throw new Error(`couldn't get medical college data for ID: ${medicalID}`);

        const parsedResponse: MedicalSingleResponseType = await response.json();

        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};



// get mbbs data for country
export const getMedicalDataForCountry = async (countryID: string) => {
    try {
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
            fields: ['id', 'documentId', 'name', 'acronym', 'totalTuitionFee'],
            populate: {
                location: {
                    populate: {
                        country: {
                            fields: ['id', 'documentId', 'name'],
                        },
                    },
                },
                collegeMediaContent: {
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

        const response = await fetchData(`/api/medical-colleges`, queryObject, true);

        const parsedResponse: MedicalResponseType = await response.json();

        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
}
