import { verifyStrapiTokenPermissions } from '@/lib/strapi';

/**
 * Health check endpoint to verify Strapi connection and token validity
 */
export async function GET() {
  try {
    const tokenVerification = await verifyStrapiTokenPermissions();
    
    return Response.json({
      status: 'ok',
      strapi: {
        connected: tokenVerification.valid,
        error: tokenVerification.error || null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
