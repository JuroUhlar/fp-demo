import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import Head from 'next/head';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../../constants';

export default async function ServerPage() {
  const fpPromise = FingerprintJS.load({
    apiKey: PUBLIC_API_KEY,
    endpoint: CUSTOM_SUBDOMAIN,
  });
  const fp = await fpPromise;
  const data = await fp.get({ extendedResult: true });

  console.log(data);
  return (
    <>
      <main className="m-10">
        <div>
          <h1>This page was rendered server-side in the `app` directory</h1>
          <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
          <div>Your visitorId: {data?.visitorId}</div>
          <div></div>
        </div>
      </main>
    </>
  );
}