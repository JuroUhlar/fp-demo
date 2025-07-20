import { test } from '@playwright/test';
import { checkDemoPageVisitorIds } from './test_utils';

// Array of all demo URLs to test
const demoUrls = [
  '/cloudflare-production',
  '/cloudflare-manual-setup',
  '/cloudflare-staging',
  '/cloudflare-staging-diff-env',
  '/cloudflare-staging-diff-env-2',
  '/proxy/demo',
  '/proxy-staging/demo',
  '/proxy-staging/demo-diff-env',
  '/proxy-staging/demo-diff-env-2',
];

// Generate a test for each demo URL
test.describe('Fingerprint Demo Pages', () => {
  for (const url of demoUrls) {
    test(`${url} should have display visitor data (agent and server api)`, async ({ page }) => {
      await checkDemoPageVisitorIds(page, url);
    });
  }
});
