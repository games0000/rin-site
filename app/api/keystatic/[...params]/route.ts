import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// Debug logging
console.log('Keystatic Route Handler Initialized');
console.log('Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- KEYSTATIC_GITHUB_CLIENT_ID exists:', !!process.env.KEYSTATIC_GITHUB_CLIENT_ID);
console.log('- KEYSTATIC_GITHUB_CLIENT_SECRET exists:', !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET);
console.log('- KEYSTATIC_SECRET exists:', !!process.env.KEYSTATIC_SECRET);
if (process.env.KEYSTATIC_GITHUB_CLIENT_ID) {
    console.log('- Client ID Prefix:', process.env.KEYSTATIC_GITHUB_CLIENT_ID.substring(0, 5) + '...');
}

export const { GET, POST } = makeRouteHandler({
  config,
});
