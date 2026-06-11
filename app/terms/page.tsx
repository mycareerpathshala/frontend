import MarkViewerBlog from '@/assets/components/blogs/MarkViewBlog';
import { getTermsData } from '@/assets/lib/cms/fetchTerms';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | My Career Pathshala',
    description: 'Read the Terms and Conditions governing the use of My Career Pathshala services.',
};

export default async function TermsPage() {
    const termsData = await getTermsData(true);

    const lastUpdated = termsData?.data?.updatedAt
        ? new Date(termsData.data.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    return (
        <main className="mt-8 mb-16 px-4">
            <section className="mx-auto w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 max-sm:text-3xl">Terms &amp; Conditions</h1>
                {lastUpdated && <p className="mt-2 text-sm text-slate-500">Last updated: {lastUpdated}</p>}
                <div className="mt-8">
                    {termsData?.data?.termsContent ? (
                        <MarkViewerBlog content={termsData.data.termsContent} />
                    ) : (
                        <p className="text-slate-500">Terms and Conditions are not available at the moment.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
