// ── Study Preference model ─────────────────────────────────────────────────────
//
// One student can have multiple saved preference sets.
// Each set mirrors the filter options available in FindCourse / FilterOption.
// Stored in localStorage keyed by userId so multiple browser users stay isolated.

export interface StudyPreference {
    id: string;
    name: string;
    // Country (Strapi documentId for URL, display name for UI)
    countryFilter: string | null;
    countryName: string | null;
    // Stream (Strapi documentId for URL, display name for UI)
    streamFilter: string | null;
    streamName: string | null;
    // Enum-based filters
    levelFilter: 'Undergraduate' | 'Postgraduate' | 'PhD / Doctorate' | 'Diploma / Certificate' | 'Foundation / Pathway' | 'Vocational Training' | 'Language Course' | null;
    deliveryMethodFilter: 'On-Campus' | 'Online' | 'Blended' | null;
    studyLanguageFilter: string | null;
    courseOfferingFilter: 'Full-Time' | 'Part-Time' | null;
    // Meta
    createdAt: string; // ISO string
}

function storageKey(userId: string) {
    return `mcp_prefs_${userId}`;
}

// ── Read ──────────────────────────────────────────────────────────────────────

export function getPreferences(userId: string): StudyPreference[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(storageKey(userId));
        return raw ? (JSON.parse(raw) as StudyPreference[]) : [];
    } catch {
        return [];
    }
}

// ── Create ────────────────────────────────────────────────────────────────────

export function addPreference(
    userId: string,
    pref: Omit<StudyPreference, 'id' | 'createdAt'>,
): StudyPreference {
    const newPref: StudyPreference = {
        ...pref,
        id: `pref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        createdAt: new Date().toISOString(),
    };
    const existing = getPreferences(userId);
    localStorage.setItem(storageKey(userId), JSON.stringify([newPref, ...existing]));
    return newPref;
}

// ── Delete ────────────────────────────────────────────────────────────────────

export function deletePreference(userId: string, id: string): void {
    const updated = getPreferences(userId).filter((p) => p.id !== id);
    localStorage.setItem(storageKey(userId), JSON.stringify(updated));
}

// ── Rename ────────────────────────────────────────────────────────────────────

export function renamePreference(userId: string, id: string, name: string): void {
    const updated = getPreferences(userId).map((p) =>
        p.id === id ? { ...p, name } : p,
    );
    localStorage.setItem(storageKey(userId), JSON.stringify(updated));
}

// ── URL builder ───────────────────────────────────────────────────────────────
// Reconstructs the /courses query string from a saved preference so the user
// can land directly on the filtered course listing.

export function buildPreferenceUrl(pref: StudyPreference): string {
    const params = new URLSearchParams();
    if (pref.countryFilter) params.set('countryFilter', pref.countryFilter);
    if (pref.streamFilter) params.set('streamFilter', pref.streamFilter);
    if (pref.levelFilter) params.set('levelFilter', pref.levelFilter);
    if (pref.deliveryMethodFilter) params.set('deliveryMethodFilter', pref.deliveryMethodFilter);
    if (pref.studyLanguageFilter) params.set('studyLanguageFilter', pref.studyLanguageFilter);
    if (pref.courseOfferingFilter) params.set('courseOfferingFilter', pref.courseOfferingFilter);
    const qs = params.toString();
    return qs ? `/courses?${qs}` : '/courses';
}

// ── Auto-name helper ──────────────────────────────────────────────────────────
// Generates a human-readable default name from the active filter combination.

export function autoPreferenceName(
    countryName: string | null,
    streamName: string | null,
    levelFilter: string | null,
): string {
    const parts = [countryName, streamName, levelFilter].filter(Boolean);
    return parts.length > 0 ? parts.join(' · ') : 'My Preference';
}
