'use client';

import {
  FingerprintJSPro,
  FpjsProvider,
  useVisitorData,
} from '@fingerprintjs/fingerprintjs-pro-react';

function ReactSdkSimpleDemo() {
  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true, timeout: 100 },
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
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        endpoint: [
          'https://jurajuhlar.com/SecExUMwEmvMmeoq/zJlUakSrf61FAWS1?region=eu',
          FingerprintJSPro.defaultEndpoint,
        ],
        scriptUrlPattern: [
          'https://jurajuhlar.com/SecExUMwEmvMmeoq/MZyHobvHDyS0fYzi?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
        region: 'eu',
      }}
    >
      <ReactSdkSimpleDemo />
    </FpjsProvider>
  );
}
