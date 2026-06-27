/* eslint-disable @next/next/no-img-element */
// imports
import { mediaUrl } from '@/assets/utilities/mediaUrl';
import { CountryType } from '@/assets/types/countryTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import Link from 'next/link';
import { FaUniversity } from 'react-icons/fa';
import { HiArrowLongRight, HiCheckBadge, HiCircleStack, HiLanguage, HiMapPin, HiUsers } from 'react-icons/hi2';

export default function SingleCountryCard({ countryData }: { countryData: CountryType & StrapiDataType }) {
    return (
        <Link href={`/countries/${countryData.documentId}`} className="group block focus:outline-none">
            <article className="hover:ring-primary-base/30 relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
                {/* Banner */}
                <div className="relative h-64 w-full">
                    <img
                        src={`${mediaUrl(countryData.coverImage?.formats?.medium?.url)}`}
                        alt={`${countryData.name} Cover Image`}
                        className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Fees pill (like course card) */}

                    <div className="absolute top-4 flex w-full items-center justify-between px-4">
                        <div className="relative z-10 h-12 w-12 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">
                            <img
                                src={`${mediaUrl(countryData.countryFlag?.url)}`}
                                alt={`${countryData.name} Flag`}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/95 px-4 py-2 text-gray-800 backdrop-blur-sm">
                            {/* coin icon */}
                            <div>
                                {/* make it yellow or gradient yellow */}
                                <HiCircleStack className="size-8 text-yellow-500" />
                            </div>
                            <div className="text-right">
                                <div className="text-sm leading-5 font-semibold">
                                    <p>
                                        <span>{countryData.feesPerYear?.minimum}</span>
                                        <span>&nbsp;-&nbsp;</span>
                                        <span>{countryData.feesPerYear?.maximum}$</span>
                                    </p>
                                </div>
                                <div className="text-xs text-gray-600">Avg tuition / year</div>
                            </div>
                        </div>
                    </div>

                    {/* Title + location */}
                    <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3">
                        <h3 className="text-2xl font-semibold text-white drop-shadow-sm">{countryData.name}</h3>
                        <div className="hover:text-primary-base ml-auto hidden items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur transition duration-200 ease-in-out group-hover:flex">
                            Explore
                            <div>
                                <HiArrowLongRight className="size-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 pt-7">
                    {/* Location */}
                    <div className="mb-4 flex items-center gap-2 text-gray-700">
                        <div>
                            <HiMapPin className="text-primary-light/60 size-6" />
                        </div>
                        <span className="font-medium">{countryData.capital}</span>
                        <span>&nbsp;&bull;&nbsp;</span>
                        <span className="text-gray-500">{countryData.countryCode}</span>
                    </div>

                    {/* Quick facts chips (follow your rounded chip style) */}
                    <div className="flex flex-wrap gap-2.5">
                        <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                            <span>
                                <FaUniversity className="text-primary-light size-6" />
                            </span>

                            <span className="font-medium text-gray-800">{countryData.numOfUniversities}</span>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                            <span>
                                <HiLanguage className="text-primary-light size-6" />
                            </span>

                            <span className="font-medium text-gray-800">{countryData.nativeLanguage}</span>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                            <span>
                                <HiCheckBadge className="text-primary-light size-6" />
                            </span>

                            <span className="font-medium text-gray-800">{countryData.visaSuccessRate}% Visa</span>
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm">
                            <span>
                                <HiUsers className="text-primary-light size-6" />
                            </span>
                            <span className="font-medium text-gray-800 capitalize">
                                {countryData.estimatedPopulation?.value}&nbsp;
                                {countryData.estimatedPopulation?.selectUnit}
                            </span>
                        </span>
                    </div>

                    {/* Footer CTA (full-width like your course card bar) */}
                    <div className="mt-5 overflow-hidden rounded-xl">
                        <div className="from-primary-base flex h-11 w-full items-center justify-center bg-linear-to-r to-blue-600 text-white transition group-hover:brightness-105">
                            Explore Country
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
