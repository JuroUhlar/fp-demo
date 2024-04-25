'use client';

import FingerprintJS, {
  Agent,
  GetOptions,
  GetResult,
  LoadOptions,
} from '@fingerprintjs/fingerprintjs-pro';
import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServerApiResponseDemo } from './ServerApiResponseDemo';
import { JsonViewer } from './JsonViewer';

export type JsAgentDebugProps = {
  name: string;
  loadOptions: LoadOptions;
  getOptions?: GetOptions<boolean>;
  serverApiKey?: string;
  serverApiRegion?: Region;
  decryptionKey?: string;
};

export const NpmPackageIdentificationDemo = ({
  loadOptions,
  getOptions,
  name,
  serverApiKey,
  serverApiRegion,
}: JsAgentDebugProps) => {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fpAgent, setFpAgent] = useState<Agent | null>(null);

  const usedGetOptions = useMemo(
    () => ({ linkedId: name, extendedResult: true, ...getOptions }),
    [name, getOptions],
  );

  const reloadAgentAndGetVisitorData = useCallback(async () => {
    setLoading(true);
    try {
      const fpAgent = await FingerprintJS.load(loadOptions);
      setFpAgent(fpAgent);
      const result = await fpAgent.get(usedGetOptions);
      setFingerprintData(result);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  }, [loadOptions, usedGetOptions, setFpAgent]);

  useEffect(() => {
    reloadAgentAndGetVisitorData();
  }, [reloadAgentAndGetVisitorData]);

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
      <button onClick={reloadAgentAndGetVisitorData}>Reload agent and get visitor data</button>
      <button
        onClick={async () => {
          const result = await fpAgent?.get(usedGetOptions);
          if (result) {
            setFingerprintData(result);
          }
        }}
      >
        Get visitor data
      </button>
      <p>{loading ? 'Loading...' : ''}</p>
      <h2>JS Agent Response</h2>
      <JsonViewer data={fingerprintData} />
      {error && <pre>{error}</pre>}

      {serverApiKey && serverApiRegion && (
        <>
          <h2>Server API Event Response</h2>
          <ServerApiResponseDemo
            requestId={fingerprintData?.requestId}
            apiKey={serverApiKey}
            region={serverApiRegion}
          />
        </>
      )}
    </>
  );
};
