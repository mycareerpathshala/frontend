import { ApplicationStatus } from '@/assets/lib/applications';

// Application row from the DB enriched with Strapi CMS details
export interface EnrichedApplication {
    id: string;
    type: 'general' | 'mbbs';
    universityId: string;
    courseId: string | null;
    status: ApplicationStatus;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    // Strapi enriched fields
    universityName: string;
    universityAcronym: string | null;
    country: string | null;
    courseName: string | null;
    courseLevel: string | null;
    degreeName: string | null;
}
