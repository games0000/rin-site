import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const handler = makeRouteHandler({
  config,
});

const wrap = (method: 'GET' | 'POST') => async (req: NextRequest, context: any) => {
    const url = new URL(req.url);
    console.log(`[Keystatic ${method}] Path: ${url.pathname}`);
    console.log(`[Keystatic ${method}] Query: ${url.search}`);
    
    // Log headers to debug proxy/cookie issues
    const cookieHeader = req.headers.get('cookie');
    console.log(`[Keystatic] Cookie Header present: ${!!cookieHeader}`);
    if (cookieHeader) {
        console.log(`[Keystatic] Cookie length: ${cookieHeader.length}`);
    }

    const response = await handler[method](req, context);
    
    // Log redirect location to see if state is attached
    const location = response.headers.get('location');
    if (location) {
        console.log(`[Keystatic] Redirecting to: ${location}`);
        if (location.includes('state=')) {
            console.log('[Keystatic] State parameter detected in redirect');
        } else {
            console.error('[Keystatic] WARNING: No state parameter in redirect URL!');
        }
    }

    return response;
};

export const GET = wrap('GET');
export const POST = wrap('POST');
