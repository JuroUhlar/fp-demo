import { FingerprintJsServerApiClient } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { SUBS } from '../../constants';

export default async function NodeSDKSearchDemo() {
  const client = new FingerprintJsServerApiClient({
    region: SUBS.main.serverApiRegion,
    apiKey: SUBS.main.serverApiKey,
  });
  try {
    const response = await client.searchEvents({
      limit: 10,
      bot: 'none',
      visitor_id: 'V7SFewvYQ2tfzmHakxQX',
      end: Date.now(),
      start: Date.now() - 7 * 24 * 60 * 60 * 1000,
      ip_address: '178.41.228.105/32',
      linked_id: 'Next.js',
      reverse: true,
      // suspect: false,
    });
    console.log(JSON.stringify(response, null, 2));
    return (
      <div>
        <h1>Node SDK Search Demo</h1>
        <p>Returned {response.events?.length} events</p>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div>
        Error:{' '}
        {error instanceof Error
          ? error.message
          : JSON.stringify(error, null, 2)}
      </div>
    );
  }
}
