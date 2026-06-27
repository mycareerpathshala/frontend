/* eslint-disable @next/next/no-img-element */
// imports
import { mediaUrl } from '@/assets/utilities/mediaUrl';
import { MedicalCollegeType } from '@/assets/types/mbbsTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';

export default function MedicalMedia({ medicalData }: { medicalData: MedicalCollegeType & StrapiDataType }) {
    return (
        <div className="grid h-100 w-full grid-cols-4 grid-rows-2 gap-2 max-md:h-96 max-md:grid-cols-2 max-md:grid-rows-3 max-sm:h-72 max-sm:grid-rows-3">
            {/* cover photo */}
            <div className="relative col-span-2 row-span-2 h-full w-full overflow-hidden rounded-md max-md:col-span-1 max-md:row-span-3 max-sm:row-span-2">
                <img
                    src={
                        medicalData.collegeMediaContent?.coverPhoto.formats?.medium?.url
                            ? `${mediaUrl(medicalData.collegeMediaContent.coverPhoto.formats.medium.url)}`
                            : '/img/placeholders/university_image.jpg'
                    }
                    alt={`${medicalData.name} Cover Photo`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            {/* image one two and three */}
            {/* img one */}
            <div className="relative row-span-2 overflow-hidden rounded-md max-md:row-span-1">
                <img
                    src={
                        medicalData.collegeMediaContent?.photoOne.formats?.medium?.url
                            ? `${mediaUrl(medicalData.collegeMediaContent.photoOne.formats.medium.url)}`
                            : '/img/placeholders/university_image.jpg'
                    }
                    alt={`${medicalData.name} Photo One`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            {/* img two */}
            <div className="relative overflow-hidden rounded-md">
                <img
                    src={
                        medicalData.collegeMediaContent?.photoTwo.formats?.medium?.url
                            ? `${mediaUrl(medicalData.collegeMediaContent.photoTwo.formats.medium.url)}`
                            : '/img/placeholders/university_image.jpg'
                    }
                    alt={`${medicalData.name} Photo Two`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            {/* img three */}
            <div className="relative overflow-hidden rounded-md max-sm:col-span-2">
                <img
                    src={
                        medicalData.collegeMediaContent?.photoThree.formats?.medium?.url
                            ? `${mediaUrl(medicalData.collegeMediaContent.photoThree.formats.medium.url)}`
                            : '/img/placeholders/university_image.jpg'
                    }
                    alt={`${medicalData.name} Photo Three`}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
