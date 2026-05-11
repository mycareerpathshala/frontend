'use client';

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { HiAdjustmentsVertical, HiBookmark, HiCheck, HiExclamationCircle, HiTrash, HiXMark } from 'react-icons/hi2';
import { MdClear } from 'react-icons/md';

// ── Save-choice inline popup ──────────────────────────────────────────────────

function SaveChoicePopup({
    defaultName,
    onSave,
    onClose,
}: {
    defaultName: string;
    onSave: (name: string) => void;
    onClose: () => void;
}) {
    const [name, setName] = useState(defaultName);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus on mount
    React.useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') onSave(name.trim() || defaultName);
        if (e.key === 'Escape') onClose();
    }

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

            {/* Card */}
            <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/20">
                {/* Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-indigo-500 px-5 py-4">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '18px 18px',
                        }}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-3 right-3 z-100 flex size-7 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-red-400"
                    >
                        <HiXMark className="size-4" />
                    </button>
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-white/20">
                            <HiBookmark className="size-4.5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-extrabold text-white">Save Your Choice</h2>
                            <p className="text-[11px] text-blue-100/80">Name this preference set</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5">
                    <label className="mb-2 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        Preference Name
                    </label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. UK Engineering UG"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 transition-all outline-none placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <p className="mt-2 text-[11px] text-slate-400">This will be saved to your dashboard preferences.</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition-all select-none hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => onSave(name.trim() || defaultName)}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-200 transition-all select-none hover:bg-blue-700 active:scale-[0.98]"
                    >
                        <HiCheck className="size-3.5" />
                        Save preference
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── FilterBlock ───────────────────────────────────────────────────────────────

export default function FilterBlock({
    setShowFilter,
    clearAllFilters,
    activeFilters,
    isPending,
    removeFilter,
    onSaveChoice,
    defaultSaveName,
}: {
    setShowFilter: Dispatch<SetStateAction<boolean>>;
    clearAllFilters: () => void;
    activeFilters: { key: string; label: string; value: string }[];
    isPending: boolean;
    removeFilter: (label: string) => void;
    onSaveChoice?: (name: string) => Promise<boolean>;
    defaultSaveName?: string;
}) {
    const [activeFilterHover, setActiveFilterHover] = useState<string | null>(null);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [savedFlash, setSavedFlash] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

    async function handleSave(name: string) {
        setShowSavePopup(false);
        if (!onSaveChoice) return;
        setSavedFlash('saving');
        const ok = await onSaveChoice(name);
        setSavedFlash(ok ? 'success' : 'error');
        setTimeout(() => setSavedFlash('idle'), 2500);
    }

    return (
        <>
            {showSavePopup && (
                <SaveChoicePopup
                    defaultName={defaultSaveName ?? 'My Preference'}
                    onSave={handleSave}
                    onClose={() => setShowSavePopup(false)}
                />
            )}

            <div className="mt-8 w-full max-w-7xl rounded-xl border border-gray-500 bg-[#FAF9FA] px-6 py-4 max-sm:p-3">
                <div>
                    <div className="flex items-center justify-between max-sm:flex-col max-sm:items-center max-sm:gap-8">
                        <div className="flex items-center gap-7 max-sm:flex-col max-sm:gap-4">
                            <p className="text-base font-medium">Set your filter as per your choice</p>

                            {activeFilters.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {savedFlash === 'success' ? (
                                        <span className="flex items-center gap-1.5 rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white">
                                            <HiCheck className="size-4" />
                                            Saved!
                                        </span>
                                    ) : savedFlash === 'error' ? (
                                        <span className="flex items-center gap-1.5 rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white">
                                            <HiExclamationCircle className="size-4" />
                                            Failed to save
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={savedFlash === 'saving'}
                                            onClick={() => setShowSavePopup(true)}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-400 px-5 py-2 text-sm font-semibold text-white transition-all duration-200 select-none hover:bg-orange-500 active:scale-[0.98] disabled:opacity-60 max-sm:w-full max-sm:py-3 max-sm:whitespace-nowrap"
                                        >
                                            <HiBookmark className="size-4" />
                                            {savedFlash === 'saving' ? 'Saving…' : 'Save Your Choice'}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="max-sm:w-full">
                            <button
                                type="button"
                                onClick={() => setShowFilter(true)}
                                className="from-primary-gray hover:border-primary-base flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-100 bg-linear-to-r to-[#fbe1ff] px-6 py-2 text-sm font-medium transition-all duration-200 ease-in-out select-none hover:shadow-md hover:brightness-105 active:scale-95 max-sm:py-3"
                            >
                                <span>Course Filters</span>
                                <span>
                                    <HiAdjustmentsVertical className="size-6" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {activeFilters.length > 0 && (
                        <div className="mt-6 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
                            <div className="flex items-center justify-between max-xl:items-end max-xl:gap-8 max-md:relative max-sm:flex-col">
                                <div className="flex items-center gap-5 text-base max-xl:flex-col max-xl:items-start max-xl:gap-3 max-sm:w-full">
                                    <p className="text-primary-base font-semibold">
                                        {activeFilters.length} Filters Selected:
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 max-sm:gap-3 max-sm:text-sm">
                                        {activeFilters.map((activeObject) => (
                                            <div
                                                key={activeObject.key}
                                                onMouseEnter={() => setActiveFilterHover(activeObject.label)}
                                                onMouseLeave={() => setActiveFilterHover(null)}
                                                className="relative flex items-center justify-center gap-2 rounded-2xl bg-sky-100 px-3 py-1"
                                            >
                                                <span
                                                    className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-lg transition-all duration-200 ease-out after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-800 ${
                                                        activeFilterHover === activeObject.label
                                                            ? 'visible translate-y-0 opacity-100'
                                                            : 'invisible translate-y-1 opacity-0'
                                                    }`}
                                                >
                                                    {activeObject.value}
                                                </span>
                                                <span className="select-none">{activeObject.label}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFilter(activeObject.key)}
                                                    className="cursor-pointer rounded-full bg-red-300 p-0.5 select-none hover:bg-red-400"
                                                >
                                                    <MdClear className="size-4 text-white" />
                                                    <span className="hidden">Close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="max-md:absolute max-md:top-0 max-md:right-0 max-sm:static max-sm:flex max-sm:w-full max-sm:items-center max-sm:justify-center">
                                    <button
                                        type="button"
                                        disabled={isPending}
                                        onClick={() => clearAllFilters()}
                                        className={`text-secondary-base flex items-center gap-2 text-sm transition-all duration-200 ease-in-out select-none ${
                                            isPending
                                                ? 'cursor-not-allowed opacity-50'
                                                : 'hover:text-secondary-dark cursor-pointer hover:scale-105'
                                        }`}
                                    >
                                        <span>
                                            {isPending ? (
                                                <div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                                            ) : (
                                                <HiTrash className="size-5 pb-0.5" />
                                            )}
                                        </span>
                                        <span className="font-semibold whitespace-nowrap">
                                            {isPending ? 'Clearing...' : 'Remove All Filters'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
