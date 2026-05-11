// imports
import qs from 'qs';

const STRAPI_URL_PUBLIC = 'http://194.164.150.193';
const STRAPI_API_TOKEN =
    '022a4282f73dddcb9e3831a85d800e1aeb7c904c69e80ca715285c341d86951aceea6a76db5536673541a4b8e90c8c01f5012d04f892dc674f183505f31a7d225a681d3c4b9361d725acbead81ecb6d977333f912e8797b05bad28dac1f240799aed2597ec6ecfc35b605c163901f3ebc5fda7bac97cd36b970663d65d88de20';

// get application requirements function
const getApplicationRequirementData = async () => {
    try {
        const query = qs.stringify(
            {
                populate: {
                    ugRequirements: {
                        populate: {
                            applicationFee: true,
                            gpaRequirements: true,
                            englishProficiencyRequirements: true,
                            standardizeExamRequirements: true,
                            requiredDocuments: true,
                        },
                    },
                    pgRequirements: {
                        populate: {
                            applicationFee: true,
                            gpaRequirements: true,
                            englishProficiencyRequirements: true,
                            standardizeExamRequirements: true,
                            requiredDocuments: true,
                        },
                    },
                },
            },
            {
                encodeValuesOnly: true,
            },
        );

        const response = await fetch(`${STRAPI_URL_PUBLIC}/api/country-admission-requirement?${query}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${STRAPI_API_TOKEN}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get the data!');
        }

        const parsedResponse = await response.json();

        // storing the data as json
        const requirementData = parsedResponse.data;

        console.log(parsedResponse);
    } catch (err) {
        console.error(err);
        return null;
    }
};

// run the function
getApplicationRequirementData();
