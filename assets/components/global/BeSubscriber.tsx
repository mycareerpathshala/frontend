import { getSession } from '@/assets/lib/auth/session';
import BeSubscriberUI from './_BeSubscriberUI';

export default async function BeSubscriber() {
    const session = await getSession();
    if (session) return null;
    return <BeSubscriberUI />;
}
