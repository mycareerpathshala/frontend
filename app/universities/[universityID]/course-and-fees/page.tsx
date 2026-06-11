// imports
import { Metadata } from 'next';
import FindCourseAd from '@/assets/components/global/FindCourseAd';
import SubHeader from '@/assets/components/global/SubHeader';
import CourseListAll from '@/assets/components/universities/CourseListAll';
import FaqSection from '@/assets/components/universities/FaqSection';

export async function generateMetadata({ params }: { params: Promise<{ universityID: string }> }): Promise<Metadata> {
    const { universityID } = await params;
    const { getSingleUniversityData } = await import('@/assets/lib/cms/fetchUniversity');
    const res = await getSingleUniversityData(universityID);
    if (!res?.data) return { title: 'Courses & Fees — University' };
    return { title: `${res.data.name} — Courses & Fees`, description: `Browse all programs and tuition fees at ${res.data.name}. Compare undergraduate, postgraduate, and PhD courses with full fee breakdown.` };
}
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
