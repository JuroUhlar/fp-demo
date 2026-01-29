'use client';

import { FingerprintProvider, useVisitorData } from '@fingerprint/react';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

function ReactSdkSimpleDemo() {
  const { isLoading, error, data, getData } = useVisitorData({ immediate: true });

  return (
    <div>
      <button onClick={() => getData({ timeout: 10000 })}>Reload data</button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitor_id}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function WithProvider() {
  return (
    <FingerprintProvider apiKey="nND4eJzLfDJjdxy5hNc9" endpoints={[STAGING_WARDEN_URL]}>
      <ReactSdkSimpleDemo />
    </FingerprintProvider>
  );
}
