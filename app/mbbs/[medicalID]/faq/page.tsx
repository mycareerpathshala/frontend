// imports
import FaqBlock from '@/assets/components/mbbs/FaqBlock';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const medicalResponse = await getMedicalCollegesData({ fields: ['documentId'] }, true);
    if (!medicalResponse) return [];
    return medicalResponse.data.map((medical) => ({
        medicalID: medical.documentId,
    }));
}

export default async function FAQPage({ params }: { params: Promise<{ medicalID: string }> }) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;

    return (
        <>
            {/* sub header */}
            {/* <SubHeader headerTitle="FAQ's" universityName={medicalData.name} /> */}

            {/* faq block */}
            <div className="rounded-xl border border-gray-200 bg-linear-to-r px-4 py-6 text-center shadow-md">
                <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-indigo-700 md:text-6xl">FAQs</h1>
                <p className="mb-2 text-xl font-semibold text-gray-800 md:text-2xl">{medicalData.name}</p>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                    Common questions asked: We&apos;re here to help with all your questions and answers in one place.
                </p>
                {medicalData.faqs?.length ? <FaqBlock faqData={medicalData.faqs} /> : null}
            </div>
        </>
    );
}
