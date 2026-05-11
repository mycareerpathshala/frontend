/* eslint-disable @next/next/no-img-element */
// imports
import { RequirementComponent } from '@/assets/types/countryTypes';

export default function CountryRequirements({ requirementList }: { requirementList: RequirementComponent[] }) {
    return (
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 max-[1160px]:grid-cols-1 max-[1160px]:gap-y-3">
            {requirementList?.map((requirement: RequirementComponent, index: number) => {
                return (
                    <div
                        key={index}
                        className="grid grid-cols-[auto_1fr] gap-6 rounded-lg border border-gray-500 bg-linear-to-r from-[#CAEFFF] to-white px-6 py-3 max-sm:gap-4 max-sm:px-4"
                    >
                        <div className="relative h-14 w-16 max-sm:h-11 max-sm:w-12">
                            <img
                                src={`${
                                    requirement.requirementType === 'Document'
                                        ? '/img/country/requirements/document.png'
                                        : '/img/country/requirements/certification.png'
                                }`}
                                alt={`${
                                    requirement.requirementType === 'Document' ? 'Document Icon' : 'Certificate Icon'
                                }`}
                                className="absolute inset-0 h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex items-center">
                            <p className="max-sm:text-sm">{requirement.requirementDetails}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
