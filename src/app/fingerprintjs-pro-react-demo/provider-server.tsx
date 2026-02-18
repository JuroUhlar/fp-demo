import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { PropsWithChildren } from 'react';
import { PUBLIC_API_KEY } from '../../constants';

export function FpjsProReactProviderServer({ children }: PropsWithChildren) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        endpoint: '/custom-subdomain',
      }}
    >
      {children}
    </FpjsProvider>
  );
}
