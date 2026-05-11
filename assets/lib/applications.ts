export type ApplicationStatus =
    | 'draft'
    | 'submitted'
    | 'under_review'
    | 'offer_received'
    | 'accepted'
    | 'rejected'
    | 'withdrawn';

export interface UniversityApplication {
    id: string;
    universityName: string;
    courseName: string;
    country: string;
    courseLevel: 'Undergraduate' | 'Postgraduate' | 'PhD' | 'Diploma' | 'Foundation';
    status: ApplicationStatus;
    notes: string;
    appliedAt: string;  // ISO
    updatedAt: string;  // ISO
}

// Status display config
export const APPLICATION_STATUS_CONFIG: Record<
    ApplicationStatus,
    { label: string; color: string; bg: string; step: number }
> = {
    draft:          { label: 'Draft',          color: 'text-slate-600',  bg: 'bg-slate-100',   step: 0 },
    submitted:      { label: 'Submitted',      color: 'text-blue-700',   bg: 'bg-blue-100',    step: 1 },
    under_review:   { label: 'Under Review',   color: 'text-indigo-700', bg: 'bg-indigo-100',  step: 2 },
    offer_received: { label: 'Offer Received', color: 'text-purple-700', bg: 'bg-purple-100',  step: 3 },
    accepted:       { label: 'Accepted',       color: 'text-green-700',  bg: 'bg-green-100',   step: 4 },
    rejected:       { label: 'Rejected',       color: 'text-red-700',    bg: 'bg-red-100',     step: -1 },
    withdrawn:      { label: 'Withdrawn',      color: 'text-slate-500',  bg: 'bg-slate-100',   step: -1 },
};

export const APPLICATION_STEPS = ['Submitted', 'Under Review', 'Offer', 'Accepted'];

function key(userId: number) {
    return `mcp_applications_${userId}`;
}

export function getApplications(userId: number): UniversityApplication[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(key(userId));
        return raw ? (JSON.parse(raw) as UniversityApplication[]) : [];
    } catch {
        return [];
    }
}

export function addApplication(
    userId: number,
    app: Omit<UniversityApplication, 'id' | 'appliedAt' | 'updatedAt'>,
): UniversityApplication {
    const now = new Date().toISOString();
    const newApp: UniversityApplication = {
        ...app,
        id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        appliedAt: now,
        updatedAt: now,
    };
    const all = getApplications(userId);
    localStorage.setItem(key(userId), JSON.stringify([newApp, ...all]));
    return newApp;
}

export function updateApplicationStatus(
    userId: number,
    id: string,
    status: ApplicationStatus,
): void {
    const updated = getApplications(userId).map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a,
    );
    localStorage.setItem(key(userId), JSON.stringify(updated));
}

export function deleteApplication(userId: number, id: string): void {
    const updated = getApplications(userId).filter((a) => a.id !== id);
    localStorage.setItem(key(userId), JSON.stringify(updated));
}
