'use client';

import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { PropsWithChildren } from 'react';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../constants';

export function MyFpjsProvider({ children }: PropsWithChildren) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        endpoint: CUSTOM_SUBDOMAIN,
      }}
    >
      {children}
    </FpjsProvider>
  );
}



