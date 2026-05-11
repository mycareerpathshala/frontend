// imports
import FindCourseAd from '@/assets/components/global/FindCourseAd';
import SubHeader from '@/assets/components/global/SubHeader';
import CourseListAll from '@/assets/components/universities/CourseListAll';
import FaqSection from '@/assets/components/universities/FaqSection';
import FeesOverview from '@/assets/components/universities/FeesOverview';
import ImportantDates from '@/assets/components/universities/ImportantDates';
import { getCoursesForUniversity } from '@/assets/lib/cms/fetchCourse';
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const universitiesResponse = await getUniversitiesId({ fields: ['documentId'] }, true);
    if (!universitiesResponse) return [];
    return universitiesResponse.data.map((university) => ({
        universityID: university.documentId,
    }));
}

export default async function CourseAndFeesPage({ params }: { params: Promise<{ universityID: string }> }) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;

    const universityCourseDataResponse = await getCoursesForUniversity(
        universityData.documentId,
        {
            filters: {
                university: {
                    documentId: {
                        $eq: universityData.documentId,
                    },
                },
            },
            populate: {
                tuitionFeeByYear: true,
                stream: true,
            },
        },
        true,
    );

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Course & Fee Details" universityName={universityData.name} />

            {/* important dates */}
            {universityData.importantDateList?.length ? (
                <ImportantDates
                    importantDateList={universityData.importantDateList}
                    universityName={universityData.name}
                />
            ) : null}

            {/* fees overview */}
            <FeesOverview universityData={universityData} />

            {/* courses list */}
            {universityCourseDataResponse?.data.length ? (
                <CourseListAll courseDataList={universityCourseDataResponse?.data} universityData={universityData} />
            ) : null}

            {/* faqs */}
            {universityData.faqs && <FaqSection faqs={universityData.faqs} initialTopic="Course" />}

            {/* find course ad */}
            <FindCourseAd />
        </>
    );
}
