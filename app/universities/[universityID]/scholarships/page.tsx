// imports
import { Metadata } from 'next';
import FindCourseAd from '@/assets/components/global/FindCourseAd';
import HtmlViewer from '@/assets/components/global/HtmlViewer';
import SubHeader from '@/assets/components/global/SubHeader';
import FaqSection from '@/assets/components/universities/FaqSection';

export async function generateMetadata({ params }: { params: Promise<{ universityID: string }> }): Promise<Metadata> {
    const { universityID } = await params;
    const { getSingleUniversityData } = await import('@/assets/lib/cms/fetchUniversity');
    const res = await getSingleUniversityData(universityID);
    if (!res?.data) return { title: 'Scholarships — University' };
    return { title: `${res.data.name} — Scholarships`, description: `Available scholarships and financial aid at ${res.data.name}. Explore merit-based, need-based, and government scholarships for international students.` };
}
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const universitiesResponse = await getUniversitiesId({ fields: ['documentId'] }, true);
    if (!universitiesResponse) return [];
    return universitiesResponse.data.map((university) => ({
        universityID: university.documentId,
    }));
}

export default async function ScholarshipsPage({ params }: { params: Promise<{ universityID: string }> }) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;

    if (!universityData.scholarshipDynamicPage) {
        notFound();
    }

    return (
        <>
            <SubHeader headerTitle="Scholarships & Financial Aid" universityName={universityData.name} />

            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
                <HtmlViewer content={universityData.scholarshipDynamicPage.blockContent} tailwindClass="px-6 py-4" />
            </div>

            {universityData.faqs && <FaqSection faqs={universityData.faqs} initialTopic="University" />}

            <FindCourseAd />
        </>
    );
}
