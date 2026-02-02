'use client';

import * as Fingerprint from '@fingerprint/agent';
import type { Agent, GetOptions, GetResult, StartOptions } from '@fingerprint/agent';
import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServerApiResponseDemo } from './ServerApiResponseDemo';
import { JsonViewer } from './JsonViewer';
import { TEST_IDS } from '../../tests/test_ids';

export type JsAgentV4DebugProps = {
  subId?: string;
  name: string;
  description?: React.ReactNode;
  differentEnvPublicApiKeys?: string[];
  startOptions: StartOptions;
  getOptions?: GetOptions;
  serverApiKey?: string;
  decryptionKey?: string;
  customServerApiUrl?: string;
  proxySecret?: string;
  serverApiRegion?: Region;
  environments?: Record<
    string,
    {
      publicApiKey?: string;
      proxySecret?: string;
      serverApiKey?: string;
    }
  >;
  integrations?: Record<
    string,
    {
      name: string;
      environment: string | null;
      endpoint: string;
    }
  >;
};

export const NpmPackageIdentificationDemoV4 = ({
  startOptions,
  getOptions,
  name,
  serverApiKey,
  customServerApiUrl,
  description,
}: JsAgentV4DebugProps) => {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fpAgent, setFpAgent] = useState<Agent | null>(null);

  const usedGetOptions = useMemo(() => ({ linkedId: name, ...getOptions }), [name, getOptions]);

  const reloadAgentAndGetVisitorData = useCallback(async () => {
    setLoading(true);
    try {
      const agent = Fingerprint.start(startOptions);
      setFpAgent(agent);
      const result = await agent.get(usedGetOptions);
      setFingerprintData(result);
      setError(null);
    } catch (err) {
      if (Fingerprint.isFingerprintError(err)) {
        setError(`${err.message} [code: ${err.code}]${err.event_id ? ` event_id: ${err.event_id}` : ''}`);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }, [startOptions, usedGetOptions]);

  useEffect(() => {
    reloadAgentAndGetVisitorData();
  }, [reloadAgentAndGetVisitorData]);

  return (
    <>
      <h1>{name}</h1>
      {description && <p>{description}</p>}
      <h2>JS Agent start options</h2>
      <pre>{JSON.stringify(startOptions, null, 2)}</pre>
      {Object.keys(usedGetOptions).length > 0 && (
        <>
          <h2>JS Agent get options</h2>
          <pre>{JSON.stringify(usedGetOptions, null, 2)}</pre>
        </>
      )}
      <button onClick={reloadAgentAndGetVisitorData}>Reload agent and get visitor data</button>
      <button
        onClick={async () => {
          try {
            const result = await fpAgent?.get(usedGetOptions);
            if (result) {
              setFingerprintData(result);
            }
          } catch (err) {
            console.error('!error', err);
          }
        }}
      >
        Get visitor data
      </button>
      <p>{loading ? 'Loading...' : ''}</p>
      <h2>JS Agent Response</h2>
      <JsonViewer data={fingerprintData} data_test_id={TEST_IDS.AGENT_RESPONSE} />
      {error && <pre>{error}</pre>}
      {serverApiKey && (
        <>
          <h2>Server API Event Response</h2>
          <ServerApiResponseDemo
            requestId={fingerprintData?.event_id ?? ''}
            secretApiKey={serverApiKey}
            region={startOptions.region ?? 'us'}
            customServerApiUrl={customServerApiUrl}
          />
        </>
      )}
    </>
  );
};
