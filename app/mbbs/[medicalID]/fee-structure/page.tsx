// imports
import { Metadata } from 'next';
import HtmlViewer from '@/assets/components/global/HtmlViewer';
import SubHeader from '@/assets/components/global/SubHeader';
import { getMedicalCollegesData, getSingleMedicalData } from '@/assets/lib/cms/fetchMedical';

export async function generateMetadata({ params }: { params: Promise<{ medicalID: string }> }): Promise<Metadata> {
    const { medicalID } = await params;
    const res = await getSingleMedicalData(medicalID);
    if (!res?.data) return { title: 'Fee Structure — MBBS College' };
    return { title: `${res.data.name} — Fee Structure`, description: `Complete fee structure and yearly tuition breakdown for MBBS at ${res.data.name}. Compare costs and plan your budget.` };
}
import { TuitionFeeByYearType } from '@/assets/types/componentTypes';
import { notFound } from 'next/navigation';
import { HiBanknotes, HiCurrencyDollar } from 'react-icons/hi2';

export async function generateStaticParams() {
    const medicalResponse = await getMedicalCollegesData({ fields: ['documentId'] }, true);
    if (!medicalResponse) return [];
    return medicalResponse.data.map((medical) => ({
        medicalID: medical.documentId,
    }));
}

export default async function FeeStructurePage({ params }: { params: Promise<{ medicalID: string }> }) {
    const { medicalID } = await params;
    const medicalDataResponse = await getSingleMedicalData(medicalID);

    if (!medicalDataResponse || !medicalDataResponse.data) {
        notFound();
    }

    const { data: medicalData } = medicalDataResponse;

    return (
        <>
            {/* sub header */}
            <SubHeader headerTitle="Fees Structure" universityName={medicalData.name} />

            <div className="mt-8 rounded-lg border border-gray-200 p-6 pb-12 max-md:p-3">
                <h2 className="text-[22px] font-medium">Fees for International Students</h2>

                <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
                    <div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-linear-to-r from-[#F0F5FD] to-[#B9EAFF] px-4 py-2 max-sm:gap-2 max-sm:p-2 max-sm:pb-4">
                            <HiBanknotes className="size-12 stroke-1 text-sky-400 max-sm:size-8" />
                            <h3>
                                <span className="text-primary-base max-sm:text-sm">
                                    {medicalData.acronym ? medicalData.acronym : medicalData.name}
                                    &nbsp;Fees
                                </span>
                                <div className="flex items-center gap-2 text-xl leading-tight font-medium max-sm:flex-col max-sm:items-start max-sm:text-sm">
                                    <span>Total Tuition Fee</span>
                                </div>
                            </h3>
                        </div>
                    </div>
                    <div className="overflow-hidden overflow-x-auto rounded-lg max-[350px]:mx-auto max-[350px]:w-65">
                        <table className="w-full table-auto border-separate overflow-hidden px-4 py-4 max-md:p-2">
                            <thead>
                                <tr>
                                    <th className="w-[320px] text-left font-normal max-md:w-auto">
                                        <span className="block h-full w-full border border-transparent bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                            Type
                                        </span>
                                    </th>
                                    <th className="text-left font-normal">
                                        <span className="block h-full w-full border border-l-2 border-transparent border-l-white bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                            Expenses
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="*:odd:bg-primary-gray">
                                <tr>
                                    <td>
                                        <span className="h-full w-full overflow-hidden bg-indigo-50 py-3 pl-6 text-sm whitespace-nowrap max-sm:p-3">
                                            Total Tuition Fee
                                        </span>
                                    </td>
                                    {medicalData.totalTuitionFee ? (
                                        <td>
                                            <span className="flex h-full w-full items-center gap-0.5 bg-indigo-50 py-3 pl-6 text-sm max-sm:p-3">
                                                <span className="whitespace-nowrap">
                                                    <span>${medicalData.totalTuitionFee}</span>
                                                </span>
                                            </span>
                                        </td>
                                    ) : (
                                        <td className="py-3 pl-6">
                                            <span>-&nbsp;/&nbsp;-</span>
                                        </td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* tuition fee by year */}
                {medicalData.tuitionFeeByYear?.length ? (
                    <div className="mt-12 overflow-hidden rounded-lg shadow-lg">
                        <div>
                            <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-linear-to-r from-[#F0F5FD] to-[#B9EAFF] px-4 py-2 max-sm:gap-2 max-sm:p-2">
                                <HiBanknotes className="size-12 stroke-1 text-sky-400 max-sm:size-8" />
                                <h3>
                                    <span className="text-primary-base max-sm:text-sm">
                                        {medicalData.acronym ? medicalData.acronym : medicalData.name}
                                        &nbsp;Fees
                                    </span>
                                    <div className="flex items-center gap-2 text-xl leading-tight font-medium max-sm:flex-col max-sm:items-start max-sm:text-sm">
                                        <span>Tuition Fee Per Year</span>
                                        <div className="flex w-fit items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 max-sm:text-xs">
                                            <span>
                                                <HiCurrencyDollar className="size-6 text-amber-600" />
                                            </span>{' '}
                                            <span>USD</span>
                                        </div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-[350px]:mx-auto max-[350px]:w-65">
                            <table className="w-full table-auto border-separate overflow-hidden px-6 py-8 max-md:p-2">
                                <thead>
                                    <tr>
                                        <th className="w-[320px] text-left font-normal max-md:w-auto">
                                            <span className="block h-full w-full border border-transparent bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                                Year
                                            </span>
                                        </th>
                                        <th className="text-left font-normal">
                                            <span className="block h-full w-full border border-l-2 border-transparent border-l-white bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                                Expenses
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="*:odd:bg-primary-gray">
                                    {medicalData.tuitionFeeByYear.map((entry: TuitionFeeByYearType, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td className="py-3 pl-6 text-sm capitalize max-sm:p-3">
                                                    {entry.selectYear}
                                                </td>
                                                <td className="py-3 pl-6 text-sm max-sm:p-3">
                                                    {entry.tuitionFee}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}

                {medicalData.otherFees?.length ? (
                    <div className="mt-12 overflow-hidden rounded-lg shadow-lg">
                        <div>
                            <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-linear-to-r from-[#F0F5FD] to-[#B9EAFF] px-4 py-2 max-sm:gap-2 max-sm:p-2">
                                <HiBanknotes className="size-12 stroke-1 text-sky-400 max-sm:size-8" />
                                <h3>
                                    <span className="text-primary-base max-sm:text-sm">
                                        {medicalData.acronym ? medicalData.acronym : medicalData.name}
                                        &nbsp;Fees
                                    </span>
                                    <div className="flex items-center gap-2 text-xl leading-tight font-medium max-sm:flex-col max-sm:items-start max-sm:text-sm">
                                        <span>Other Fees & Expenses (Average)&nbsp;|&nbsp;in&nbsp;</span>
                                        <div className="flex w-fit items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 max-sm:text-xs">
                                            <span>
                                                <HiCurrencyDollar className="size-6 text-amber-600" />
                                            </span>{' '}
                                            <span>USD</span>
                                        </div>
                                    </div>
                                </h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-[350px]:mx-auto max-[350px]:w-65">
                            <table className="w-full table-auto border-separate overflow-hidden px-6 py-8 max-md:p-2">
                                <thead>
                                    <tr>
                                        <th className="w-[320px] text-left font-normal max-md:w-auto">
                                            <span className="block h-full w-full border border-transparent bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                                Type
                                            </span>
                                        </th>
                                        <th className="text-left font-normal">
                                            <span className="block h-full w-full border border-l-2 border-transparent border-l-white bg-indigo-200 py-3 pl-6 text-sm max-sm:p-3">
                                                Expenses
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="*:odd:bg-primary-gray">
                                    {medicalData.otherFees.map(
                                        (
                                            entry: {
                                                id: number;
                                                name: string;
                                                amount: number;
                                            },
                                            index: number,
                                        ) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="py-3 pl-6 text-sm capitalize max-sm:p-3">
                                                        {entry.name}
                                                    </td>
                                                    <td className="py-3 pl-6 text-sm max-sm:p-3">
                                                        {entry.amount}
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* fee dynamic content */}
            {medicalData.feeDynamicPage && (
                <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
                    <div className="mb-4 w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                        <h2 className="text-xl font-bold">{medicalData.feeDynamicPage.blockTitle}</h2>
                    </div>
                    <HtmlViewer content={medicalData.feeDynamicPage.blockContent} tailwindClass="px-6 py-4" />
                </div>
            )}
        </>
    );
}
