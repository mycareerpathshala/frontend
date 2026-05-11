'use client';

import { MedicalCollegeType } from '@/assets/types/mbbsTypes';
import { StrapiDataType } from '@/assets/types/responseTypes';
// imports
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav({ medicalData }: { medicalData: MedicalCollegeType & StrapiDataType }) {
    // use pathname hook
    const pathName = usePathname();
    const navPath = pathName.split(/\/+/);
    const filteredPathName = navPath.filter((part) => part !== '').at(-1);

    return (
        <nav className="max-lg:border-b-primary-bg text-md flex flex-col gap-2 max-lg:flex-row max-lg:flex-nowrap max-lg:gap-6 max-lg:overflow-x-auto max-lg:border-b max-sm:gap-3">
            <Link
                href={`/mbbs/${medicalData.documentId}`}
                className={`border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${filteredPathName === medicalData.documentId ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200' : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'}`}
            >
                Overview
            </Link>
            <Link
                href={`/mbbs/${medicalData.documentId}/fee-structure`}
                className={`border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${filteredPathName === 'fee-structure' ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200' : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'}`}
            >
                Fee Structure
            </Link>
            <Link
                href={`/mbbs/${medicalData.documentId}/admission-criteria`}
                className={`border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${filteredPathName === 'admission-criteria' ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200' : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'}`}
            >
                Admission Criteria
            </Link>
            {medicalData.syllabusDynamicPage && (
                <Link
                    href={`/mbbs/${medicalData.documentId}/syllabus`}
                    className={`border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${filteredPathName === 'syllabus' ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200' : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'}`}
                >
                    Syllabus
                </Link>
            )}
            <Link
                href={`/mbbs/${medicalData.documentId}/faq`}
                className={`border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${filteredPathName === 'faq' ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200' : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'}`}
            >
                FAQ
            </Link>
        </nav>
    );
}
