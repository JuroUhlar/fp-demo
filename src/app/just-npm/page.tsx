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
        // 'https://jurajuhlar.com/4kbcBcMdh7PNIl4t/fRu2ohVclZlSWEZR?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
        // 'https://fingerprint.com/s2MB/?b=load-vercel&v=<version>&a=<apiKey>&l=<loaderVersion>',
        // defaultScriptUrlPattern,
      ],
      endpoint: [
        'https://fp.jurajuhlar.eu',
        // 'https://jurajuhlar.com/4kbcBcMdh7PNIl4t/d7DCGmZNT3GvWo2Q?region=eu',
        // 'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu',
        // 'https://fingerprint.com/r4a0Rd2Xs/',
        defaultEndpoint,
      ],
    });

    // Analyze the visitor when necessary.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        console.log(result.requestId, result.visitorId);
        setFingerprintData(result);
      })
      .catch((error) => {
        switch (error.message) {
          case FingerprintJS.ERROR_GENERAL_SERVER_FAILURE:
            console.log('Unknown server error. Request id:', error.requestId);
            break;
          case FingerprintJS.ERROR_CLIENT_TIMEOUT:
            console.log('Identification time limit of 10 seconds is exceeded');
            break;
          default:
            console.log('Other error');
        }
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
