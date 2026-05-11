// imports
import { FallbackRequirementListResponse } from '@/assets/types/otherTypes';
import {
    QueryObjectType
} from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

// fallback admission requirements data
export const getFallbackData = async (queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData(`/api/fallbacks`, queryObject, enableCache);
        if (!response.ok) {
            throw new Error("couldn't get single fallback data from cms");
        }

        const parsedResponse: FallbackRequirementListResponse =
            await response.json();

        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
