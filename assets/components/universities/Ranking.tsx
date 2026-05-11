/* eslint-disable @next/next/no-img-element */
'use client';

// imports
import { UniversityType, WorldRankingType } from '@/assets/types/universityTypes';
import { useState } from 'react';

export default function Rankings({
    universityData,
    rankingList,
}: {
    universityData: UniversityType;
    rankingList: WorldRankingType[];
}) {
    const latestYear = Math.max(...rankingList.map((item) => new Date(item.recordedDate).getFullYear()));
    const [selectedYear, setSelectedYear] = useState<number>(latestYear);

    // selected ranking
    const selectedRanking = rankingList.find((item) => new Date(item.recordedDate).getFullYear() === selectedYear);

    return (
        <div id="rankings" className="mt-12 rounded-lg border border-gray-200 p-6 pb-8 max-sm:p-2">
            <h2 className="text-[22px] font-medium">{universityData.acronym ?? universityData.name} Rankings</h2>
            <div className="mt-8 flex items-center gap-3.5 text-xs max-sm:mt-4 max-sm:flex-wrap">
                {rankingList.length &&
                    rankingList.map((ranking) => {
                        return (
                            <span
                                key={ranking.id}
                                onClick={() => setSelectedYear(new Date(ranking.recordedDate).getFullYear())}
                                className={`cursor-pointer rounded-full border border-neutral-500 px-6 py-1.5 text-neutral-600 transition-colors duration-200 ease-in-out select-none hover:bg-neutral-200 ${selectedYear === new Date(ranking.recordedDate).getFullYear() ? 'text-primary-base border-primary-base bg-neutral-200' : ''}`}
                            >
                                {new Date(ranking.recordedDate).getFullYear()}
                            </span>
                        );
                    })}
            </div>
            <div className="mt-6">
                {selectedRanking && (
                    <div className="space-y-4">
                        {selectedRanking.qsRanking && (
                            <div className="flex items-center justify-between rounded-full border border-gray-400 px-6 py-3 max-sm:flex-col max-sm:gap-6 max-sm:rounded-xl max-sm:p-4">
                                <span>
                                    <img src="/img/rank/qs_rank_logo.svg" alt="QS World Ranking Logo" />
                                </span>
                                <div className="flex items-center gap-6 max-sm:flex-wrap">
                                    <span className="max-sm:leading-tight">{universityData.name}</span>
                                    <span className="text-lg font-bold max-sm:leading-tight max-sm:font-medium">
                                        #{selectedRanking.qsRanking}
                                    </span>
                                </div>
                            </div>
                        )}
                        {selectedRanking.theRanking && (
                            <div className="flex items-center justify-between rounded-full border border-gray-400 px-6 py-1 max-sm:flex-col max-sm:gap-2 max-sm:rounded-xl max-sm:p-2">
                                <span>
                                    <img
                                        src="/img/rank/the_rank_logo.svg"
                                        alt="THE World Ranking Logo"
                                        className="w-33"
                                    />
                                </span>
                                <div className="flex items-center gap-6 max-sm:flex-wrap">
                                    <span>{universityData.name}</span>
                                    <span className="text-lg font-bold max-sm:leading-tight max-sm:font-medium">
                                        #{selectedRanking.theRanking}
                                    </span>
                                </div>
                            </div>
                        )}
                        {selectedRanking.usnwrRanking && (
                            <div className="flex items-center justify-between rounded-full border border-gray-400 px-6 py-3 max-sm:flex-col max-sm:gap-4 max-sm:rounded-xl max-sm:p-4">
                                <span>
                                    <img src="/img/rank/usnr_rank_logo.svg" alt="USNWR Ranking Logo" className="w-30" />
                                </span>
                                <div className="flex items-center gap-6 max-sm:flex-wrap">
                                    <span>{universityData.name}</span>
                                    <span className="text-lg font-bold max-sm:leading-tight max-sm:font-medium">
                                        #{selectedRanking.usnwrRanking}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
