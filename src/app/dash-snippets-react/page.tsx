'use client';

import { FpjsProvider, FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-react';
import App from './App';

export default function Home() {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        endpoint: ['https://fp.jurajuhlar.eu', FingerprintJSPro.defaultEndpoint],
        scriptUrlPattern: [
          'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
          FingerprintJSPro.defaultScriptUrlPattern,
        ],
      }}
    >
      <App />
    </FpjsProvider>
  );
}
