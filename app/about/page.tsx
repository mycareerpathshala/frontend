import AboutContent from '@/assets/components/about/AboutContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | My Career Pathshala',
    description:
        'Meet the team behind MyCareerPathshala — experienced career mentors dedicated to guiding students toward the right academic and professional paths.',
};

export default function AboutPage() {
    return <AboutContent />;
}
