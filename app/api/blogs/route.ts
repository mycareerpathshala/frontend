// imports
import { BlogListResponseType } from '@/assets/types/blogTypes';
import { fetchData } from '@/assets/utilities/getRequest';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const fetchQuery = qs.parse(searchParams.toString());

        const response = await fetchData('/api/blogs', fetchQuery, false);
        const parsedResponse: BlogListResponseType = await response.json();

        return NextResponse.json({
            status: 'success',
            response: parsedResponse,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 'error',
            message: 'failed to get blogs data',
        }, { status: 500 });
    }
}
