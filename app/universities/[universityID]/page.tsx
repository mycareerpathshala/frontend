// imports
import MarkViewer from '@/assets/components/global/MarkViewer';
import SubHeader from '@/assets/components/global/SubHeader';
import FaqSection from '@/assets/components/universities/FaqSection';
import HighlightNotice from '@/assets/components/universities/HighlightNotice';
import InfoCards from '@/assets/components/universities/InfoCards';
import KeyHighlights from '@/assets/components/universities/KeyHighlights';
import Rankings from '@/assets/components/universities/Ranking';
import UniversityCourses from '@/assets/components/universities/UniversityCourses';
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const universitiesResponse = await getUniversitiesId({ fields: ['documentId'] }, true);

    if (!universitiesResponse) return [];

    return universitiesResponse.data.map((university) => ({
        universityID: university.documentId,
    }));
}

export default async function SingleUniversityPage({ params }: { params: Promise<{ universityID: string }> }) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;

    return (
        <>
            <SubHeader headerTitle="Overview" universityName={universityData.name} />

            {/* university hightlights */}
            {universityData.highlightNoticeList?.length ? (
                <HighlightNotice
                    universityName={universityData.name}
                    highlightNoticeList={universityData.highlightNoticeList}
                />
            ) : null}

            {/* info cards */}
            <InfoCards universityData={universityData} />

            {/* counselling ad */}
            <div className="mt-8 flex items-center justify-between rounded-lg bg-[linear-gradient(to_right,#f16587,#f7bacd)] p-4 max-lg:flex-col max-lg:items-start max-lg:gap-3.5">
                <p className="text-sm font-medium">Need expert assistance in securing enrolment at this university?</p>
                <div className="flex items-center gap-3.5 text-sm max-lg:flex-col max-lg:items-start">
                    <Link
                        href="/dashboard/counselling"
                        className="bg-secondary-base cursor-pointer rounded-lg px-6 py-2 font-bold whitespace-nowrap text-white select-none max-md:font-medium"
                    >
                        Talk to Counsellor
                    </Link>
                    <p className="font-medium whitespace-nowrap">
                        Its <span className="font-bold">FREE</span>
                    </p>
                </div>
            </div>

            {/* about section */}
            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                    <h2 className="text-xl font-bold">About {universityData.name}</h2>
                </div>

                {/* <MarkdownViewer content={universityData.shortDescription} /> */}
                <MarkViewer tailwindClass="px-4 pb-4" content={universityData.fullDescription} />
            </div>

            {/* key highlights section */}
            <KeyHighlights universityData={universityData} />

            {/* university ranking component */}
            {universityData.rankingInfo?.length ? (
                <Rankings rankingList={universityData.rankingInfo} universityData={universityData} />
            ) : null}

            {/* course section */}
            <UniversityCourses universityData={universityData} />

            {/* faqs */}
            {universityData.faqs && <FaqSection faqs={universityData.faqs} initialTopic="University" />}
        </>
    );
}
