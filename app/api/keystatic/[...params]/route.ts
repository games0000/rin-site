import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// Debug logging
console.log('Keystatic Route Handler Initialized');
console.log('Environment Check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);

const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
const secret = process.env.KEYSTATIC_SECRET;

console.log('- KEYSTATIC_GITHUB_CLIENT_ID exists:', !!clientId);
if (clientId) {
    console.log(`- Client ID (first 5): ${clientId.substring(0, 5)}...`);
    console.log(`- Client ID (length): ${clientId.length}`);
}

console.log('- KEYSTATIC_GITHUB_CLIENT_SECRET exists:', !!clientSecret);
if (clientSecret) {
    console.log(`- Client Secret (first 2): ${clientSecret.substring(0, 2)}...`);
    console.log(`- Client Secret (last 2): ...${clientSecret.substring(clientSecret.length - 2)}`);
    console.log(`- Client Secret (length): ${clientSecret.length}`);
}

console.log('- KEYSTATIC_SECRET exists:', !!secret);
if (secret) {
    console.log(`- Secret (length): ${secret.length}`);
}

// Log config repo to verify
const repoConfig = config.storage.kind === 'github' ? config.storage.repo : 'local';
console.log('- Configured Repo:', repoConfig);

export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({
  config,
});
