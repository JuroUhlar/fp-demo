import { FingerprintProvider, Fingerprint } from '@fingerprint/react';
import { PropsWithChildren } from 'react';
import { PUBLIC_API_KEY } from '../../constants';

export function FingerprintReactProviderServer({ children }: PropsWithChildren) {
  // const endpoint = typeof window !== 'undefined' ? new URL('/custom-subdomain', window.location.origin).toString() : '';
  // console.log(endpoint);
  return (
    // Fail due to tempted to call withoutDefault() from the server but withoutDefault is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.
    // <FingerprintProvider apiKey={PUBLIC_API_KEY} endpoints={Fingerprint.withoutDefault('https://fp.jurajuhlar.eu')}>
    //   {children}
    // </FingerprintProvider>
    <></>
  );
}
