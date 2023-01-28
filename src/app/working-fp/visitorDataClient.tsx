'use client';

import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { useEffect, useState } from 'react';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../../constants';

export default function VisitorDataClient() {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: PUBLIC_API_KEY,
        endpoint: CUSTOM_SUBDOMAIN,
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  // const fpPromise = FingerprintJS.load({
  //   apiKey: '2UZgp3skqLzfJpFUGUrw', //
  // });

  // fpPromise
  //   .then((fp) => fp.get())
  //   .then((result) => {
  //     console.log(result.visitorId);
  //     setFingerprintData(result);
  //   });

  return (
    <>
      <div>Your visitorId: {fingerprintData?.visitorId}</div>
    </>
  );
}
