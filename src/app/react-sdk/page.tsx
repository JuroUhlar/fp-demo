'use client';

import { FingerprintProvider, useVisitorData } from '@fingerprint/react';

function ReactSdkSimpleDemo() {
  const { isLoading, error, data, getData } = useVisitorData({ immediate: true });

  return (
    <div>
      <button onClick={() => getData()}>Reload data</button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitor_id}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function WithProvider() {
  return (
    <FingerprintProvider
      apiKey="2UZgp3skqLzfJpFUGUrw"
      endpoints={['https://jurajuhlar.com/SecExUMwEmvMmeoq/zJlUakSrf61FAWS1?region=eu']}
    >
      <ReactSdkSimpleDemo />
    </FingerprintProvider>
  );
}
