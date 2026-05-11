// imports
import { getStreamsData } from '@/assets/lib/cms/fetchStream';
import { QueryObjectType } from '@/assets/types/responseTypes';
import StreamGrid from './StreamGrid';

export default async function StreamSection() {
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
        <section className="mx-auto mt-20 w-full max-w-7xl px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold max-lg:text-2xl">Explore your preferred courses</h3>
                <p className="mt-2 text-base max-lg:text-base max-sm:text-sm">
                    Exploring study abroad options as an international student can be challenging, but you can succeed!
                    Our expert counselors will guide you through every step, from finding accredited schools to crafting
                    strong applications
                </p>
            </div>

            {/* streamgrid component */}
            <StreamGrid streamDataList={streamDataResponse.data} />
        </section>
    );
}
