/* eslint-disable @next/next/no-img-element */
// imports
import CountryRequirements from '@/assets/components/country/CountryRequirements';
import FactCardsContainer from '@/assets/components/country/FactCardsContainer';
import FaqSection from '@/assets/components/country/FaqSection';
import StudyExpenses from '@/assets/components/country/StudyExpenses';
import TopStreams from '@/assets/components/country/TopStreams';
import TopUniversities from '@/assets/components/country/TopUniversities';
import VisaCardContainer from '@/assets/components/country/VisaCardContainer';
import { getCountriesData, getSingleCountryData } from '@/assets/lib/cms/fetchCountry';
import { CountryType } from '@/assets/types/countryTypes';
import { QueryObjectType, StrapiDataType } from '@/assets/types/responseTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// export metadata
export async function generateMetadata({ params }: { params: Promise<{ countryID: string }> }) {
    const { countryID } = await params;
    const queryObject: QueryObjectType = {
        fields: ['documentId', 'name'],
    };
    const countryDataResponse = await getSingleCountryData(countryID, queryObject, true);

    if (!countryDataResponse || !countryDataResponse.data) {
        notFound();
    }

    // get the countryData only
    const { data: countryData } = countryDataResponse;
    return { title: `${countryData.name} | MyCareerPathshala` };
}

// generate static params
export async function generateStaticParams() {
    const countriesResponse = await getCountriesData({ fields: ['documentId', 'name'] }, true);

    if (!countriesResponse) {
        return [];
    }

    return countriesResponse.data.map((countryData: CountryType & StrapiDataType) => {
        return { countryID: countryData.documentId };
    });
}

export default async function SingleCountryPage({ params }: { params: Promise<{ countryID: string }> }) {
    const { countryID } = await params;

    const queryObject: QueryObjectType = {
        populate: {
            countryFlag: true,
            coverImage: true,
            estimatedPopulation: true,
            countryGDB: true,
            costOfLiving: true,
            feesPerYear: true,
            docsAndCertification: true,
            visaCategories: true,
            workOpportunities: true,
            faqList: true,
            monthlyExpenseRange: {
                populate: {
                    expenseRange: true,
                },
            },
        },
    };
    const countryDataResponse = await getSingleCountryData(countryID, queryObject, true);

    // 2. Production Check: If no data or null, trigger 404
    if (!countryDataResponse || !countryDataResponse.data) {
        notFound();
    }

    // get the countryData only
    const { data: countryData } = countryDataResponse;

    return (
        <div>
            {/* ad section */}
            <div className="mx-auto mt-8 w-full rounded-xl bg-linear-to-tr from-[#E5C3EB] via-[#E5C3EB] to-[#B5D3FF] px-6 py-7 max-sm:px-4 max-sm:py-5">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 max-[1160px]:grid-cols-[auto_1fr] max-[1160px]:gap-4">
                    <div className="relative size-16 overflow-hidden rounded-full border max-[1160px]:size-12">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${countryData.countryFlag?.url}`}
                            alt={`${countryData.name} Flag`}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <h3 className="text-lg font-semibold max-[1160px]:text-base">Curious about Studying in {countryData.name}?</h3>
                        <p className="max-[1160px]:text-sm">
                            Create an account and get your ideal study options, access personalized recommendations,
                            save your favourite courses and providers, and manage all your enquiries in one place.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 max-[1160px]:col-span-2 max-[1160px]:gap-3">
                        <Link
                            href="#"
                            className="bg-primary-base hover:text-primary-base border-primary-base cursor-pointer rounded-lg border px-4 py-2 text-white transition-all duration-200 ease-in-out select-none hover:bg-transparent max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                        >
                            Register
                        </Link>
                        <Link
                            href="#"
                            className="border-primary-base text-primary-base hover:bg-primary-base cursor-pointer rounded-lg border px-4 py-2 transition-colors duration-200 ease-in-out select-none hover:text-white max-[1160px]:flex-1 max-[1160px]:text-center max-[1160px]:text-sm"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* facts and figures */}
            <div className="mx-auto mt-10 w-full" id="facts">
                <FactCardsContainer countryData={countryData} />
            </div>

            {/* about country */}
            <div className="mx-auto mt-20 w-full space-y-4" id="about">
                <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                    About {countryData.name}
                </h3>
                <p>{countryData.description}</p>
            </div>

            {/* top universities */}
            <div id="university">
                <TopUniversities countryData={countryData} />
            </div>

            {/* admission requirements */}
            {countryData.docsAndCertification?.length ? (
                <div className="mx-auto mt-20 w-full" id="requirements">
                    <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                        Admission Requirements {countryData.name}
                    </h3>
                    <p className="mt-3">
                        Here are the major requirements to study in {countryData.name} which you need to ensure while
                        applying to a {countryData.name} university:
                    </p>

                    <CountryRequirements requirementList={countryData.docsAndCertification} />
                </div>
            ) : null}

            {/* study expense section */}
            <div id="study-cost">
                <StudyExpenses countryData={countryData} />
            </div>

            {/* popular courses */}
            <div className="mx-auto mt-20 w-full" id="streams">
                <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                    Popular Streams To Study in {countryData.name}
                </h3>

                <TopStreams />
            </div>

            {/* visa ad section */}
            {countryData.visaCategories?.length ? (
                <div className="mx-auto mt-20 w-full" id="visa">
                    <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium max-sm:text-lg">
                        Common Visa Categories in {countryData.name}
                    </h3>

                    <VisaCardContainer visaCategoryList={countryData.visaCategories} />
                </div>
            ) : null}

            {/* work section */}
            {countryData.workOpportunities ? (
                <div className="mx-auto mt-20 w-full" id="work">
                    <h3 className="border-l-primary-base border-l-4 pl-4 text-[22px] font-medium">
                        Work Opportunities in {countryData.name}
                    </h3>
                    <p className="mt-6">
                        Studying in the {countryData.countryCode ? countryData.countryCode : countryData.name} offers a
                        variety of experiences. The cultural and traditional values of the{' '}
                        {countryData.countryCode ? countryData.countryCode : countryData.name} attract several
                        international students every year. The popular areas of employment in{' '}
                        {countryData.countryCode ? countryData.countryCode : countryData.name} are as follows:
                    </p>

                    {/* work opportunities */}
                    <div className="mt-8">
                        <div className="rounded-lg bg-linear-to-r from-blue-500 from-30% to-sky-400 px-4 py-4 text-white">
                            <h3 className="font-semibold">Part-Time Work Opportunities</h3>
                            <p className="mt-1">- {countryData.workOpportunities.partTimeWork}</p>
                        </div>
                        <div className="mt-4 rounded-lg bg-linear-to-r from-blue-500 from-30% to-sky-400 px-4 py-4 text-white">
                            <h3 className="font-semibold">Post Study Work Opportunities</h3>
                            <p className="mt-1">- {countryData.workOpportunities.postStudyWork}</p>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* faq section */}
            {countryData.faqList?.length ? (
                <div id="faqs">
                    <FaqSection faqDataList={countryData.faqList} />
                </div>
            ) : null}
        </div>
    );
}
