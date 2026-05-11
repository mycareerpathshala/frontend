'use client';

import { useState, useRef, useEffect } from 'react';
import {
    HiChevronDown,
    HiOutlineCalendarDays,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineXMark,
} from 'react-icons/hi2';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1899 }, (_, index) => CURRENT_YEAR - index);

function parseDate(v: string) {
    if (!v) return null;
    const d = new Date(v + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
}

interface Props {
    value: string;        // YYYY-MM-DD  ('' = nothing selected)
    onChange: (v: string) => void;
    placeholder?: string;
}

function PickerSelect({
    label,
    value,
    open,
    onToggle,
    children,
    align = 'left',
}: {
    label: string;
    value: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    align?: 'left' | 'right';
}) {
    return (
        <div className="relative">
            <button
                type="button"
                title={label}
                onClick={onToggle}
                className={[
                    'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-semibold text-slate-700 transition-all outline-none',
                    open
                        ? 'border-blue-400 bg-white ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white',
                ].join(' ')}
            >
                <span>{value}</span>
                <HiChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div
                    className={[
                        'absolute top-full z-10 mt-2 min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl',
                        align === 'right' ? 'right-0' : 'left-0',
                    ].join(' ')}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export default function DatePicker({ value, onChange, placeholder = 'Select date' }: Props) {
    const ref        = useRef<HTMLDivElement>(null);
    const savedValue = useRef<string>('');
    const [open, setOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<'month' | 'year' | null>(null);

    const initial = parseDate(value);

    const [viewYear,  setViewYear]  = useState(() => initial?.getFullYear()  ?? new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState(() => initial?.getMonth()      ?? new Date().getMonth());
    const [selDay,    setSelDay]    = useState<{ y: number; m: number; d: number } | null>(
        initial ? { y: initial.getFullYear(), m: initial.getMonth(), d: initial.getDate() } : null,
    );
    const [syncedValue, setSyncedValue] = useState(value);

    if (syncedValue !== value) {
        setSyncedValue(value);
        const d = parseDate(value);
        if (d) {
            setSelDay({ y: d.getFullYear(), m: d.getMonth(), d: d.getDate() });
            setViewYear(d.getFullYear());
            setViewMonth(d.getMonth());
        } else if (!value) {
            setSelDay(null);
        }
    }

    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, []);

    function openPicker() {
        savedValue.current = value;
        setOpen(true);
    }

    function cancelPicker() {
        onChange(savedValue.current);
        setActiveMenu(null);
        setOpen(false);
    }

    function emit(day: { y: number; m: number; d: number }) {
        const p = (n: number) => String(n).padStart(2, '0');
        onChange(`${day.y}-${p(day.m + 1)}-${p(day.d)}`);
    }

    function pickDay(d: number) {
        const day = { y: viewYear, m: viewMonth, d };
        setSelDay(day);
        emit(day);
    }

    function prevMonth() {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    }
    function nextMonth() {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    }

    function clearValue(e: React.MouseEvent) {
        e.stopPropagation();
        setSelDay(null);
        onChange('');
    }

    const firstDow    = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const today       = new Date();

    const displayStr = selDay
        ? new Date(selDay.y, selDay.m, selDay.d)
            .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : null;

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => {
                    if (open) {
                        setActiveMenu(null);
                        setOpen(false);
                    } else {
                        openPicker();
                    }
                }}
                className={[
                    'flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all outline-none',
                    open
                        ? 'border-blue-400 bg-white ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300',
                ].join(' ')}
            >
                <span className={`flex items-center gap-2.5 ${displayStr ? 'text-slate-700' : 'text-slate-400'}`}>
                    <HiOutlineCalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
                    {displayStr ?? placeholder}
                </span>

                {displayStr ? (
                    <span
                        role="button"
                        onClick={clearValue}
                        className="flex shrink-0 items-center rounded-lg p-0.5 text-slate-400 transition hover:bg-red-50 hover:text-red-400"
                    >
                        <HiOutlineXMark className="h-3.5 w-3.5" />
                    </span>
                ) : (
                    <HiOutlineCalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                )}
            </button>

            {/* Popup */}
            {open && (
                <div className="absolute top-full left-0 z-50 mt-1.5 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
                    {/* Calendar */}
                    <div className="p-4">
                        <div className="mb-4 flex items-center justify-between gap-2">
                            <button type="button" onClick={prevMonth}
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                                <HiOutlineChevronLeft className="h-4 w-4" />
                            </button>
                            <div className="flex flex-1 items-center justify-center gap-2">
                                <PickerSelect
                                    label="Select month"
                                    value={MONTHS[viewMonth]}
                                    open={activeMenu === 'month'}
                                    onToggle={() => setActiveMenu((current) => (current === 'month' ? null : 'month'))}
                                >
                                    <div className="max-h-64 overflow-y-auto p-1.5">
                                        {MONTHS.map((month, index) => (
                                            <button
                                                key={month}
                                                type="button"
                                                onClick={() => {
                                                    setViewMonth(index);
                                                    setActiveMenu(null);
                                                }}
                                                className={[
                                                    'flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-all',
                                                    index === viewMonth
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800',
                                                ].join(' ')}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                </PickerSelect>
                                <PickerSelect
                                    label="Select year"
                                    value={String(viewYear)}
                                    open={activeMenu === 'year'}
                                    onToggle={() => setActiveMenu((current) => (current === 'year' ? null : 'year'))}
                                    align="right"
                                >
                                    <div className="max-h-64 overflow-y-auto p-1.5">
                                        {YEAR_OPTIONS.map((year) => (
                                            <button
                                                key={year}
                                                type="button"
                                                onClick={() => {
                                                    setViewYear(year);
                                                    setActiveMenu(null);
                                                }}
                                                className={[
                                                    'flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-medium transition-all',
                                                    year === viewYear
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800',
                                                ].join(' ')}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </PickerSelect>
                            </div>
                            <button type="button" onClick={nextMonth}
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                                <HiOutlineChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mb-1 grid grid-cols-7 text-center">
                            {WEEKDAYS.map(d => (
                                <span key={d} className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{d}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {Array.from({ length: firstDow }).map((_, i) => <span key={`gap-${i}`} />)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const d          = i + 1;
                                const isSelected = selDay?.y === viewYear && selDay?.m === viewMonth && selDay?.d === d;
                                const isToday    = today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === d;
                                return (
                                    <button key={d} type="button" onClick={() => pickDay(d)}
                                        className={[
                                            'mx-auto my-0.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all',
                                            isSelected
                                                ? 'scale-110 bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                                : isToday
                                                    ? 'bg-blue-50 font-bold text-blue-600 ring-1 ring-blue-200'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
                                        ].join(' ')}
                                    >
                                        {d}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-2 border-t border-slate-100 p-3">
                        <button
                            type="button"
                            onClick={cancelPicker}
                            className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveMenu(null);
                                setOpen(false);
                            }}
                            disabled={!selDay}
                            className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {selDay ? 'Confirm' : 'Pick a date first'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
