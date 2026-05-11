// imports
import { MedicalResponseType } from '@/assets/types/mbbsTypes';
import { fetchData } from '@/assets/utilities/getRequest';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const fetchQuery = qs.parse(searchParams.toString());

        const response = await fetchData('/api/medical-colleges', fetchQuery, false);
        const parsedResponse: MedicalResponseType = await response.json();

        return NextResponse.json({
            status: 'success',
            response: parsedResponse,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 'error',
            message: 'failed to get mbbs data',
        }, { status: 500 });
    }
}
