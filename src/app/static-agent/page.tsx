'use client';
// import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro-static';
import { GetResult } from '@fingerprintjs/fingerprintjs-pro-static';

export default function ClientPage() {
  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({
      apiKey: '2UZgp3skqLzfJpFUGUrw',
      region: 'eu',
      modules: [
        FingerprintJS.makeIdentificationModule(), // If you use identification
        FingerprintJS.makeBotdModule(), // If you use bot detection
        FingerprintJS.makeLatencyReportModule(), // For performance monitoring
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
        <h1>Static agent demo</h1>
        <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
      </main>
    </>
  );
}
