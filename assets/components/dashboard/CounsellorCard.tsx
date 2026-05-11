'use client';

import { useAppContext } from '@/assets/context/AppContext';
import { type NewCounsellingRequestPayload } from '@/assets/lib/counselling';
import CounsellingPopUp from '@/assets/components/global/CounsellingPopUp';
import { useState } from 'react';
import { HiArrowRight, HiSparkles, HiChatBubbleOvalLeftEllipsis, HiUserGroup } from 'react-icons/hi2';
import { MdSupportAgent } from 'react-icons/md';

export default function CounsellorCard() {
    const { session } = useAppContext();
    const [showPopup, setShowPopup] = useState(false);

    async function handleSave(req: NewCounsellingRequestPayload) {
        await fetch('/api/counselling/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
        });
        setShowPopup(false);
    }

    return (
        <>
            {showPopup && (
                <CounsellingPopUp
                    session={session}
                    onClose={() => setShowPopup(false)}
                    onSave={handleSave}
                />
            )}

            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-6 relative overflow-hidden h-full flex flex-col">
                {/* Background decorations */}
                <div className="absolute -top-10 -right-10 size-44 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-12 size-28 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 w-fit mb-4">
                    <HiSparkles className="size-3 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-600">Recommended for you</span>
                </div>

                {/* Heading */}
                <h3 className="text-xl font-extrabold text-slate-800 leading-snug mb-2">
                    You need your career{' '}
                    <span className="text-blue-600">counsellor</span> to study abroad.
                </h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">
                    Apply your career counsellor now and make your dream come true with expert personalised guidance.
                </p>

                {/* Stat pills */}
                <div className="flex items-center gap-2 mb-6">
                    {[
                        { icon: HiUserGroup, label: '1200+ Counselled' },
                        { icon: HiChatBubbleOvalLeftEllipsis, label: 'Free Session' },
                    ].map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500"
                        >
                            <Icon className="size-3.5 text-blue-500" />
                            {label}
                        </div>
                    ))}
                </div>

                {/* CTA button */}
                <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-[0.98] w-fit select-none"
                >
                    <MdSupportAgent className="size-4.5" />
                    Request Counsellor
                    <HiArrowRight className="size-4" />
                </button>

                {/* Decorative icon */}
                <div className="absolute bottom-5 right-6 opacity-[0.06] pointer-events-none">
                    <MdSupportAgent className="size-28 text-blue-600" />
                </div>
            </div>
        </>
    );
}
