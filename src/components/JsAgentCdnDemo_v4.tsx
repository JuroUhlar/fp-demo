'use client';

import type { Agent, GetOptions, GetResult, StartOptions } from '@fingerprint/agent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServerApiResponseDemoV4 } from './ServerApiResponseDemoV4';
import { JsonViewer } from './JsonViewer';
import { TEST_IDS } from '../../tests/test_ids';

export type CdnStartOptions = Omit<StartOptions, 'apiKey'> & { apiKey?: string };

export type JsAgentV4CdnDemoProps = {
  name: string;
  description?: React.ReactNode;
  cdnScriptUrl: string;
  startOptions?: CdnStartOptions;
  getOptions?: GetOptions;
  serverApiKey?: string;
  customServerApiUrl?: string;
};

export const CdnIdentificationDemoV4 = ({
  cdnScriptUrl,
  startOptions = {},
  getOptions,
  name,
  serverApiKey,
  customServerApiUrl,
  description,
}: JsAgentV4CdnDemoProps) => {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fpAgent, setFpAgent] = useState<Agent | null>(null);

  const usedGetOptions = useMemo(() => ({ linkedId: name, ...getOptions }), [name, getOptions]);

  const reloadAgentAndGetVisitorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const Fingerprint = await import(/* webpackIgnore: true */ cdnScriptUrl);
      const agent = Fingerprint.start(startOptions);
      setFpAgent(agent);
      const result = await agent.get(usedGetOptions);
      setFingerprintData(result);
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err && 'code' in err) {
        const fpErr = err as { message: string; code: string; event_id?: string };
        setError(`${fpErr.message} [code: ${fpErr.code}]${fpErr.event_id ? ` event_id: ${fpErr.event_id}` : ''}`);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }, [cdnScriptUrl, startOptions, usedGetOptions]);

  useEffect(() => {
    reloadAgentAndGetVisitorData();
  }, [reloadAgentAndGetVisitorData]);

  return (
    <>
      <h1>{name}</h1>
      {description && <div>{description}</div>}
      <h2>CDN Script URL</h2>
      <pre>{cdnScriptUrl}</pre>
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
          <h2>Server API v4 Event Response</h2>
          <ServerApiResponseDemoV4
            eventId={fingerprintData?.event_id ?? ''}
            secretApiKey={serverApiKey}
            region={startOptions.region ?? 'us'}
            customServerApiUrl={customServerApiUrl}
          />
        </>
      )}
    </>
  );
};
