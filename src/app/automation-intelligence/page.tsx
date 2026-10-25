import { headers } from 'next/headers';
import { collectAutomationIntelligence } from './collectIntelligence';

export const dynamic = 'force-dynamic';

export default async function AutomationIntelligencePage() {
  const headerStore = headers();
  const host = headerStore.get('host') ?? 'localhost';
  const proto = headerStore.get('x-forwarded-proto') ?? 'http';
  const url = `${proto}://${host}/automation-intelligence`;

  const requestHeaders = new Headers();
  for (const [name, value] of headerStore.entries()) {
    requestHeaders.append(name, value);
  }

  const request = new Request(url, { method: 'GET', headers: requestHeaders });

  let result: unknown;
  let errorMessage: string | null = null;
  try {
    result = await collectAutomationIntelligence(request);
  } catch (error) {
    console.error(error);
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  return (
    <div>
      <h1>Automation Intelligence</h1>
      <p>
        Collect Intelligence for this page request via{' '}
        <a href="https://docs.fingerprint.com/reference/automation-intelligence-api">
          Automation Intelligence API
        </a>
        . JSON also at <a href="/api/automation-intelligence">/api/automation-intelligence</a>.
      </p>
      {errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
