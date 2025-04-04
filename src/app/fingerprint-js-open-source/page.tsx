'use client';
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function ClientPage() {
  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();
      console.log(result.visitorId);
      setFingerprintData(result);
    })();
  }, []);

  const [fingerprintData, setFingerprintData] = useState<any>(null);

  return (
    <>
      <main className="m-10">
        <h1>FingerprintJS Open source</h1>
        <h2>Visitor ID: {fingerprintData?.visitorId} </h2>
        <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
      </main>
    </>
  );
}
