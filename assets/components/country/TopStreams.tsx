// imports
import { getStreamsData } from '@/assets/lib/cms/fetchStream';
import { QueryObjectType } from '@/assets/types/responseTypes';
import StreamGrid from '../Home/StreamGrid';

export default async function TopStreams() {
    const queryObject: QueryObjectType = {
        populate: {
            streamCover: true,
        },
    };
    const streamDataResponse = await getStreamsData(queryObject, true);

    if (!streamDataResponse) {
        return null;
    }

    return (
        <div className="w-full">
            {/* streamgrid component */}
            <StreamGrid streamDataList={streamDataResponse.data} />
        </div>
    );
}
