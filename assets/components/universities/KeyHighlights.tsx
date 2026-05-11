// imports
import { UniversityType } from '@/assets/types/universityTypes';
import { HiAcademicCap, HiBuildingLibrary, HiBuildingOffice2, HiCalendarDays, HiUsers } from 'react-icons/hi2';

export default function KeyHighlights({ universityData }: { universityData: UniversityType }) {
    return (
        <div id="highlights" className="bg-primary-gray mt-8 rounded-lg px-6 py-5 max-sm:p-2 max-sm:py-3">
            <h2 className="text-[22px] font-medium">
                Key Highlights of {universityData.acronym ? universityData.acronym : universityData.name}
            </h2>
            <div className="mt-3 grid grid-cols-5 gap-7 max-lg:gap-2 max-md:grid-cols-3 max-sm:grid-cols-2">
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiBuildingLibrary className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{universityData.type}</span>
                        <span className="text-xs">University Type</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiCalendarDays className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{new Date(universityData.est).getFullYear()}</span>
                        <span className="text-xs">Established</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiBuildingOffice2 className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{universityData.numOfCampus}</span>
                        <span className="text-xs">No. of Campus</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiUsers className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{universityData.avgNumOfForeginStudents}</span>
                        <span className="text-xs">Foregin Students</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiAcademicCap className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">
                            {universityData.scholarship ? 'Available' : 'Self-Funded'}
                        </span>
                        <span className="text-xs">Scholarships</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
