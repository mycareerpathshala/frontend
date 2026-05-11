// imports
import { TuitionFeeByYearType } from '@/assets/types/componentTypes';
import { FaCalculator, FaCalendarAlt } from 'react-icons/fa';
import { HiOutlineCash } from 'react-icons/hi';
import { HiCheckBadge } from 'react-icons/hi2';

export default function FeeStructure({
    tuitionFeeByYear,
    totalTuitionFee,
}: {
    tuitionFeeByYear: TuitionFeeByYearType[];
    totalTuitionFee: number;
}) {
    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Header - Matching your FMGE style */}
            <div className="flex items-center gap-3 bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-5">
                <h2 className="text-xl font-bold text-slate-800">Tuition Fee Breakdown</h2>
            </div>

            <div className="p-4 md:p-6">
                {/* Top Summary Card */}
                <div className="mb-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 md:flex-row md:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                            <HiOutlineCash size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                                Total Course Fee
                            </p>
                            <h3 className="text-3xl font-semibold text-slate-900">
                                ${Number(totalTuitionFee).toLocaleString()}
                            </h3>
                        </div>
                    </div>

                    <div className="hidden h-12 w-px bg-slate-200 md:block"></div>

                    <div className="flex items-center gap-3 text-slate-600">
                        <FaCalculator className="text-blue-500" />
                        <p className="text-sm font-medium">
                            Avg.{' '}
                            <span className="font-bold text-slate-900">
                                ${Math.round(Number(totalTuitionFee) / tuitionFeeByYear.length).toLocaleString()}
                            </span>{' '}
                            / per year
                        </p>
                    </div>
                </div>

                {/* Yearly Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tuitionFeeByYear.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 transition-all select-none hover:border-blue-200 hover:shadow-md"
                        >
                            {/* Decorative Background Number */}
                            <span className="absolute -right-2 -bottom-4 text-7xl font-black text-slate-50 opacity-10 transition-opacity group-hover:opacity-20">
                                {index + 1}
                            </span>

                            <div className="relative z-10">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="size-4 text-blue-400" />
                                        <span className="text-sm font-bold tracking-tight text-slate-500 uppercase">
                                            {item.selectYear} Year
                                        </span>
                                    </div>
                                    <HiCheckBadge className="size-5 text-emerald-500" />
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs font-bold text-slate-400">$</span>
                                    <span className="text-2xl font-bold text-slate-700">
                                        {item.tuitionFee.toLocaleString()}
                                    </span>
                                </div>

                                <div className="mt-3 h-1 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{
                                            width: `${(item.tuitionFee / (Number(totalTuitionFee) / tuitionFeeByYear.length)) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-700">
                    <div className="size-2 animate-pulse rounded-full bg-blue-500"></div>
                    <p className="text-xs font-semibold">
                        Note: Fees are subject to change based on university policy and currency exchange rates.
                    </p>
                </div>
            </div>
        </div>
    );
}
