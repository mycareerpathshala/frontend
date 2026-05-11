// imports

import SubHeader from '@/assets/components/global/SubHeader';
import RequirementMax from '@/assets/components/mbbs/RequirementMax';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const medicalResponse = await getMedicalCollegesData({ fields: ['documentId'] }, true);
    if (!medicalResponse) return [];
    return medicalResponse.data.map((medical) => ({
        medicalID: medical.documentId,
    }));
}

export default async function AdmissionCriteriaPage({ params }: { params: Promise<{ medicalID: string }> }) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;
    // console.log(medicalData);

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Admission Criteria" universityName={medicalData.name} />

            {/* all requirements */}
            {medicalData.applicationRequirements && (
                <RequirementMax applicationRequirements={medicalData.applicationRequirements} />
            )}
        </>
    );
}
