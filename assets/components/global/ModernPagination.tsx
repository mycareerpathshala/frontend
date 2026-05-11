'use client';
import { StrapiCollectionMetaType } from '@/assets/types/responseTypes';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

// imports

export default function ModernPagination({
    dataFor,
    metaData,
    pageNum,
    setPageNum,
}: {
    dataFor: string;
    metaData: StrapiCollectionMetaType;
    pageNum: number;
    setPageNum: (page: number) => void;
}) {
    return (
        <div className="mt-12 flex w-full items-center justify-between rounded-lg border border-sky-200 bg-gray-50 p-4 shadow-lg max-sm:flex-col">
            <div className="flex items-center justify-start gap-6 max-sm:flex-col max-sm:gap-4">
                <div className="flex items-center overflow-hidden rounded-lg border border-sky-400">
                    <button
                        type="button"
                        onClick={() => setPageNum(pageNum - 1)}
                        disabled={pageNum === 1}
                        className={`${pageNum === 1 ? 'cursor-not-allowed bg-gray-200' : 'cursor-pointer bg-sky-50 hover:bg-sky-400'} group flex items-center justify-center px-2 py-1.5 select-none`}
                    >
                        <MdKeyboardArrowLeft
                            className={`${pageNum === 1 ? 'text-gray-400' : 'text-sky-600 group-hover:text-white'} size-6`}
                        />
                    </button>
                    <span className="flex items-center justify-center border-x border-sky-300 bg-sky-50 px-2.5 py-1.5">
                        <span className="mr-1 font-semibold">Page {pageNum}</span> of{' '}
                        <span className="ml-1 font-semibold">{metaData.pagination.pageCount}</span>
                    </span>
                    <button
                        type="button"
                        onClick={() => setPageNum(pageNum + 1)}
                        disabled={pageNum === metaData.pagination.pageCount}
                        className={`${pageNum === metaData.pagination.pageCount ? 'cursor-not-allowed bg-gray-200' : 'cursor-pointer bg-sky-50 hover:bg-sky-400'} group flex items-center justify-center px-2 py-1.5 select-none`}
                    >
                        <MdKeyboardArrowRight
                            className={`${pageNum === metaData.pagination.pageCount ? 'text-gray-400' : 'text-sky-600 group-hover:text-white'} size-6`}
                        />
                    </button>
                </div>
                <div>
                    <span className="text-sm">
                        Showing{' '}
                        <span className="font-semibold">{(pageNum - 1) * metaData.pagination.pageSize + 1}</span>-
                        <span className="font-semibold">{pageNum * metaData.pagination.pageSize}</span> of{' '}
                        <span className="font-semibold">{metaData.pagination.total}</span>
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm max-sm:mt-1">
                <span className="uppercase">{dataFor} Per Page:</span>
                <span className="flex items-center justify-center rounded-lg border border-sky-300 bg-sky-50 px-2.5 py-1 font-semibold">
                    {metaData.pagination.pageSize}
                </span>
            </div>
        </div>
    );
}
