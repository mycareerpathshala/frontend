// imports
import { BlogListResponseType, BlogResponseType } from '@/assets/types/blogTypes';
import { QueryObjectType } from '@/assets/types/responseTypes';
import { fetchData } from '@/assets/utilities/getRequest';

export const getBlogsData = async (queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData('/api/blogs', queryObject, enableCache);
        if (!response.ok) {
            throw new Error("couldn't get blogs data from cms");
        }

        const parsedResponse: BlogListResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getSingleBlogData = async (blogID: string, queryObject: QueryObjectType, enableCache: boolean) => {
    try {
        const response = await fetchData(`/api/blogs/${blogID}`, queryObject, enableCache);
        if (!response.ok) {
            throw new Error("couldn't get blogs data from cms");
        }

        const parsedResponse: BlogResponseType = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
        return null;
    }
};
