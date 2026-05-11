// imports
import MarkViewer from '@/assets/components/global/MarkViewer';
import SubHeader from '@/assets/components/global/SubHeader';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const medicalResponse = await getMedicalCollegesData({ fields: ['documentId'] }, true);
    if (!medicalResponse) return [];
    return medicalResponse.data.map((medical) => ({
        medicalID: medical.documentId,
    }));
}

export default async function SyllabusPage({ params }: { params: Promise<{ medicalID: string }> }) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Syllabus" universityName={medicalData.name} />

            {/* dynamic content */}
            {medicalData.syllabusDynamicPage && (
                <MarkViewer
                    tailwindClass="mt-4 rounded-lg border border-gray-200 px-6 py-6"
                    content={medicalData.syllabusDynamicPage.blockContent}
                />
            )}
        </>
    );
}
