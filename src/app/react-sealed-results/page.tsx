'use client';

import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useUnsealedResult } from '../../hooks/useUnsealedResult';
import { JsonViewer } from '../../components/JsonViewer';

const ReactIdentificationDemo = () => {
  const {
    data: visitorData,
    error,
    isLoading,
  } = useVisitorData({ extendedResult: true, ignoreCache: true });
  const { data: unsealedResult } = useUnsealedResult(visitorData?.sealedResult);

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
    <FpjsProvider loadOptions={{ apiKey: 'XkSle8LOYBYgKZco5978' }}>
      <ReactIdentificationDemo />
    </FpjsProvider>
  );
}
