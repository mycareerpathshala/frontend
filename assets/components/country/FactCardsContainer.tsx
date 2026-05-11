/* eslint-disable @next/next/no-img-element */
// imports

import { CountryType } from '@/assets/types/countryTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';

// local components
function FactCard({
    imgUrl,
    imgAlt,
    cardTitle,
    cardValue,
}: {
    imgUrl: string;
    imgAlt: string;
    cardTitle: string;
    cardValue: string;
}) {
    return (
        <div className="bg-primary-gray flex items-center gap-4 rounded-xl p-3 max-sm:gap-3 max-sm:p-2.5">
            <div>
                <img src={imgUrl} alt={imgAlt} className="size-10" />
            </div>
            <div className="space-y-0.5">
                <p className="font-medium capitalize">{cardValue}</p>
                <h4 className="text-sm text-zinc-600 capitalize">{cardTitle}</h4>
            </div>
        </div>
    );
}

export default function FactCardsContainer({ countryData }: { countryData: CountryType & StrapiDataType }) {
    return (
        <div className="grid grid-cols-4 gap-4 max-[1160px]:grid-cols-3 max-md:grid-cols-2 max-sm:gap-3">
            {/* capital */}
            {countryData.capital && (
                <FactCard
                    imgUrl="/img/country/facts_icon/capital_icon.png"
                    imgAlt="Capital Icon"
                    cardTitle="Capital"
                    cardValue={countryData.capital}
                />
            )}

            {/* population */}
            {countryData?.estimatedPopulation && (
                <FactCard
                    imgUrl="/img/country/facts_icon/population_icon.png"
                    imgAlt="Population Icon"
                    cardTitle="Population"
                    cardValue={`${countryData.estimatedPopulation.value} ${countryData.estimatedPopulation.selectUnit}`}
                />
            )}

            {/* country gdp */}
            {countryData.countryGDB && (
                <FactCard
                    imgUrl="/img/country/facts_icon/gdp_icon.png"
                    imgAlt="Country GDP Icon"
                    cardTitle="Country GDP"
                    cardValue={`${countryData.countryGDB.value} ${countryData.countryGDB.selectUnit}`}
                />
            )}

            {/* universities */}
            {countryData.numOfUniversities && (
                <FactCard
                    imgUrl="/img/country/facts_icon/university_icon.png"
                    imgAlt="Universities Icon"
                    cardTitle="Universities"
                    cardValue={countryData.numOfUniversities.toString()}
                />
            )}

            {/* language */}
            {countryData.nativeLanguage && (
                <FactCard
                    imgUrl="/img/country/facts_icon/language_icon.png"
                    imgAlt="Language Icon"
                    cardTitle="Language"
                    cardValue={countryData.nativeLanguage}
                />
            )}

            {/* international students */}
            {countryData.numOfIntlStudents && (
                <FactCard
                    imgUrl="/img/country/facts_icon/intl_students_icon.png"
                    imgAlt="International Students Icon"
                    cardTitle="International Students"
                    cardValue={Number(countryData.numOfIntlStudents).toLocaleString('en-US')}
                />
            )}

            {/* monthly cost */}
            {countryData.costOfLiving && (
                <FactCard
                    imgUrl="/img/country/facts_icon/cost_icon.png"
                    imgAlt="Cost Icon"
                    cardTitle="Monthly Living Cost"
                    cardValue={`$${countryData.costOfLiving.minimum}-${countryData.costOfLiving.maximum}`}
                />
            )}

            {/* visa success rate */}
            {countryData.visaSuccessRate && (
                <FactCard
                    imgUrl="/img/country/facts_icon/visa_icon.png"
                    imgAlt="VISA Icon"
                    cardTitle="VISA Success Rate"
                    cardValue={`${countryData.visaSuccessRate.toString()}%`}
                />
            )}

            {/* currency */}
            {countryData.countryCurrency && (
                <FactCard
                    imgUrl="/img/country/facts_icon/currency_icon.png"
                    imgAlt="Currency Icon"
                    cardTitle="Currency"
                    cardValue={countryData.countryCurrency}
                />
            )}

            {/* fees per year */}
            {countryData.feesPerYear && (
                <FactCard
                    imgUrl="/img/country/facts_icon/tuition_fee_icon.png"
                    imgAlt="Fees Icon"
                    cardTitle="Avg. Fees Per Year"
                    cardValue={`$${countryData.feesPerYear.minimum}-${countryData.feesPerYear.maximum}`}
                />
            )}
        </div>
    );
}
