// imports
import { CountryType } from '@/assets/types/countryTypes';
import {
    QueryObjectType,
    StrapiCollectionMetaType,
    StrapiDataType,
    StrapiResponseType,
    StrapiSingleMetaType,
} from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

// get countries
export const getCountriesData = async (queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData('/api/countries', queryObject, enableCache);

        const parsedResponse: StrapiResponseType<(CountryType & StrapiDataType)[], StrapiCollectionMetaType> =
            await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// get single country data
export const getSingleCountryData = async (countryID: string, queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData(`/api/countries/${countryID}`, queryObject, enableCache);

        const parsedResponse: StrapiResponseType<CountryType & StrapiDataType, StrapiSingleMetaType> =
            await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
