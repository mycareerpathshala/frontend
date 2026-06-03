// imports
import FindCourseAd from '@/assets/components/global/FindCourseAd';
import HtmlViewer from '@/assets/components/global/HtmlViewer';
import MarkViewer from '@/assets/components/global/MarkViewer';
import SubHeader from '@/assets/components/global/SubHeader';
import FaqSection from '@/assets/components/universities/FaqSection';
import RequirementBlock from '@/assets/components/universities/RequirementBlock';
import { getFallbackData } from '@/assets/lib/cms/fetchFallback';
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import { formatDateToMonthYear } from '@/assets/utilities/helperFunction';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const universitiesResponse = await getUniversitiesId({ fields: ['documentId'] }, true);
    if (!universitiesResponse) return [];
    return universitiesResponse.data.map((university) => ({
        universityID: university.documentId,
    }));
}

export default async function AdmissionCriteriaPage({ params }: { params: Promise<{ universityID: string }> }) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;

    // fallback requirement data
    const queryString = {
        filters: {
            country: {
                documentId: {
                    $eq: universityData.location?.country?.documentId,
                },
            },
        },
        populate: {
            mbbsApplicationRequirements: true,
            generalApplicationRequirement: {
                populate: {
                    undergraduate: {
                        populate: {
                            applicationFee: true,
                            englishProficiencyRequirements: true,
                            standardizeExamRequirements: true,
                            midSchoolGPA: true,
                            highSchoolGPA: true,
                            bachelorGPA: true,
                            requiredDocuments: true,
                        },
                    },
                    postgraduate: {
                        populate: {
                            applicationFee: true,
                            englishProficiencyRequirements: true,
                            standardizeExamRequirements: true,
                            midSchoolGPA: true,
                            highSchoolGPA: true,
                            bachelorGPA: true,
                            requiredDocuments: true,
                        },
                    },
                },
            },
            docsAndCertification: true,
        },
    };

    const fallbackDataResponse = await getFallbackData(queryString, true);

    // ug and pg requirements data
    const ugRequirements =
        universityData.applicationRequirements?.find((requirementObj) => requirementObj.level === 'Undergraduate') ??
        fallbackDataResponse?.data.at(0)?.generalApplicationRequirement.undergraduate;
    const pgRequirements =
        universityData.applicationRequirements?.find((requirementObj) => requirementObj.level === 'Postgraduate') ??
        fallbackDataResponse?.data.at(0)?.generalApplicationRequirement.postgraduate;

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Admission Information" universityName={universityData.name} />

            {/* application dates */}
            {universityData.applicationDateList?.length ? (
                <div className="mt-6 w-full overflow-hidden rounded-lg border border-sky-300 px-6 pt-6 pb-8 shadow-sm max-sm:px-4">
                    <h3 className="flex flex-col border-l-4 border-blue-500 py-1 pl-4">
                        <span className="text-sm text-gray-400">{universityData.name}</span>
                        <span className="mt-1 text-2xl font-semibold text-blue-800">Application Dates</span>
                    </h3>
                    <div className="mt-6 flex w-full flex-col overflow-hidden rounded-lg border border-gray-200">
                        {/* Table Header */}
                        <div className="flex w-full divide-x divide-white border-b border-gray-200 bg-sky-200 font-semibold text-gray-700">
                            <div className="w-1/2 px-4 py-4 text-center tracking-wider">Application Session</div>
                            <div className="w-1/2 px-4 py-4 text-center tracking-wider">Deadlines / Dates</div>
                        </div>

                        {/* Table Body */}
                        <div className="flex flex-col divide-y divide-gray-200">
                            {universityData.applicationDateList.map((applicationDate, index) => (
                                <div
                                    key={index}
                                    className="flex w-full divide-x divide-gray-200 bg-white transition-colors"
                                >
                                    <div className="w-1/2 px-4 py-3 text-center text-gray-800">
                                        {applicationDate.session}
                                    </div>
                                    <div className="w-1/2 px-4 py-3 text-center text-gray-600">
                                        {formatDateToMonthYear(applicationDate.startDate)} -{' '}
                                        {formatDateToMonthYear(applicationDate.endDate)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Requirement block */}
            {ugRequirements && pgRequirements ? (
                <RequirementBlock
                    ugRequirements={ugRequirements}
                    pgRequirements={pgRequirements}
                    universityName={universityData.name}
                />
            ) : (
                <div className="rounded-lg px-6 py-8 shadow-md">
                    <p className="w-full rounded-lg bg-red-50 py-4 text-center text-lg text-red-900">
                        <span className="font-semibold">No application requirement</span> found for{' '}
                        <span className="font-semibold">{universityData.name}</span>
                    </p>
                </div>
            )}

            {universityData.admissionDynamicPage && (
                <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                    <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                        <h2 className="text-xl font-bold">{universityData.admissionDynamicPage.blockTitle}</h2>
                    </div>

                    <HtmlViewer content={universityData.admissionDynamicPage.blockContent} tailwindClass="px-6 py-4" />
                </div>
            )}

            {/* faqs */}
            {universityData.faqs && <FaqSection faqs={universityData.faqs} initialTopic="Admission" />}

            {/* find course ad */}
            <FindCourseAd />
        </>
    );
}
