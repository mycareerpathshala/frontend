'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiChevronDown, HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export const COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
    'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
    'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
    'Congo (Brazzaville)', 'Congo (Kinshasa)', 'Costa Rica', 'Croatia', 'Cuba',
    'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
    'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
    'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
    'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
    'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'São Tomé and Príncipe',
    'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
    'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe',
];

interface CountrySelectorProps {
    label?: string;
    value: string;
    onChange: (country: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function CountrySelector({
    label = 'Country',
    value,
    onChange,
    placeholder = 'Select a country…',
    disabled = false,
}: CountrySelectorProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = query.trim()
        ? COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
        : COUNTRIES;

    // Position the fixed dropdown relative to the trigger button
    function updatePosition() {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownStyle({
            position: 'fixed',
            top: rect.bottom + 6,
            left: rect.left,
            width: rect.width,
            zIndex: 9999,
        });
    }

    function handleOpen() {
        updatePosition();
        setOpen((o) => !o);
    }

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            const target = e.target as Node;
            const isInsideTrigger = triggerRef.current?.contains(target);
            const dropdown = document.getElementById('country-selector-dropdown');
            const isInsideDropdown = dropdown?.contains(target);
            if (!isInsideTrigger && !isInsideDropdown) {
                setOpen(false);
                setQuery('');
            }
        }
        if (open) {
            document.addEventListener('mousedown', handler);
            window.addEventListener('scroll', () => { setOpen(false); setQuery(''); }, { passive: true });
        }
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    function handleSelect(country: string) {
        onChange(country);
        setOpen(false);
        setQuery('');
    }

    function handleClear(e: React.MouseEvent) {
        e.stopPropagation();
        onChange('');
    }

    if (disabled) {
        return (
            <div>
                {label && (
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {label}
                    </label>
                )}
                <div className="flex w-full cursor-not-allowed items-center rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-400">
                    {value || <span className="italic">Not provided</span>}
                </div>
            </div>
        );
    }

    const dropdown = open && typeof document !== 'undefined'
        ? createPortal(
            <div
                id="country-selector-dropdown"
                style={dropdownStyle}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
            >
                {/* Search */}
                <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
                    <HiMagnifyingGlass className="size-4 shrink-0 text-slate-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search countries…"
                        className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 outline-none"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="text-slate-300 hover:text-slate-500"
                        >
                            <HiXMark className="size-3.5" />
                        </button>
                    )}
                </div>

                {/* List */}
                <ul className="max-h-52 overflow-y-auto py-1">
                    {filtered.length === 0 ? (
                        <li className="px-4 py-3 text-center text-xs text-slate-400">No countries found</li>
                    ) : (
                        filtered.map((country) => (
                            <li key={country}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(country)}
                                    className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50 hover:text-blue-700 ${
                                        country === value
                                            ? 'bg-blue-50 font-semibold text-blue-700'
                                            : 'text-slate-700'
                                    }`}
                                >
                                    {country}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>,
            document.body,
        )
        : null;

    return (
        <div className="relative">
            {label && (
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                </label>
            )}

            {/* Trigger button */}
            <button
                ref={triggerRef}
                type="button"
                onClick={handleOpen}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none transition-all hover:border-blue-300 hover:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
                <span className={value ? 'text-slate-700' : 'text-slate-300'}>
                    {value || placeholder}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                    {value && (
                        <span
                            onClick={handleClear}
                            className="cursor-pointer rounded p-0.5 text-slate-300 transition-colors hover:bg-slate-200 hover:text-slate-500"
                        >
                            <HiXMark className="size-3.5" />
                        </span>
                    )}
                    <HiChevronDown
                        className={`size-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {dropdown}
        </div>
    );
}
