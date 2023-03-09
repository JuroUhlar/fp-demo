import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { MyFpjsProvider } from '../components/FpjsProvider';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../constants';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <FpjsProvider
          loadOptions={{
            apiKey: PUBLIC_API_KEY,
            endpoint: CUSTOM_SUBDOMAIN,
          }}
        >
          {children}
        </FpjsProvider>
      </body>
    </html>
  );
}
