import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

export default function ServerSide({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isLoading, data, getData } = useVisitorData({
    extendedResult: true,
    // ignoreCache: true,
    linkedId: 'Next.js',
    tag: { integration: 'Next.js' },
    products: ['botd', 'identification'],
  });

  console.log(data);
  return (
    <>
      <Head>
        <title>Fingerprint Demo</title>
        <meta name="description" content="Demo for FingerprintJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-10">
        <div>
          <h1>{message}</h1>
          <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
          <div>Your visitorId: {data?.visitorId}</div>
          <div></div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was rendered server side' } };
};
