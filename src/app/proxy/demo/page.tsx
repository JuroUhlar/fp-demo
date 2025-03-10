'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import FingerprintJS, { ExtendedGetResult } from '@fingerprintjs/fingerprintjs-pro';
import { PUBLIC_API_KEY } from '../../../constants';

const CustomProxyDemo: FunctionComponent = ({}) => {
  const [visitorData, setVisitorData] = useState<ExtendedGetResult>();

  const getData = async () => {
    // Initialize an agent at application startup.
    const fpAgent = await FingerprintJS.load({
      apiKey: PUBLIC_API_KEY,
      region: 'eu',
      scriptUrlPattern:
        '/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      endpoint: '/proxy/result?region=eu',
    });
    try {
      const result = await fpAgent.get({ extendedResult: true });
      setVisitorData(result);
    } catch (error: any) {
      console.log('!error', error?.requestId!);
    }
  };

  useEffect(() => {
    if (!visitorData) {
      getData();
    }
  }, [visitorData]);

  return (
    <div>
      <h1>Proxy Playground</h1>
      <button onClick={getData}>Get visitor data</button>
      <pre>{JSON.stringify(visitorData, null, 2)}</pre>
    </div>
  );
};

export default CustomProxyDemo;
