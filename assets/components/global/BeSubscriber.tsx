'use client';
import { useAppContext } from '@/assets/context/AppContext';
import BeSubscriberUI from './_BeSubscriberUI';

export default function BeSubscriber() {
    const { session } = useAppContext();
    if (session) return null;
    return <BeSubscriberUI />;
}
