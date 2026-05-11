import { getSession } from '@/assets/lib/auth/session';
import { db } from '@/assets/lib/database/db';
import { applications } from '@/assets/lib/database/schema';
import { fetchData } from '@/assets/utilities/getRequest';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// ── GET /api/user/applications ────────────────────────────────────────────────

export async function GET() {
    try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const apps = await db
        .select()
        .from(applications)
        .where(eq(applications.userId, session.userId))
        .orderBy(applications.createdAt);

    if (apps.length === 0) return NextResponse.json({ data: [] });

    // Split by explicit type field
    const uniApps  = apps.filter((a) => a.type === 'general');
    const mbbsApps = apps.filter((a) => a.type === 'mbbs');

    const universityIds  = [...new Set(uniApps.map((a) => a.universityId))];
    const courseIds      = [...new Set(uniApps.map((a) => a.courseId).filter((id): id is string => id !== null))];
    const mbbsCollegeIds = [...new Set(mbbsApps.map((a) => a.universityId))];

    // Batch-fetch from Strapi in parallel (only what we need)
    const fetches: Promise<Response>[] = [];
    if (universityIds.length > 0) {
        fetches.push(
            fetchData('/api/universities', {
                fields:     ['documentId', 'name', 'acronym'],
                filters:    { documentId: { $in: universityIds } },
                populate:   { location: { populate: { country: { fields: ['name'] } } } },
                pagination: { pageSize: universityIds.length },
            }, false),
            fetchData('/api/courses', {
                fields:     ['documentId', 'courseName', 'courseLevel', 'degreeName'],
                filters:    { documentId: { $in: courseIds } },
                pagination: { pageSize: courseIds.length },
            }, false),
        );
    }
    if (mbbsCollegeIds.length > 0) {
        fetches.push(
            fetchData('/api/medical-colleges', {
                fields:     ['documentId', 'name', 'acronym'],
                filters:    { documentId: { $in: mbbsCollegeIds } },
                populate:   { location: { populate: { country: { fields: ['name'] } } } },
                pagination: { pageSize: mbbsCollegeIds.length },
            }, false),
        );
    }

    const results = await Promise.all(fetches);

    type UniRow    = { documentId: string; name: string; acronym?: string; location?: { country?: { name?: string } } };
    type CourseRow = { documentId: string; courseName: string; courseLevel?: string; degreeName?: string };

    let uniMap:    Record<string, UniRow>    = {};
    let courseMap: Record<string, CourseRow> = {};
    let mbbsMap:   Record<string, UniRow>    = {};

    let idx = 0;
    if (universityIds.length > 0) {
        const uniData    = (await results[idx++].json()).data ?? [];
        const courseData = (await results[idx++].json()).data ?? [];
        uniMap    = Object.fromEntries(uniData.map((u: UniRow) => [u.documentId, u]));
        courseMap = Object.fromEntries(courseData.map((c: CourseRow) => [c.documentId, c]));
    }
    if (mbbsCollegeIds.length > 0) {
        const mbbsData = (await results[idx].json()).data ?? [];
        mbbsMap = Object.fromEntries(mbbsData.map((u: UniRow) => [u.documentId, u]));
    }

    const enriched = apps.map((app) => {
        if (app.type === 'mbbs') {
            const college = mbbsMap[app.universityId];
            return {
                id:                app.id,
                type:              'mbbs' as const,
                universityId:      app.universityId,
                courseId:          null,
                status:            app.status,
                notes:             app.notes,
                createdAt:         app.createdAt,
                updatedAt:         app.updatedAt,
                universityName:    college?.name ?? 'Unknown College',
                universityAcronym: college?.acronym ?? null,
                country:           college?.location?.country?.name ?? null,
                courseName:        null,
                courseLevel:       'MBBS',
                degreeName:        null,
            };
        }

        const uni    = uniMap[app.universityId];
        const course = courseMap[app.courseId!];
        return {
            id:                app.id,
            type:              'general' as const,
            universityId:      app.universityId,
            courseId:          app.courseId,
            status:            app.status,
            notes:             app.notes,
            createdAt:         app.createdAt,
            updatedAt:         app.updatedAt,
            universityName:    uni?.name          ?? 'Unknown University',
            universityAcronym: uni?.acronym       ?? null,
            country:           uni?.location?.country?.name ?? null,
            courseName:        course?.courseName  ?? 'Unknown Course',
            courseLevel:       course?.courseLevel ?? null,
            degreeName:        course?.degreeName  ?? null,
        };
    });

    return NextResponse.json({ data: enriched });
    } catch (err) {
        console.error('[applications GET]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}

// ── POST /api/user/applications ───────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const { universityId, courseId, type = 'general', notes } = body as {
            universityId?: string;
            courseId?: string | null;
            type?: 'general' | 'mbbs';
            notes?: string;
        };

        if (!universityId) {
            return NextResponse.json({ error: 'universityId is required' }, { status: 400 });
        }
        if (type === 'general' && !courseId) {
            return NextResponse.json({ error: 'courseId is required for general applications' }, { status: 400 });
        }

        const [created] = await db
            .insert(applications)
            .values({ userId: session.userId, universityId, courseId: courseId ?? null, type, notes: notes || null })
            .returning();

        return NextResponse.json({ data: created }, { status: 201 });
    } catch (err) {
        console.error('[applications POST]', err);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
