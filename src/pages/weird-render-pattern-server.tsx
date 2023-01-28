import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function ServerSide({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // This gets executed during static generation
  console.log('Aaaaaaaaaaaaaaaaaaaaa');

  FingerprintJS.load({
    apiKey: '2UZgp3skqLzfJpFUGUrw',
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
