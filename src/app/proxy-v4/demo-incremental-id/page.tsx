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
        // @ts-expect-error
        optimizeRepeatedVisits: true,
      }}
      getOptions={{
        linkedId: 'Main Production Proxy V4 custom proxy integration',
      }}
      name={'Main Production Proxy V4 custom proxy integration'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
