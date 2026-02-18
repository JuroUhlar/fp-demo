import { FingerprintProvider, Fingerprint } from '@fingerprint/react';
import { PropsWithChildren } from 'react';
import { PUBLIC_API_KEY } from '../../constants';

export function FingerprintReactProviderServer({ children }: PropsWithChildren) {
  // const endpoint = typeof window !== 'undefined' ? new URL('/custom-subdomain', window.location.origin).toString() : '';
  // console.log(endpoint);
  return (
    <FingerprintProvider apiKey={PUBLIC_API_KEY} endpoints={Fingerprint.withoutDefault('https://fp.jurajuhlar.eu')}>
      {children}
    </FingerprintProvider>
  );
}
