import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';
import { PUBLIC_API_KEY } from '../constants';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        region: 'eu',
        endpoint: 'https://fp.jurajuhlar.eu',
      }}
    >
      <Component {...pageProps} />
    </FpjsProvider>
  );
}
