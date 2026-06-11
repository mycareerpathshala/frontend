import PrivacyContent from '@/assets/components/privacy/PrivacyContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | My Career Pathshala',
    description:
        'Learn how MyCareerPathshala collects, uses, and protects your personal information in compliance with Indian data protection law.',
};

export default function PrivacyPage() {
    return <PrivacyContent />;
}
