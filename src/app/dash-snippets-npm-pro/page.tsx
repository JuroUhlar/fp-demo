'use client';

import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { useEffect } from 'react';

export default function ExamplePage() {
  useEffect(() => {
    // Initialize the agent on application start.
    const fpPromise = FingerprintJS.load({
      apiKey: '2UZgp3skqLzfJpFUGUrw',
      endpoint: ['https://fp.jurajuhlar.eu', FingerprintJS.defaultEndpoint],
      scriptUrlPattern: [
        'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
        FingerprintJS.defaultScriptUrlPattern,
      ],
      region: 'eu',
    });

    // Get the visitorId when you need it.
    fpPromise.then((fp) => fp.get()).then((result) => console.log(result.visitorId));
  }, []);

  return <></>;
}
