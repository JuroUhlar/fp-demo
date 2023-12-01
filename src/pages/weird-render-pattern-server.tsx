import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { PUBLIC_API_KEY } from '../constants';

export default function ServerSide({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // This gets executed during static generation

  FingerprintJS.load({
    apiKey: PUBLIC_API_KEY,
  })
    .then((fp) => fp.get())
    .then((result) => {
      console.log(result.visitorId);
    });

  return (
    <>
      <p>{message}</p>
      <p> Your visitorId:</p>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  message: string;
}> = async () => {
  return { props: { message: 'This page was server-side generated' } };
};
