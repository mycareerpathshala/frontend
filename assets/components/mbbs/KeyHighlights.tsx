// imports
import { MedicalCollegeType } from '@/assets/types/mbbsTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { HiBuildingLibrary, HiBuildingOffice2, HiCalendarDays, HiUsers } from 'react-icons/hi2';
import { IoPeopleSharp } from 'react-icons/io5';

export default function KeyHighlights({ medicalData }: { medicalData: MedicalCollegeType & StrapiDataType }) {
    return (
        <div id="highlights" className="bg-primary-gray mt-8 rounded-lg px-6 py-5 max-sm:p-2">
            <h2 className="text-[22px] font-medium">
                Key Highlights of {medicalData.acronym ? medicalData.acronym : medicalData.name}
            </h2>
            <div className="mt-3 grid grid-cols-5 gap-7 max-lg:gap-2 max-md:grid-cols-3 max-sm:grid-cols-2">
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiBuildingLibrary className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{medicalData.degreeDurationInMonths}</span>
                        <span className="text-xs">Study Duration</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <IoPeopleSharp className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{medicalData.internshipDurationInMonths}</span>
                        <span className="text-xs">Intership Duration</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiCalendarDays className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{new Date(medicalData.est).getFullYear()}</span>
                        <span className="text-xs">Established</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiBuildingOffice2 className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{medicalData.numOfCampus}</span>
                        <span className="text-xs">No. of Campus</span>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-3.5 py-2.5 shadow-xl">
                    <span>
                        <HiUsers className="size-9" />
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-primary-base text-xl">{medicalData.avgNumOfForeginStudents}</span>
                        <span className="text-xs">Foregin Students</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
