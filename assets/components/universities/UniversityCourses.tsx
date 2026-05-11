// imports
import { getCoursesForUniversity } from '@/assets/lib/cms/fetchCourse';
import { QueryObjectType, StrapiDataType } from '@/assets/types/responseTypes';
import { UniversityType } from '@/assets/types/universityTypes';
import CourseCards from './CourseCards';

export default async function UniversityCourses({
    universityData,
}: {
    universityData: UniversityType & StrapiDataType;
}) {
    const query: QueryObjectType = {
        filters: {
            university: {
                documentId: {
                    $eq: universityData.documentId,
                },
            },
        },
        populate: {
            tuitionFeeByYear: true,
        },
        pagination: {
            pageSize: 5,
        },
    };

    const universityCourseDataResponse = await getCoursesForUniversity(universityData.documentId, query, true);

    return (
        <div id="courses" className="mt-12 overflow-hidden rounded-lg border border-gray-200">
            <div className="w-full bg-linear-to-r from-cyan-100 to-blue-400 px-4 py-4">
                <h2 className="text-xl font-bold">{universityData.name} Top Courses</h2>
            </div>
            <div className="px-6 py-4 max-sm:px-4">
                <p className="max-sm:text-base">
                    Discover the most sought-after courses offered by {universityData.name}, renowned for their academic
                    excellence and industry relevance. These programs attract students from across the globe, providing
                    a strong foundation in both theoretical and practical aspects of their respective fields. Whether
                    you are interested in engineering, medicine, business, or the arts, the top courses at{' '}
                    {universityData.name} are designed to equip graduates with the skills and knowledge needed to excel
                    in today&apos;s competitive world. With experienced faculty, modern facilities, and a vibrant
                    learning environment, these courses consistently produce successful professionals and leaders.
                    Explore the diverse range of disciplines and find the program that best matches your aspirations at{' '}
                    {universityData.name}.
                </p>
            </div>

            {/* here will be the course cards */}
            {universityCourseDataResponse?.data.length ? (
                <CourseCards universityData={universityData} courseDataList={universityCourseDataResponse.data} />
            ) : (
                <div className="px-6 py-8">
                    <p className="w-full rounded-lg bg-red-50 py-1 text-center text-lg text-red-900">
                        <span className="font-semibold">No courses</span> found for{' '}
                        <span className="font-semibold">{universityData.name}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
