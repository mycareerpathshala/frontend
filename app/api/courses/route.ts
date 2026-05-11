// imports
import { CourseListResponseType } from '@/assets/types/courseTypes';
import { fetchData } from '@/assets/utilities/getRequest';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const fetchQuery = qs.parse(searchParams.toString());

        const response = await fetchData('/api/courses', fetchQuery, false);
        const parsedResponse: CourseListResponseType = await response.json();

        return NextResponse.json({
            status: 'success',
            response: parsedResponse,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 'error',
            message: 'failed to get course data',
        }, { status: 500 });
    }
}
