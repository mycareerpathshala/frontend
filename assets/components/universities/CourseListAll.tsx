// imports
import { CourseType } from '@/assets/types/courseTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityType } from '@/assets/types/universityTypes';
import CourseCardWide from './CourseCardWide';

export default function CourseListAll({
    courseDataList,
    universityData,
}: {
    courseDataList: (CourseType & StrapiDataType)[];
    universityData: UniversityType & StrapiDataType;
}) {
    return (
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
            {/* header */}
            <div className="flex w-full items-center justify-between bg-linear-to-r from-cyan-100 to-blue-300 px-4 py-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <h2 className="text-2xl font-bold">All Courses {universityData.name}</h2>
                <div className="rounded-lg bg-amber-100 px-3 py-1.5">
                    <span className="text-md">
                        Total Courses: <span className="font-semibold">{courseDataList.length}</span>
                    </span>
                </div>
            </div>

            {/* filter option */}

            {/* course list */}
            <div className="mt-2 flex flex-col gap-8 p-6 max-md:p-3 max-sm:mt-4">
                {courseDataList.map((courseData, index) => {
                    return (
                        <div key={index} className="relative">
                            <CourseCardWide courseData={courseData} universityData={universityData} />
                            <span className="absolute -top-4 right-5 rounded-2xl bg-linear-to-r from-rose-400 to-red-400 px-4 py-1 font-semibold text-white lowercase drop-shadow-lg max-sm:text-sm">
                                {courseData.stream?.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
