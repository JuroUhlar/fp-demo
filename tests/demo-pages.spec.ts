import { test } from '@playwright/test';
import { checkDemoPageVisitorIds } from './check_demo_page';

// Array of all demo URLs to test
const demoUrls = [
  '/cloudflare-production',
  '/cloudflare-manual-setup',
  '/cloudflare-staging',
];

// Generate a test for each demo URL
test.describe('Fingerprint Demo Pages', () => {
  for (const url of demoUrls) {
    test(`${url} should have display visitor data (agent and server api)`, async ({ page }) => {
      await checkDemoPageVisitorIds(page, url);
    });
  }
});
