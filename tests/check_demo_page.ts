import { expect, Page } from '@playwright/test';
import { TEST_IDS } from './test_ids';

function parseRequestId(inputString: string) {
  const regex = /"requestId":\s*"([^"]+)"/;
  const match = inputString.match(regex);

  if (match && match[1]) {
    return match[1];
  }
  return null;
}

const REQUEST_ID_LENGTH = 20;

/**
 * Reusable test function that visits a demo page and verifies that both
 * the JS agent response and server API response contain valid visitor IDs
 */
export async function checkDemoPageVisitorIds(page: Page, url: string) {
  // Navigate to the provided URL
  await page.goto(url);

  // Wait for both response elements to be visible
  await expect(page.getByTestId(TEST_IDS.AGENT_RESPONSE)).toBeVisible();
  await expect(page.getByTestId(TEST_IDS.SERVER_API_RESPONSE)).toBeVisible();

  // Get the content of both response elements
  const agentResponse = await page.getByTestId(TEST_IDS.AGENT_RESPONSE).textContent();
  const serverApiResponse = await page.getByTestId(TEST_IDS.SERVER_API_RESPONSE).textContent();

  const agentRequestId = parseRequestId(agentResponse || '');
  const serverApiRequestId = parseRequestId(serverApiResponse || '');

  expect(agentRequestId).toHaveLength(REQUEST_ID_LENGTH);
  expect(serverApiRequestId).toHaveLength(REQUEST_ID_LENGTH);
  expect(agentRequestId).toEqual(serverApiRequestId);
}
