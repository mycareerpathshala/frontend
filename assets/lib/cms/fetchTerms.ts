import { StrapiDataType, StrapiResponseType } from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

interface TermsType {
    termsContent: string;
}

type TermsResponseType = StrapiResponseType<TermsType & StrapiDataType>;

export const getTermsData = async (enableCache: boolean) => {
    try {
        const response = await fetchData('/api/terms-and-condition', {}, enableCache);
        if (!response.ok) {
            throw new Error("couldn't get terms data from cms");
        }
        const parsedResponse: TermsResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
