import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../constants';

export default function ServerSide({ message }: InferGetStaticPropsType<typeof getStaticProps>) {
  // This gets executed during static generation

  // (async () => {
  //   const fpPromise = FingerprintJS.load({
  //     apiKey: PUBLIC_API_KEY,
  //   });
  //   const fp = await fpPromise;
  //   const data = await fp.get({ extendedResult: true });
  //   // But this does not because its ina an async function
  //   // So doing it like this does not actually break your app
  //   console.log('Bbbbbbbbbbbbbbbbbbbbbbbbbbb');
  //   console.log(data.visitorId);
  // })();

  return (
    <>
      <p>{message}</p>
      <p> Your visitorId:</p>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was statically generated' } };
};
