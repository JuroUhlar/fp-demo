'use client';

import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const ReactIdentificationDemo = () => {
  const { data: visitorData, error, isLoading } = useVisitorData({ extendedResult: true });

  const { mutate: decryptSealedResults, data: unsealedIdResult  } = useMutation({
    mutationFn: async () => {
      return fetch('/react-sealed-results/decrypt', {
        method: 'POST',
        body: JSON.stringify({ sealedResult: visitorData?.sealedResult }),
      }).then((res) => res.json());
    },
  });

  useEffect(() => {
    // console.log('mutation', mutation);
    if (visitorData) {
      decryptSealedResults();
    }
  }, [visitorData, decryptSealedResults])

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return 'Error' + error;
  }

  return <>
  <h3>JS Agent sealed result</h3>
   {visitorData && <pre>{JSON.stringify(visitorData, null, 2)}</pre>}
   <h3>Decrypted Event Response</h3>
   {unsealedIdResult && <pre>{JSON.stringify(unsealedIdResult, null, 2)}</pre>}
  </>
};

export default function ExamplePage() {
  return (
    <FpjsProvider loadOptions={{ apiKey: 'XkSle8LOYBYgKZco5978' }}>
      <ReactIdentificationDemo />
    </FpjsProvider>
  );
}
