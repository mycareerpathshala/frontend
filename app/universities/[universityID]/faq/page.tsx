// imports
import { Metadata } from 'next';
import FaqBlock from '@/assets/components/universities/FaqBlock';
import { getSingleUniversityData, getUniversitiesId } from '@/assets/lib/cms/fetchUniversity';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ universityID: string }> }): Promise<Metadata> {
    const { universityID } = await params;
    const res = await getSingleUniversityData(universityID);
    if (!res?.data) return { title: 'FAQs — University' };
    return { title: `${res.data.name} — FAQs`, description: `Frequently asked questions about ${res.data.name}. Get answers about admissions, fees, scholarships, and student life.` };
}

export async function generateStaticParams() {
    const universitiesResponse = await getUniversitiesId({ fields: ['documentId'] }, true);
    if (!universitiesResponse) return [];
    return universitiesResponse.data.map((university) => ({
        universityID: university.documentId,
    }));
}

export default async function FAQPage({ params }: { params: Promise<{ universityID: string }> }) {
    const { universityID } = await params;
    const universityDataResponse = await getSingleUniversityData(universityID);

    if (!universityDataResponse || !universityDataResponse.data) {
        notFound();
    }

    const { data: universityData } = universityDataResponse;
    return (
        <>
            <div className="rounded-xl border border-gray-200 bg-linear-to-r px-4 py-6 text-center shadow-md max-sm:px-2">
                <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-indigo-700 md:text-6xl">FAQs</h1>
                <p className="mb-2 text-xl font-semibold text-gray-800 md:text-2xl">{universityData.name}</p>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
                    Common questions asked: We&apos;re here to help with all your questions and answers in one place.
                </p>
                {universityData.faqs?.length ? (
                    <FaqBlock faqData={universityData.faqs} />
                ) : (
                    <div className="px-6 py-8">
                        <p className="w-full rounded-lg bg-red-50 py-1 text-center text-lg text-red-900">
                            <span className="font-semibold">No faqs</span> found for{' '}
                            <span className="font-semibold">{universityData.name}</span>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
