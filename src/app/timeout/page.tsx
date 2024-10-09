'use client';
// import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';
import FingerprintJS, {
  defaultEndpoint,
  defaultScriptUrlPattern,
  GetResult,
} from '@fingerprintjs/fingerprintjs-pro';

export default function ClientPage() {
  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({
      apiKey: '2UZgp3skqLzfJpFUGUrw',
      region: 'eu',
      scriptUrlPattern: [
        'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
      ],
      endpoint: ['https://fp.jurajuhlar.eu'],
    });

    // Analyze the visitor when necessary.
    fpPromise
      .then((fp) => fp.get({ timeout: 1000 }))
      .then((result) => {
        console.log(result.requestId, result.visitorId);
        setFingerprintData(result);
      });
  }, []);

  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(
    null,
  );

  return (
    <>
      <main className="m-10">
        <h1>Pure NPM package</h1>
        <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
      </main>
    </>
  );
}
