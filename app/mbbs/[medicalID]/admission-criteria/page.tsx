// imports
import { Metadata } from 'next';
import SubHeader from '@/assets/components/global/SubHeader';
import RequirementMax from '@/assets/components/mbbs/RequirementMax';
import { getFallbackData } from '@/assets/lib/cms/fetchFallback';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';

export async function generateMetadata({ params }: { params: Promise<{ medicalID: string }> }): Promise<Metadata> {
    const { medicalID } = await params;
    const res = await getSingleMedicalData(medicalID);
    if (!res?.data) return { title: 'Admission Criteria — MBBS College' };
    return { title: `${res.data.name} — Admission Criteria`, description: `Eligibility and admission requirements for MBBS at ${res.data.name}. Check NEET scores, age limit, and document checklist.` };
}
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

    // fallback requirement data — filtered by the college's country
    const fallbackDataResponse = await getFallbackData(
        {
            filters: {
                country: {
                    documentId: { $eq: medicalData.location?.country?.documentId },
                },
            },
            populate: {
                mbbsApplicationRequirements: {
                    populate: {
                        englishProficiency: true,
                        applicationDateList: true,
                    },
                },
            },
        },
        true,
    );

    const requirements =
        medicalData.applicationRequirements ??
        fallbackDataResponse?.data.at(0)?.mbbsApplicationRequirements;

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Admission Criteria" universityName={medicalData.name} />

            {/* all requirements */}
            {requirements ? (
                <RequirementMax applicationRequirements={requirements} />
            ) : (
                <div className="rounded-lg px-6 py-8 shadow-md">
                    <p className="w-full rounded-lg bg-red-50 py-4 text-center text-lg text-red-900">
                        <span className="font-semibold">No admission requirements</span> found for{' '}
                        <span className="font-semibold">{medicalData.name}</span>
                    </p>
                </div>
            )}
        </>
    );
}
