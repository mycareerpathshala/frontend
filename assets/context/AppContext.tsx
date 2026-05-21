'use client';

// imports
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Session type
export interface SessionUser {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar: string;
    isVerified: boolean;
    phone: string | null;
}

// AppContext type
interface AppContextType {
    searchEnabled: boolean;
    setSearchEnabled: (value: boolean) => void;
    authPopupEnabled: boolean;
    setAuthPopupEnabled: (value: boolean) => void;
    authModalEnabled: boolean;
    setAuthModalEnabled: (value: boolean) => void;
    session: SessionUser | null;
    setSession: (value: SessionUser | null) => void;
    refreshSession: () => Promise<void>;
}

// context
const AppContext = createContext<AppContextType | undefined>(undefined);

// provider
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [searchEnabled, setSearchEnabled] = useState<boolean>(false);
    const [authPopupEnabled, setAuthPopupEnabled] = useState<boolean>(false);
    const [authModalEnabled, setAuthModalEnabled] = useState<boolean>(false);
    const [session, setSession] = useState<SessionUser | null>(null);

    const refreshSession = useCallback(async () => {
        try {
            const data = await fetch('/api/auth/me').then((r) => r.json());
            setSession(data);
        } catch {
            setSession(null);
        }
    }, []);

    useEffect(() => { refreshSession(); }, [refreshSession]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // check for ctrl+k or cmd+k
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            setSearchEnabled((prev) => !prev);
        }

        // check for escape key
        if (e.key === 'Escape') {
            setSearchEnabled(false);
            setAuthPopupEnabled(false);
            setAuthModalEnabled(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <AppContext.Provider
            value={{
                searchEnabled, setSearchEnabled,
                authPopupEnabled, setAuthPopupEnabled,
                authModalEnabled, setAuthModalEnabled,
                session, setSession,
                refreshSession,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// use appContext hook
export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('AppContext must be used within a AppProvider');
    }

    return context;
}
