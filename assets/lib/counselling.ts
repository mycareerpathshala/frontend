import type { WeekDay, TimeRange } from '@/assets/lib/database/schema';

// Re-export so components only need to import from this file
export type { WeekDay, TimeRange };

export type CounsellingStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled';
export type StudyLevel = 'Undergraduate' | 'Postgraduate' | 'MBBS';

export interface CounsellingRequest {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string;
    studyLevel: StudyLevel;
    message: string;
    preferredDays: WeekDay[];
    preferredTimeRanges: TimeRange[];
    counsellorId: string | null;
    scheduledTime: string | null;  // ISO string
    meetingLink: string | null;
    status: CounsellingStatus;
    createdAt: string;             // ISO string
    updatedAt: string;             // ISO string
}

// Payload sent when creating a new request (user-supplied fields only)
export type NewCounsellingRequestPayload = Pick<
    CounsellingRequest,
    'name' | 'email' | 'phone' | 'studyLevel' | 'message' | 'preferredDays' | 'preferredTimeRanges'
>;
