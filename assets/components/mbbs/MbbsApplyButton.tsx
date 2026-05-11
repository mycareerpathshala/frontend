'use client';

import MbbsApplicationPopup from '@/assets/components/global/MbbsApplicationPopup';
import { useAppContext } from '@/assets/context/AppContext';
import { useState } from 'react';
import { HiDocumentText } from 'react-icons/hi2';

interface MbbsApplyButtonProps {
    collegeDocumentId: string;
    collegeName: string;
    collegeAcronym?: string;
    country?: string;
}

export default function MbbsApplyButton({ collegeDocumentId, collegeName, collegeAcronym, country }: MbbsApplyButtonProps) {
    const { session, setAuthModalEnabled } = useAppContext();
    const [showPopup, setShowPopup] = useState(false);

    function handleClick() {
        if (!session) {
            setAuthModalEnabled(true);
            return;
        }
        setShowPopup(true);
    }

    async function handleSubmit(data: { universityId: string; notes: string }) {
        await fetch('/api/user/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ universityId: data.universityId, type: 'mbbs', notes: data.notes }),
        });
    }

    return (
        <>
            {showPopup && (
                <MbbsApplicationPopup
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleSubmit}
                    preselectedCollege={{ documentId: collegeDocumentId, name: collegeName, acronym: collegeAcronym, country }}
                />
            )}
            <button
                type="button"
                onClick={handleClick}
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow-sm shadow-teal-200 transition-all hover:bg-teal-700 active:scale-95"
            >
                <HiDocumentText className="size-4" />
                Apply Now
            </button>
        </>
    );
}
