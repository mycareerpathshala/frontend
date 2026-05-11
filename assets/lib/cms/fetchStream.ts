// imports
import {
    QueryObjectType,
    StrapiCollectionMetaType,
    StrapiDataType,
    StrapiResponseType,
} from '@/assets/types/responseTypes';
import { StreamType } from '@/assets/types/streamTypes';
import { fetchData } from '@/assets/utilities/getRequest';

// get streams data
export const getStreamsData = async (queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData('/api/streams', queryObject, enableCache);
        if (!response.ok) {
            throw new Error("couldn't get streams data from cms");
        }

        const parsedResponse: StrapiResponseType<(StreamType & StrapiDataType)[], StrapiCollectionMetaType> =
            await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
