'use client';

// imports
import { UniversityType } from '@/assets/types/universityTypes';
import { useRef, useState, useEffect } from 'react';
import { HiChevronLeft } from 'react-icons/hi2';

export default function FactContainer({ universityData }: { universityData: UniversityType }) {
    const foundingYear = new Date(universityData.est).getFullYear();
    const universityAge = new Date().getFullYear() - foundingYear;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // width of scroll
    const CARD_WIDTH = 200;

    // Check scroll position to show/hide buttons
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkScroll();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -2 * CARD_WIDTH : 2 * CARD_WIDTH,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="relative mt-5 w-full">
            {canScrollLeft && (
                <button
                    type="button"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                    className="absolute top-9 -left-5 w-fit cursor-pointer rounded-full border-4 border-white bg-pink-300 p-1.5"
                >
                    <HiChevronLeft className="text-primary-base size-6 stroke-3" />
                </button>
            )}
            {/* <div
                ref={scrollRef}
                className="hide-scrollbar flex max-w-7xl items-center gap-3 overflow-x-auto border py-3"
            >
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Founding History</h4>
                    <p className="text-sm whitespace-nowrap">
                        {universityAge} Years, established in {foundingYear}
                    </p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Acceptance Rate</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.avgAcceptanceRate}</p>
                </div>
                {universityData.applicationCriteria?.length && (
                    <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                        <h4 className="text-base font-bold whitespace-nowrap">Average GPA Score</h4>
                        <p className="text-sm whitespace-nowrap">
                            {
                                universityData.applicationCriteria.find((criteria) => {
                                    return criteria.applicationLevel === 'Undergraduate';
                                }).gpaRequirement.minGPA
                            }{' '}
                            on a scale of{' '}
                            {
                                universityData.applicationCriteria.find((criteria) => {
                                    return criteria.applicationLevel === 'Undergraduate';
                                }).gpaRequirement.gpaScale
                            }
                        </p>
                    </div>
                )}
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Tuition Fee Average</h4>
                    <p className="text-sm whitespace-nowrap">
                        {Number(universityData.avgTuitionFee?.minimum)}
                        &nbsp;-&nbsp;
                        {Number(universityData.avgTuitionFee?.maximum)}
                    </p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
                <div className="w-fit space-y-1 rounded-full bg-[#EFEFEF] px-8 py-3">
                    <h4 className="text-base font-bold whitespace-nowrap">Total Foreign Students</h4>
                    <p className="text-sm whitespace-nowrap">{universityData.numOfForeignStudent}</p>
                </div>
            </div>
            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                    className="absolute top-6 -right-5 cursor-pointer rounded-full border-4 border-white bg-pink-300 p-1.5"
                >
                    <ChevronRightIcon className="text-primary-base size-6 stroke-3" />
                </button>
            )} */}
        </div>
    );
}
