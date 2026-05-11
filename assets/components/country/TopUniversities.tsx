/* eslint-disable @next/next/no-img-element */
// imports
import { getMedicalDataForCountry } from '@/assets/lib/cms/fetchMedical';
import { getUniversitiesForCountry } from '@/assets/lib/cms/fetchUniversity';
import { CountryType } from '@/assets/types/countryTypes';
import { MedicalCollegeType } from '@/assets/types/mbbsTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityTypeForCountry } from '@/assets/types/universityTypes';
import Link from 'next/link';

// local components
function UniversityRow({ universityData }: { universityData: UniversityTypeForCountry }) {
    return (
        <tr className="border-b border-b-gray-200">
            <td className="flex items-center gap-3 py-4 pl-6 max-sm:gap-2 max-sm:py-3 max-sm:pl-3">
                <span className="relative block h-10 w-10 shrink-0 max-sm:h-8 max-sm:w-8">
                    <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${universityData.universityMediaContent?.logo.url}`}
                        alt="University Icon"
                        className="object-cotain absolute inset-0 h-full w-full"
                    />
                </span>
                <span>
                    <Link href={`/universities/${universityData.documentId}`}>
                        <p className="border-b border-transparent pb-0.5 text-sm hover:border-blue-400 max-sm:text-xs">
                            {universityData.name}
                        </p>
                    </Link>
                </span>
            </td>
            <td className="px-3 max-sm:px-2">
                <span className="block text-center text-sm whitespace-nowrap max-sm:text-xs">
                    ${universityData.avgTuitionFee?.minimum} - ${universityData.avgTuitionFee?.maximum}
                </span>
            </td>
            <td className="px-3 max-sm:px-2">
                <Link
                    href={`/universities/${universityData.documentId}`}
                    target="_blank"
                    className="bg-primary-base hover:text-primary-base border-primary-base mx-auto block w-fit cursor-pointer rounded-lg border px-6 py-2 text-sm text-white select-none hover:bg-white max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
                >
                    Visit Now!
                </Link>
            </td>
        </tr>
    );
}

function MedicalRow({ mbbsData }: { mbbsData: MedicalCollegeType & StrapiDataType }) {
    return (
        <tr className="border-b border-b-gray-200">
            <td className="flex items-center gap-3 py-4 pl-6 max-sm:gap-2 max-sm:py-3 max-sm:pl-3">
                <span className="relative block h-10 w-10 shrink-0 max-sm:h-8 max-sm:w-8">
                    <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${mbbsData.collegeMediaContent?.logo.url}`}
                        alt="University Icon"
                        className="object-cotain absolute inset-0 h-full w-full"
                    />
                </span>
                <span>
                    <Link href={`/universities/${mbbsData.documentId}`}>
                        <span className="flex items-center gap-2 max-sm:flex-wrap max-sm:gap-1">
                            <span className="border-b border-transparent pb-0.5 text-sm hover:border-blue-400 max-sm:text-xs">
                                {mbbsData.name}
                            </span>
                            <span className="rounded-md bg-red-400 px-1 py-0.5 text-xs text-white">MBBS</span>
                        </span>
                    </Link>
                </span>
            </td>
            <td className="px-3 max-sm:px-2">
                <span className="block text-center text-sm whitespace-nowrap max-sm:text-xs">
                    ${mbbsData.totalTuitionFee}
                </span>
            </td>
            <td className="px-3 max-sm:px-2">
                <Link
                    href={`/universities/${mbbsData.documentId}`}
                    target="_blank"
                    className="bg-primary-base hover:text-primary-base border-primary-base mx-auto block w-fit cursor-pointer rounded-lg border px-6 py-2 text-sm text-white select-none hover:bg-white max-sm:px-3 max-sm:py-1.5 max-sm:text-xs"
                >
                    Visit Now!
                </Link>
            </td>
        </tr>
    );
}

export default async function TopUniversities({ countryData }: { countryData: CountryType & StrapiDataType }) {
    const universitiesByCountryResponse = await getUniversitiesForCountry(countryData.documentId);
    const mbbsCountryResponse = await getMedicalDataForCountry(countryData.documentId);

    // 2. Production Check: If no data or null, trigger 404
    // if (!universitiesByCountryResponse || !universitiesByCountryResponse.data) {
    //     notFound();
    // }

    const universityList = universitiesByCountryResponse?.data;
    const mbbsList = mbbsCountryResponse?.data;

    return (
        <div className="mx-auto mt-20 w-full">
            <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                Top Universities in {countryData.name}
            </h3>

            <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[480px]">
                    <thead className="bg-linear-to-r from-[#F0F5FD] via-[rgba(229,195,235,0.54)] to-pink-50 shadow-lg">
                        <tr>
                            <th className="text-lg font-normal max-sm:text-sm">
                                <span className="block rounded-l-lg border border-r-0 border-gray-300 py-2 max-sm:py-2">
                                    University Name
                                </span>
                            </th>
                            <th className="text-lg font-normal max-sm:text-sm">
                                <span className="block border border-x-0 border-gray-300 py-2">Avg. Tuition Fees</span>
                            </th>
                            <th className="text-lg font-normal max-sm:text-sm">
                                <span className="block rounded-r-lg border border-l-0 border-gray-300 py-2">
                                    Explore More
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {universityList?.length
                            ? universityList.map((universityData: UniversityTypeForCountry, idx: number) => {
                                  return <UniversityRow key={idx} universityData={universityData} />;
                              })
                            : null}

                        {mbbsList?.length
                            ? mbbsList.map((mbbsData, index) => {
                                  return <MedicalRow key={index} mbbsData={mbbsData} />;
                              })
                            : null}
                    </tbody>
                </table>
                {!(universityList?.length && mbbsList?.length) ? (
                    <div className="mt-6 flex w-full items-center justify-center gap-12 p-3">
                        <Link
                            href={`/universities?countryID=${countryData.documentId}`}
                            className="text-md rounded-lg border border-blue-300 bg-blue-50 px-4 py-1.5 font-semibold text-blue-600 hover:bg-blue-400 hover:text-white"
                        >
                            All Universities
                        </Link>
                        <Link
                            href={`/mbbs?countryID=${countryData.documentId}`}
                            className="text-md rounded-lg border border-red-300 bg-red-50 px-4 py-1.5 font-semibold text-red-500 hover:bg-red-400 hover:text-white"
                        >
                            All Medical Colleges
                        </Link>
                    </div>
                ) : (
                    <div className="flex w-full items-center justify-center p-3">
                        <p className="w-full rounded-lg border border-red-400 bg-red-50 px-2 py-1 text-center text-sm text-red-600">
                            No Universities or Medical College Found!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
