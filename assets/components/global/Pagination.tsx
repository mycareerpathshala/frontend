'use client';

// imports
import { StrapiCollectionMetaType } from '@/assets/types/responseTypes';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({
    metaData,
    pageNum,
    setPageNum,
}: {
    metaData: StrapiCollectionMetaType;
    pageNum: number;
    setPageNum: (page: number) => void;
}) {
    return (
        <div className="mt-8 w-full">
            <div className="mt-6 flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 rounded-sm bg-gray-200 px-1.5 py-1">
                        <span className="">Total Pages</span>
                        <span className="rounded-sm bg-white px-2 font-semibold">{metaData.pagination.pageCount}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        disabled={pageNum <= 1}
                        className={`${pageNum <= 1 ? 'text-gray-600' : 'cursor-pointer hover:border-sky-400 hover:bg-sky-100'} group flex items-center justify-center gap-1 rounded-sm border-2 border-transparent bg-gray-200 px-2 py-1`}
                        onClick={() => setPageNum(pageNum - 1)}
                    >
                        <span>
                            <FiChevronLeft className="size-5" />
                        </span>
                        <span>Previous</span>
                    </button>

                    {/* page number */}
                    <div className="flex w-12 items-center justify-center rounded-sm bg-gray-200 px-2 py-1.5">
                        <span className="font-semibold select-none">{pageNum}</span>
                    </div>

                    <button
                        type="button"
                        disabled={pageNum >= metaData.pagination.pageCount}
                        className={`${pageNum >= metaData.pagination.pageCount ? 'text-gray-600' : 'cursor-pointer hover:border-sky-400 hover:bg-sky-100'} group flex items-center justify-center gap-1 rounded-sm border-2 border-transparent bg-gray-200 px-2 py-1`}
                        onClick={() => setPageNum(pageNum + 1)}
                    >
                        <span>Next</span>
                        <span>
                            <FiChevronRight className="size-5" />
                        </span>
                    </button>
                </div>
                <div className="flex gap-2 rounded-sm bg-gray-200 px-1.5 py-1">
                    <span>Page Size</span>
                    <span className="rounded-sm bg-white px-2 font-semibold">{metaData.pagination.pageSize}</span>
                </div>
            </div>
        </div>
    );
}
