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
      apiKey: 'rzpSduhT63F6jaS35HFo',
      region: 'us',
      scriptUrlPattern: [
        'https://fingerprint.com/s2MB/?b=load-vercel&v=<version>&a=<apiKey>&l=<loaderVersion>',
        defaultScriptUrlPattern,
      ],
      endpoint: [
        // 'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu',
        'https://fingerprint.com/r4a0Rd2Xs/',
        // defaultEndpoint,
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

  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  return (
    <>
      <main className="m-10">
        <h1>Pure NPM package</h1>
        <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
      </main>
    </>
  );
}
