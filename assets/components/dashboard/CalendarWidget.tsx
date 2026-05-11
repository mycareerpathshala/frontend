'use client';

import { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiCalendarDays } from 'react-icons/hi2';

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

function buildCalendar(year: number, month: number): (number | null)[] {
    const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Convert Sunday-first to Monday-first offset
    const offset = firstDow === 0 ? 6 : firstDow - 1;
    const cells: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
}

// Dummy event dates for the current month
const EVENT_DAYS = [5, 12, 19, 26];

export default function CalendarWidget() {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());

    const today = now.getDate();
    const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
    const cells = buildCalendar(year, month);

    function prev() {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    }
    function next() {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-5 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <HiCalendarDays className="size-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-800">
                        {MONTH_NAMES[month]} {year}
                    </h3>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={prev}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                        aria-label="Previous month"
                    >
                        <HiChevronLeft className="size-4" />
                    </button>
                    <button
                        onClick={next}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                        aria-label="Next month"
                    >
                        <HiChevronRight className="size-4" />
                    </button>
                </div>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 mb-1">
                {DAY_LABELS.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">
                        {d}
                    </div>
                ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-y-0.5 flex-1">
                {cells.map((day, i) => {
                    if (day === null) return <div key={`e-${i}`} />;
                    const isToday = isCurrentMonth && day === today;
                    const hasEvent = isCurrentMonth && EVENT_DAYS.includes(day);
                    return (
                        <div key={`d-${i}`} className="flex flex-col items-center justify-center py-0.5">
                            <button
                                className={`size-7 rounded-full text-xs font-semibold transition-all relative ${
                                    isToday
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {day}
                            </button>
                            {hasEvent && !isToday && (
                                <span className="size-1 rounded-full bg-blue-400 mt-0.5" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="size-2 rounded-full bg-blue-600 inline-block" />
                    Today
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="size-1.5 rounded-full bg-blue-400 inline-block" />
                    Event
                </div>
            </div>
        </div>
    );
}
