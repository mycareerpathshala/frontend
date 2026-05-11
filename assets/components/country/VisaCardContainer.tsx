// imports
import { VisaCategoryComponent } from '@/assets/types/countryTypes';
import { RiVisaLine } from 'react-icons/ri';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { HiOutlineTag } from 'react-icons/hi';
import { BsFileTextFill } from 'react-icons/bs';

export default function VisaCardContainer({ visaCategoryList }: { visaCategoryList: VisaCategoryComponent[] }) {
    return (
        <div className="mt-8 grid w-full grid-cols-3 gap-6 rounded-2xl bg-linear-to-br from-sky-100 to-blue-50 p-10 max-[1160px]:grid-cols-2 max-[1160px]:p-6 max-sm:grid-cols-1 max-sm:p-4">
            {visaCategoryList.map((visaDetails, id) => {
                return (
                    <div
                        key={id}
                        className="flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                    >
                        {/* card header */}
                        <div className="bg-primary-light relative flex items-center justify-between px-5 py-4">
                            <div>
                                <p className="text-xs font-medium tracking-widest text-blue-200 uppercase">Visa Type</p>
                                <h3 className="mt-0.5 text-lg font-semibold text-white">{visaDetails.title}</h3>
                            </div>
                            <div className="rounded-full bg-white/20 p-2">
                                <RiVisaLine className="size-8 text-white" />
                            </div>
                        </div>

                        {/* fee row */}
                        <div className="flex items-center gap-3 border-b border-blue-50 px-5 py-4">
                            <div className="bg-primary-lighter rounded-full p-2">
                                <MdOutlineAttachMoney className="text-primary-base size-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Visa Fee</p>
                                <p className="text-primary-base text-xl font-bold">${visaDetails.visaCost}</p>
                            </div>
                        </div>

                        {/* category row */}
                        <div className="flex items-center gap-3 border-b border-blue-50 px-5 py-4">
                            <div className="rounded-full bg-sky-100 p-2">
                                <HiOutlineTag className="size-5 text-sky-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Category</p>
                                <p className="font-semibold text-gray-700">{visaDetails.category}</p>
                            </div>
                        </div>

                        {/* description */}
                        <div className="flex flex-1 gap-3 px-5 py-4">
                            <div className="mt-0.5 shrink-0">
                                <BsFileTextFill className="size-4 text-gray-300" />
                            </div>
                            <p className="text-sm leading-relaxed text-gray-500">{visaDetails.smallDescription}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
