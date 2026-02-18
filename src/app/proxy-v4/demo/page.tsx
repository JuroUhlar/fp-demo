'use client';

import { useState, useEffect } from 'react';
import { NpmPackageIdentificationDemoV4 } from '../../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../../constants';

export default function ExamplePage() {
  const [endpoints, setEndpoints] = useState<string | null>(null);

  useEffect(() => {
    setEndpoints(new URL('/proxy-v4', window.location.origin).toString());
  }, []);

  if (!endpoints) {
    return null;
  }

  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoints,
      }}
      getOptions={{
        linkedId: 'Main Production custom proxy integration',
      }}
      name={'Main Production custom proxy integration'}
      description={
        <div>
          You can use these query params to debug the proxy integration:
          <ul>
            <li>
              <code>proxySecret</code> - The secret key for the proxy
            </li>
            <li>
              <code>proxyClientIp</code> - The client IP address for the proxy
            </li>
            <li>
              <code>proxyForwardedHost</code> - The forwarded host for the proxy
            </li>
          </ul>
        </div>
      }
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
