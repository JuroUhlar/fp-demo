import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY, REGION } from '../constants';

export default function ServerSide({ message }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: PUBLIC_API_KEY,
        endpoint: CUSTOM_SUBDOMAIN,
        region: 'eu',
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  return (
    <>
      <p>{message}</p>
      <p> Your visitorId: {fingerprintData?.visitorId}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was statically generated' } };
};
