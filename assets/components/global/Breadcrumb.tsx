// imports
import Link from 'next/link';
import { HiHome, HiChevronRight } from 'react-icons/hi2';

/*
Breadcrumb data example
crumblist={[
          { level: 1, label: "Universities", url: "/universities" },
          {
            level: 2,
            label: `${universityData.name}`,
            url: `/universities/${universityData.documentId}`,
          },
        ]}
*/

// local prop types
export interface BreadcrumbType {
    level: number;
    label: string;
    url: string;
}

export default function Breadcrumb({ crumblist }: { crumblist: BreadcrumbType[] }) {
    const sortedCrumblist = crumblist.sort((a, b) => a.level - b.level);

    return (
        <div className="mx-auto flex w-full max-w-7xl items-center justify-start overflow-hidden py-4 text-sm max-sm:text-xs">
            <Link href="/" className="shrink-0">
                <HiHome className="text-primary-base size-4" />
            </Link>
            {sortedCrumblist?.length &&
                sortedCrumblist.map((crumb, index) => {
                    const isLast = index === sortedCrumblist.length - 1;
                    return (
                        <div key={index} className={`flex min-w-0 items-center justify-start gap-2 ${isLast ? '' : 'shrink-0'}`}>
                            <HiChevronRight className="ml-2 size-4 shrink-0" />
                            <Link href={crumb.url} className={`max-sm:text-xs${isLast ? ' truncate' : ''}`}>
                                {crumb.label}
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
