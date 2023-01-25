import FingerprintJS, { GetResult } from "@fingerprintjs/fingerprintjs-pro";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from "../components/constants";

export default function ServerSide({
  message,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [fingerprintData, setFingerprintData] = useState<GetResult | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const fpPromise = FingerprintJS.load({
        apiKey: PUBLIC_API_KEY,
        endpoint: CUSTOM_SUBDOMAIN,
      });
      const fp = await fpPromise;
      const data = await fp.get({ extendedResult: true });
      setFingerprintData(data);
    })();
  }, []);

  console.log(fingerprintData);
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
          <div>Your visitorId: {fingerprintData?.visitorId}</div>
          <div></div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  message: string;
}> = async () => {
  return { props: { message: "This page was statically generated" } };
};
