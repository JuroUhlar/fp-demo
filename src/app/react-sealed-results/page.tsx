'use client';

import { FingerprintProvider, useVisitorData } from '@fingerprint/react';
import { useUnsealedResult } from '../../hooks/useUnsealedResult';
import { JsonViewer } from '../../components/JsonViewer';

const ReactIdentificationDemo = () => {
  const {
    data: visitorData,
    error,
    isLoading,
  } = useVisitorData({ immediate: true });
  const sealedResultString =
    visitorData?.sealed_result && typeof visitorData.sealed_result === 'string'
      ? visitorData.sealed_result
      : visitorData?.sealed_result
        ? String(visitorData.sealed_result)
        : undefined;
  const { data: unsealedResult } = useUnsealedResult(sealedResultString);

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error' + error;
  }

  return (
    <>
      <h3>React sealed result</h3>
      {visitorData && <pre>{JSON.stringify(visitorData, null, 2)}</pre>}
      <h3>Decrypted Event Response</h3>
      {unsealedResult && <JsonViewer data={unsealedResult} />}
    </>
  );
};

export default function ExamplePage() {
  return (
    <FingerprintProvider apiKey="XkSle8LOYBYgKZco5978">
      <ReactIdentificationDemo />
    </FingerprintProvider>
  );
}
