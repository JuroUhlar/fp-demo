'use client';

import {
  FingerprintJSPro,
  FpjsProvider,
  useVisitorData,
} from '@fingerprintjs/fingerprintjs-pro-react';
import { STAGING_CDN_URL, STAGING_WARDEN_URL } from '../proxy-dev/const';

function ReactSdkSimpleDemo() {
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true  },
    { immediate: true },
  );

  return (
    <div>
      <button onClick={() => getData({ ignoreCache: true, timeout: 10000 })}>
        Reload data
      </button>
      <p>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
      <p>Full visitor data:</p>
      <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function WithProvider() {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: 'nND4eJzLfDJjdxy5hNc9',
        endpoint: STAGING_WARDEN_URL,
        scriptUrlPattern: `${STAGING_CDN_URL}/v<version>/<apiKey>/loader_v<loaderVersion>.js`,
        region: 'us',
      }}
    >
      <ReactSdkSimpleDemo />
    </FpjsProvider>
  );
}
