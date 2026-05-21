'use client';

import ApplicationPopup from '@/assets/components/global/ApplicationPopup';
import { useAppContext } from '@/assets/context/AppContext';
import { useState } from 'react';

interface ApplyNowButtonProps {
    className?: string;
    university?: {
        documentId: string;
        name: string;
        acronym?: string;
        country?: string;
    };
    course?: {
        documentId: string;
        courseName: string;
        courseLevel: string;
        degreeName: string;
    };
}

export default function ApplyNowButton({ className, university, course }: ApplyNowButtonProps) {
    const { session, setAuthModalEnabled } = useAppContext();
    const [showPopup, setShowPopup] = useState(false);

    function handleClick() {
        if (!session) {
            setAuthModalEnabled(true);
            return;
        }
        setShowPopup(true);
    }

    async function handleSubmit(data: { universityId: string; courseId: string; notes: string }) {
        await fetch('/api/user/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    return (
        <>
            {showPopup && (
                <ApplicationPopup
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleSubmit}
                    preselectedUniversity={university}
                    preselectedCourse={course}
                />
            )}
            <button type="button" onClick={handleClick} className={className}>
                Apply Now
            </button>
        </>
    );
}
