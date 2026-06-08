// imports
import { UniversityType } from '@/assets/types/universityTypes';

export default function InfoCards({ universityData }: { universityData: UniversityType }) {
    return (
        <div className="grid grid-cols-5 grid-rows-[110px] gap-8 text-gray-800 max-[800px]:grid-cols-3 max-xl:gap-3 max-sm:grid-cols-2 max-sm:grid-rows-[auto]">
            <div className="relative overflow-hidden flex flex-col gap-4 rounded-lg bg-[linear-gradient(123deg,rgba(255,238,173,0.75)_3.13%,rgba(244,206,20,0.62)_100%)] p-4">
                <span className="z-30 text-2xl leading-tight font-semibold max-lg:text-xl max-sm:text-lg">
                    {universityData.avgNumOfForeginStudents}
                </span>
                <span className="z-30 text-sm max-sm:text-xs">Foreign Students</span>
                <div className="absolute right-0 bottom-[34%] z-20 h-24 w-25 -rotate-45 transform rounded-xl bg-white/20"></div>
            </div>
            <div className="relative overflow-hidden flex flex-col gap-4 rounded-lg bg-[linear-gradient(123deg,rgba(209,233,246,0.75)_3.13%,rgba(118,149,255,0.75)_100%)] px-3 py-4 max-lg:gap-1 max-lg:p-2">
                <span className="z-30 text-2xl leading-tight font-semibold max-lg:text-xl max-sm:text-lg">
                    {universityData.campusLocality}
                </span>
                <span className="z-30 text-sm max-sm:text-xs">Campus Locality</span>
                <div className="absolute right-0 bottom-[34%] z-20 h-24 w-25 -rotate-45 transform rounded-xl bg-white/20"></div>
            </div>
            <div className="relative overflow-hidden flex flex-col gap-4 rounded-lg bg-[linear-gradient(123deg,rgba(180,227,128,0.75)_3.13%,rgba(162,202,113,0.75)_100%)] p-4">
                <span className="z-30 text-2xl leading-tight font-semibold max-lg:text-xl max-sm:text-lg">
                    {universityData.numOfCourses}
                </span>
                <span className="z-30 text-sm max-sm:text-xs">Courses</span>
                <div className="absolute right-0 bottom-[34%] z-20 h-24 w-25 -rotate-45 transform rounded-xl bg-white/20"></div>
            </div>

            <div className="relative overflow-hidden flex flex-col gap-4 rounded-lg bg-[linear-gradient(123deg,rgba(255,238,173,0.75)_3.13%,rgba(255,138,138,0.62)_100%)] p-4">
                <span className="z-30 text-2xl leading-tight font-semibold max-lg:text-xl max-sm:text-lg">
                    {universityData.avgAcceptanceRate}%
                </span>
                <span className="z-30 text-sm max-sm:text-xs">Acceptance Rate</span>
                <div className="absolute right-0 bottom-[34%] z-20 h-24 w-25 -rotate-45 transform rounded-xl bg-white/20"></div>
            </div>
            <div className="relative overflow-hidden flex flex-col gap-4 rounded-lg bg-[linear-gradient(123deg,rgba(250,188,63,0.75)_3.13%,rgba(232,92,13,0.75)_100%)] p-4">
                <span className="z-30 text-2xl leading-tight font-semibold max-lg:text-xl max-sm:text-lg">
                    Available
                </span>
                <span className="z-30 text-sm max-sm:text-xs">Scholarship</span>
                <div className="absolute right-0 bottom-[34%] z-20 h-24 w-25 -rotate-45 transform rounded-xl bg-white/20"></div>
            </div>
        </div>
    );
}
