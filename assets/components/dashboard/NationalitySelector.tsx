'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiChevronDown, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { NATIONALITIES, type Nationality } from '@/assets/lib/data/nationalities';

export { NATIONALITIES, type Nationality };
export const DEFAULT_NATIONALITY = NATIONALITIES.find((n) => n.country === 'India') ?? NATIONALITIES[0];

interface Props {
    value:    Nationality;
    onChange: (n: Nationality) => void;
}

export default function NationalitySelector({ value, onChange }: Props) {
    const [open, setOpen]   = useState(false);
    const [query, setQuery] = useState('');
    const [style, setStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef   = useRef<HTMLInputElement>(null);

    const filtered = NATIONALITIES.filter((n) =>
        !query.trim() ||
        n.nationality.toLowerCase().includes(query.toLowerCase()) ||
        n.country.toLowerCase().includes(query.toLowerCase()),
    );

    function openDropdown() {
        if (!triggerRef.current) return;
        const r = triggerRef.current.getBoundingClientRect();
        setStyle({ position: 'fixed', top: r.bottom + 6, left: r.left, width: Math.max(r.width, 260), zIndex: 9999 });
        setOpen(true);
    }

    useEffect(() => {
        if (!open) return;
        setTimeout(() => inputRef.current?.focus(), 50);
        function handler(e: MouseEvent) {
            const t  = e.target as Node;
            const dd = document.getElementById('nationality-dropdown');
            if (!triggerRef.current?.contains(t) && !dd?.contains(t)) { setOpen(false); setQuery(''); }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const dropdown = open && typeof document !== 'undefined' ? createPortal(
        <div id="nationality-dropdown" style={style} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
                <HiMagnifyingGlass className="size-4 shrink-0 text-slate-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search nationality or country…"
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                />
                {query && (
                    <button type="button" onClick={() => setQuery('')} className="text-slate-300 hover:text-slate-500">
                        <HiXMark className="size-3.5" />
                    </button>
                )}
            </div>
            <ul className="max-h-52 overflow-y-auto py-1">
                {filtered.length === 0
                    ? <li className="px-4 py-3 text-center text-xs text-slate-400">No results</li>
                    : filtered.map((n) => (
                        <li key={n.country}>
                            <button
                                type="button"
                                onClick={() => { onChange(n); setOpen(false); setQuery(''); }}
                                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-colors hover:bg-blue-50 hover:text-blue-700 ${
                                    n.country === value.country ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700'
                                }`}
                            >
                                <span className="text-base leading-none">{n.flag}</span>
                                <span className="flex-1 truncate">{n.nationality}</span>
                                <span className="shrink-0 text-xs text-slate-400">{n.country}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>,
        document.body,
    ) : null;

    return (
        <div className="relative">
            <button
                ref={triggerRef}
                type="button"
                onClick={openDropdown}
                className="flex w-full items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm transition-all hover:border-blue-300 hover:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
                <span className="flex-1 truncate text-left text-sm font-medium text-slate-700">{value.nationality}</span>
                <HiChevronDown className={`size-3.5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {dropdown}
        </div>
    );
}
