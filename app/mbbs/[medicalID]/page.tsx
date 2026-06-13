// imports
import HtmlViewer from '@/assets/components/global/HtmlViewer';
import MarkViewer from '@/assets/components/global/MarkViewer';
import FaqSection from '@/assets/components/mbbs/FaqSection';
import FeeStructure from '@/assets/components/mbbs/FeeStructure';
import FmgePassingRatio from '@/assets/components/mbbs/FmgePassingRatio';
import HighlightNotice from '@/assets/components/mbbs/HighlightNotice';
import InfoCards from '@/assets/components/mbbs/InfoCards';
import KeyHighlights from '@/assets/components/mbbs/KeyHighlights';
import MbbsApplyButton from '@/assets/components/mbbs/MbbsApplyButton';
import RequirementMin from '@/assets/components/mbbs/RequirementMin';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ medicalID: string }> }): Promise<Metadata> {
    const { medicalID } = await params;
    const res = await getSingleMedicalData(medicalID);
    if (!res?.data) return { title: 'MBBS College' };
    const { name } = res.data;
    const countryName = res.data.location?.country?.name ?? '';
    return {
        title: `${name} — MBBS Abroad${countryName ? ` in ${countryName}` : ''}`,
        description: `Explore MBBS at ${name}${countryName ? ` in ${countryName}` : ''}. View fees, eligibility, NMC recognition, FMGE passing rate, and admission details on Mycareerpathshala.`,
    };
}

export async function generateStaticParams() {
    const medicalResponse = await getMedicalCollegesData({ fields: ['documentId'] }, true);

    if (!medicalResponse) return [];

    return medicalResponse.data.map((medical) => ({
        medicalID: medical.documentId,
    }));
}

export default async function SingleMedicalPage({ params }: { params: Promise<{ medicalID: string }> }) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;

    return (
        <>
            {/* highlight notice */}
            {medicalData.highlightNoticeList?.length ? (
                <HighlightNotice highlightNoticeList={medicalData.highlightNoticeList} collegeName={medicalData.name} />
            ) : null}

            {/* info cards */}
            <InfoCards medicalData={medicalData} />

            {/* counselling ad + apply */}
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
                    <MbbsApplyButton
                        collegeDocumentId={medicalData.documentId}
                        collegeName={medicalData.name}
                        collegeAcronym={medicalData.acronym}
                        country={medicalData.location?.country?.name}
                    />
                </div>
            </div>

            {/* about section */}
            <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                    <h2 className="text-xl font-bold">About {medicalData.name}</h2>
                </div>

                {/* <MarkdownViewer content={medicalData.shortDescription} /> */}
                <MarkViewer tailwindClass="px-4 pb-4" content={medicalData.fullDescription} />
            </div>

            {/* key highlights section */}
            <KeyHighlights medicalData={medicalData} />

            {/* fmge passing ratio & world rank */}
            {medicalData.fmgePassingRecordByYear?.length ? (
                <FmgePassingRatio fmgePassingRatioData={medicalData.fmgePassingRecordByYear} />
            ) : null}

            {/* fee structure */}
            {medicalData.tuitionFeeByYear ? (
                <FeeStructure
                    tuitionFeeByYear={medicalData.tuitionFeeByYear}
                    totalTuitionFee={medicalData.totalTuitionFee}
                />
            ) : null}

            {/* requirement section */}
            {medicalData.applicationRequirements ? (
                <RequirementMin applicationRequirements={medicalData.applicationRequirements} />
            ) : null}

            {/* overview dynamic content */}
            {medicalData.overviewDynamicPage && (
                <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                    <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                        <h2 className="text-xl font-bold">{medicalData.overviewDynamicPage.blockTitle}</h2>
                    </div>
                    <HtmlViewer content={medicalData.overviewDynamicPage.blockContent} tailwindClass="px-6 py-4" />
                </div>
            )}

            {/* faq section */}
            {medicalData.faqs?.length ? <FaqSection faqs={medicalData.faqs} initialTopic="College" /> : null}
        </>
    );
}
