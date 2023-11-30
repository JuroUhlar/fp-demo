'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import FingerprintJS, { ExtendedGetResult } from '@fingerprintjs/fingerprintjs-pro';
import { PUBLIC_API_KEY } from '../../constants';

const ProxyPlayground: FunctionComponent = ({}) => {
  const [visitorData, setVisitorData] = useState<ExtendedGetResult>();

  useEffect(() => {
    const tryDefault = async () => {
      // Initialize an agent at application startup.
      const fpAgent = await FingerprintJS.load({
        apiKey: PUBLIC_API_KEY,
        scriptUrlPattern:
          '/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      });
      fpAgent.get({ extendedResult: true }).then((result) => {
        setVisitorData(result);
      });
    };

    tryDefault();
  }, []);

  return (
    <div>
      <h1>Proxy Playground</h1>
      <pre>{JSON.stringify(visitorData, null, 2)}</pre>
    </div>
  );
};

export default ProxyPlayground;
