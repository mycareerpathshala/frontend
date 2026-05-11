// imports
import { StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityType } from '@/assets/types/universityTypes';
import { HiBanknotes, HiCurrencyDollar } from 'react-icons/hi2';

export default function FeesOverview({ universityData }: { universityData: UniversityType & StrapiDataType }) {
    return (
        <div className="mt-8 rounded-lg border border-gray-200 p-6 pb-12 max-md:p-3">
            <h2 className="text-[22px] font-medium max-md:text-xl max-sm:text-lg">Fees for International Students</h2>
            <p className="mt-2 max-sm:text-sm">
                {universityData.acronym ? universityData.acronym : universityData.name} offers a diverse range of
                courses designed to meet the evolving needs of students from around the world. Each program is crafted
                to provide a strong foundation in both theoretical knowledge and practical skills, ensuring graduates
                are well-prepared for success in their chosen fields. With experienced faculty, modern facilities, and a
                commitment to academic excellence,{' '}
                {universityData.acronym ? universityData.acronym : universityData.name} empowers students to pursue
                their passions and achieve their career goals in a dynamic and supportive learning environment.
            </p>

            <div className="mt-8 overflow-hidden rounded-lg shadow-lg">
                <div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-linear-to-r from-[#F0F5FD] to-[#B9EAFF] px-4 py-2 max-sm:gap-2 max-sm:p-2 max-sm:pb-4">
                        <HiBanknotes className="size-12 stroke-1 text-sky-400 max-sm:size-8" />
                        <h3>
                            <span className="text-primary-base max-sm:text-sm">
                                {universityData.acronym ? universityData.acronym : universityData.name}
                                &nbsp;Fees
                            </span>
                            <div className="flex items-center gap-2 text-xl leading-tight font-medium max-md:text-base max-sm:flex-col max-sm:items-start max-sm:text-sm">
                                <span>Average Course Fee</span>
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
                                    <span className="h-full w-full overflow-hidden bg-indigo-50 py-3 pl-6 text-sm whitespace-nowrap max-sm:p-3 max-sm:text-xs">
                                        Tuition Fee
                                    </span>
                                </td>
                                {universityData.avgTuitionFee ? (
                                    <td>
                                        <span className="flex h-full w-full items-center gap-0.5 bg-indigo-50 py-3 pl-6 text-sm max-sm:p-3 max-sm:text-xs">
                                            <span className="whitespace-nowrap">
                                                <span>${universityData.avgTuitionFee.minimum}</span>
                                                &nbsp;-&nbsp;
                                                <span>${universityData.avgTuitionFee.maximum}</span>
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

            {universityData.otherFees?.length ? (
                <div className="mt-12 overflow-hidden rounded-lg shadow-lg">
                    <div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-linear-to-r from-[#F0F5FD] to-[#B9EAFF] px-4 py-2 max-sm:gap-2 max-sm:p-2">
                            <HiBanknotes className="size-12 stroke-1 text-sky-400 max-sm:size-8" />
                            <h3>
                                <span className="text-primary-base max-sm:text-sm">
                                    {universityData.acronym ? universityData.acronym : universityData.name}
                                    &nbsp;Fees
                                </span>
                                <div className="flex items-center gap-2 text-xl leading-tight font-medium max-md:text-base max-sm:flex-col max-sm:items-start max-sm:text-sm">
                                    <span>Other Fees & Expenses (Average)&nbsp;|&nbsp;in&nbsp;</span>
                                    <div className="flex w-fit items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 max-sm:text-[10px]">
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
                                {universityData.otherFees.map(
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
                                                <td className="py-3 pl-6 text-sm capitalize max-sm:p-3 max-sm:text-xs">
                                                    {entry.name}
                                                </td>
                                                <td className="py-3 pl-6 text-sm max-sm:p-3 max-sm:text-xs">
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
    );
}
