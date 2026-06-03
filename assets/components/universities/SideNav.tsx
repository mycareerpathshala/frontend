'use client';

// imports
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linkClass = (active: boolean) =>
    `border-r-4 py-3 pr-2 text-right whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-sky-100 max-lg:h-fit max-lg:w-auto max-lg:shrink-0 max-lg:border-r-0 max-lg:border-b-4 max-lg:p-2 max-lg:px-6 max-lg:text-center max-lg:text-sm ${
        active
            ? 'border-r-primary-dark max-lg:border-b-primary-lighter bg-sky-200'
            : 'hover:border-r-primary-lighter border-r-white bg-white max-lg:border-b-transparent'
    }`;

export default function SideNav({ universityID, hasScholarship }: { universityID: string; hasScholarship: boolean }) {
    const pathName = usePathname();
    const navPath = pathName.split(/\/+/);
    const filteredPathName = navPath.filter((part) => part !== '').at(-1);

    return (
        <nav className="max-lg:border-b-primary-bg text-md flex flex-col gap-2 max-lg:flex-row max-lg:flex-nowrap max-lg:gap-6 max-lg:overflow-x-auto max-lg:border-b max-sm:gap-3">
            <Link href={`/universities/${universityID}`} className={linkClass(filteredPathName === universityID)}>
                Overview
            </Link>
            <Link href={`/universities/${universityID}/course-and-fees`} className={linkClass(filteredPathName === 'course-and-fees')}>
                Course & Fees
            </Link>
            <Link href={`/universities/${universityID}/admission-criteria`} className={linkClass(filteredPathName === 'admission-criteria')}>
                Admission Criteria
            </Link>
            {hasScholarship && (
                <Link href={`/universities/${universityID}/scholarships`} className={linkClass(filteredPathName === 'scholarships')}>
                    Scholarships
                </Link>
            )}
            <Link href={`/universities/${universityID}/faq`} className={linkClass(filteredPathName === 'faq')}>
                FAQ
            </Link>
        </nav>
    );
}
