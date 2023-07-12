'use client';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';




export default function ClientPage() {
  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({
      apiKey: '2UZgp3skqLzfJpFUGUrw',
      region: 'eu',
      scriptUrlPattern: [
        'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/buc1pMANm4wmx5j1?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
        FingerprintJS.defaultScriptUrlPattern,
      ],
      endpoint: [
        'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu',
        FingerprintJS.defaultEndpoint,
      ],
    });

    // Analyze the visitor when necessary.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        console.log(result.requestId, result.visitorId);
        setFingerprintData(result);
      });
  }, []);

  const [fingerprintData, setFingerprintData] =
    useState<FingerprintJS.GetResult | null>(null);

  return (
    <>
      <main className="m-10">
        <h1>Pure NPM package</h1>
        <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
      </main>
    </>
  );
}
