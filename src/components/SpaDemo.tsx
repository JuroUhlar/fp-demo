'use client';

import {
  GetOptions,
  GetResult,
  LoadOptions,
} from '@fingerprintjs/fingerprintjs-pro';
import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServerApiResponseDemo } from './ServerApiResponseDemo';
import { JsonViewer } from './JsonViewer';
import {
  CacheLocation,
  FpjsClient,
} from '@fingerprintjs/fingerprintjs-pro-spa';
import { UnsealedResultDemo } from './DecryptedResultDemo';
import { JsAgentDebugProps } from './JsAgentNpmDemo';

export const SpaDemo = ({
  loadOptions,
  getOptions,
  name,
  serverApiKey,
  decryptionKey,
}: JsAgentDebugProps) => {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const usedGetOptions = useMemo(
    () => ({ linkedId: name, extendedResult: true, ...getOptions }),
    [name, getOptions],
  );

  const getVisitorData = useCallback(async () => {
    setLoading(true);
    try {
      const fpjsClient = new FpjsClient({
        loadOptions,
        cacheLocation: CacheLocation.NoCache,
      });
      await fpjsClient.init();
      const visitorData = await fpjsClient.getVisitorData(usedGetOptions);
      setFingerprintData(visitorData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  }, [loadOptions, usedGetOptions]);

  useEffect(() => {
    getVisitorData();
  }, [getVisitorData]);

  return (
    <>
      <h1>{name}</h1>
      <h2>JS Agent load options</h2>
      <pre>{JSON.stringify(loadOptions, null, 2)}</pre>
      {usedGetOptions && (
        <>
          <h2>JS Agent get options</h2>
          <pre>{JSON.stringify(usedGetOptions, null, 2)}</pre>
        </>
      )}
      <button onClick={getVisitorData}>Get visitor data</button>
      <p>{loading ? 'Loading...' : ''}</p>
      <h2>JS Agent Response</h2>
      <JsonViewer data={fingerprintData} />
      {error && <pre>{error}</pre>}

      {serverApiKey && (
        <>
          <h2>Server API Event Response</h2>
          <ServerApiResponseDemo
            requestId={fingerprintData?.requestId ?? ''}
            secretApiKey={serverApiKey}
            region={loadOptions.region ?? 'us'}
          />
        </>
      )}

      {fingerprintData?.sealedResult && (
        <>
          <h2>Unsealed result</h2>
          <UnsealedResultDemo sealedResult={fingerprintData?.sealedResult} />
        </>
      )}
    </>
  );
};
