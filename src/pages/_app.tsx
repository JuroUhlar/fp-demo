import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  FpjsProvider,
  defaultEndpoint,
  defaultScriptUrlPattern,
} from '@fingerprintjs/fingerprintjs-pro-react';
import { CLOUDFRONT_SCRIPT_URL, CUSTOM_SUBDOMAIN, PUBLIC_API_KEY } from '../constants';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        endpoint: [CUSTOM_SUBDOMAIN, defaultEndpoint],
        scriptUrlPattern: [CLOUDFRONT_SCRIPT_URL, defaultScriptUrlPattern],
      }}
    >
      <Component {...pageProps} />
    </FpjsProvider>
  );
}
