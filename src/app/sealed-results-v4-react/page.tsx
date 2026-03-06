'use client';

import { FingerprintProvider, useVisitorData } from '@fingerprint/react';
import { useUnsealedResult } from '../../hooks/useUnsealedResult';
import { JsonViewer } from '../../components/JsonViewer';
import { SUBS } from '../../constants';

const sealedResultsSub = SUBS.sealedResults;

function SealedResultsReactDemo() {
  const {
    data: visitorData,
    error,
    isLoading,
    getData,
  } = useVisitorData({
    immediate: true,
    linkedId: 'sealed-results-v4-react',
  });
  const sealedResultBase64 = visitorData?.sealed_result?.base64();
  const { data: unsealedResult, isLoading: unsealing, error: unsealError } = useUnsealedResult(sealedResultBase64);

  if (isLoading) return <p>Loading visitor data...</p>;
  if (error) return <pre>Error: {error.message}</pre>;

  return (
    <>
      <h2>@fingerprint/react Sealed Results</h2>
      <button onClick={() => getData()}>Get Visitor Data</button>
      {visitorData && (
        <>
          <p>Visitor ID: {visitorData.visitor_id}</p>
          <JsonViewer data={visitorData} />
        </>
      )}
      {sealedResultBase64 && (
        <>
          <h2>Decrypted Event Response</h2>
          {unsealing && <p>Unsealing result...</p>}
          {unsealError && <p>Error: {unsealError.message}</p>}
          {unsealedResult && <JsonViewer data={unsealedResult} />}
        </>
      )}
    </>
  );
}

export default function SealedResultsReactPage() {
  return (
    <>
      <h1>Sealed Results ({sealedResultsSub.name})</h1>
      <p>
        @fingerprint/react SDK with sealed results subscription. Visitor data is encrypted and decrypted server-side.
      </p>
      <FingerprintProvider apiKey={sealedResultsSub.loadOptions.apiKey} region={sealedResultsSub.loadOptions.region}>
        <SealedResultsReactDemo />
      </FingerprintProvider>
    </>
  );
}
