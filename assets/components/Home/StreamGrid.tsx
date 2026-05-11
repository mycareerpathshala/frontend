// imports
import { StrapiDataType } from '@/assets/types/responseTypes';
import { StreamType } from '@/assets/types/streamTypes';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

function StreamCard({ streamData }: { streamData: StreamType & StrapiDataType }) {
    const streamCoverImage = streamData.streamCover?.formats?.medium?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${streamData.streamCover.formats.medium.url}`
        : '/img/placeholders/stream_placeholder.jpg';

    return (
        <Link
            href={`/courses?streamFilter=${streamData.documentId}`}
            style={{
                backgroundImage: `url(${streamCoverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="group relative block aspect-[4/2.5] w-full overflow-hidden rounded-xl"
        >
            {/* dark gradient pinned to bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"></div>

            {/* shimmer on hover */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>

            {/* bottom content */}
            <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-3">
                <h3 className="text-xs font-semibold leading-tight tracking-wide text-white drop-shadow sm:text-sm">
                    {streamData.name}
                </h3>
                <span className="bg-primary-base flex shrink-0 translate-x-2 items-center justify-center rounded-full p-1.5 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <HiArrowRight className="size-3 text-white" />
                </span>
            </div>
        </Link>
    );
}

export default function StreamGrid({ streamDataList }: { streamDataList: (StreamType & StrapiDataType)[] }) {
    return (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {streamDataList.map((streamData, index) => (
                <StreamCard key={streamData.documentId || index} streamData={streamData} />
            ))}
        </div>
    );
}
