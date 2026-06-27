// imports
import { mediaUrl } from '@/assets/utilities/mediaUrl';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';
import { QueryObjectType } from '@/assets/types/responseTypes';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi2';

// local components
function CountryCard({ name, coverImage, url }: { name: string; coverImage: string; url: string }) {
    return (
        <div
            style={{
                backgroundImage: `url(${coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="relative h-45 w-full rounded-xl select-none hover:shadow-xl/20"
        >
            <Link href={url}>
                <p className="absolute right-0 bottom-5 left-0 flex items-center justify-between bg-black/60 px-2.5 py-1 text-white">
                    <span className="text-lg font-bold max-lg:text-base max-lg:font-medium">{name}</span>
                    <span>
                        <HiChevronRight className="size-7 text-white max-lg:size-5" />
                    </span>
                </p>
            </Link>
        </div>
    );
}

export default async function CountryGrid() {
    const queryObject: QueryObjectType = {
        fields: ['name'],
        populate: {
            coverImage: true,
        },
        pagination: {
            pageSize: 8,
            page: 1,
        },
    };
    const countryDataResponse = await getCountriesData(queryObject, true);

    if (!countryDataResponse) {
        return null;
    }

    return (
        <section className="mx-auto mt-20 w-full max-w-7xl px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold max-lg:text-2xl">Explore Universities across globe</h3>
                <p className="mt-2 text-base max-lg:text-base max-sm:text-sm">
                    We compare universities across 100+ countries, offering you a wide range of options to find the
                    perfect fit
                </p>
            </div>

            {/* country grid */}
            <div className="mt-8 grid w-full grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:gap-3">
                {countryDataResponse.data.map((countryData, index: number) => {
                    return (
                        <CountryCard
                            key={index}
                            name={countryData.name}
                            coverImage={`${mediaUrl(countryData.coverImage?.formats?.medium?.url)}`}
                            url={`/countries/${countryData.documentId}`}
                        />
                    );
                })}
            </div>
        </section>
    );
}
