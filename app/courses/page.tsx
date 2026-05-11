// imports
import { Metadata } from 'next';
import CourseBanner from '@/assets/components/course/CourseBanner';

export const metadata: Metadata = {
    title: 'Find Courses Abroad — By Country & Stream',
    description: 'Search thousands of international courses by country, subject stream, study level, and delivery method. Find the perfect course for your study abroad goals.',
    openGraph: {
        title: 'Find Courses Abroad — By Country & Stream | My Career Pathshala',
        description: 'Search international courses by country, stream, and study level. Find your perfect course abroad.',
        type: 'website',
    },
};
import FindCourse from '@/assets/components/course/FindCourse';
import FindUniversityAd from '@/assets/components/global/FindUniversityAd';
import SpinnerMini from '@/assets/components/global/SpinnerMini';
import { getCountriesData } from '@/assets/lib/cms/fetchCountry';
import { getStreamsData } from '@/assets/lib/cms/fetchStream';
import { Suspense } from 'react';

export default async function CoursesPage() {
    // caching data
    const countryDataResponse = await getCountriesData(
        {
            fields: ['id', 'documentId', 'name', 'countryCode', 'nativeLanguage'],
            populate: {
                countryFlag: true,
            },
        },
        true,
    );

    const streamDataResponse = await getStreamsData(
        {
            fields: ['id', 'documentId', 'name'],
            populate: {
                streamCover: true,
            },
        },
        true,
    );

    // single fallback data
    // const admissionRequirementsFallback = await getCountryAdmissionRequirements(
    //     {
    //         populate: {
    //             ugRequirements: {
    //                 populate: {
    //                     applicationFee: true,
    //                     gpaRequirements: true,
    //                     englishProficiencyRequirements: true,
    //                     standardizeExamRequirements: true,
    //                     requiredDocuments: true,
    //                 },
    //             },
    //             pgRequirements: {
    //                 populate: {
    //                     applicationFee: true,
    //                     gpaRequirements: true,
    //                     englishProficiencyRequirements: true,
    //                     standardizeExamRequirements: true,
    //                     requiredDocuments: true,
    //                 },
    //             },
    //         },
    //     },
    //     true,
    // );

    return (
        <main className="mx-auto w-full max-w-7xl bg-white px-4 py-8">
            {/* top header */}
            <CourseBanner />

            {/* main section - find course */}
            <Suspense fallback={<SpinnerMini />}>
                {countryDataResponse && streamDataResponse ? (
                    <FindCourse countryDataResponse={countryDataResponse} streamDataResponse={streamDataResponse} />
                ) : null}
            </Suspense>

            <div className="mt-8">
                <FindUniversityAd />
            </div>
        </main>
    );
}
