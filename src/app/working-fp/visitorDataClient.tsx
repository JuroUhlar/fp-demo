'use client';

import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { FunctionComponent, useEffect, useState } from 'react';
import { PUBLIC_API_KEY, CUSTOM_SUBDOMAIN } from '../../constants';

const VisitorDataClient: FunctionComponent = () => {
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

  console.log(fingerprintData);
  return (
    <>
      <div>Your visitorId: {fingerprintData?.visitorId}</div>
    </>
  );
};

export default VisitorDataClient;
