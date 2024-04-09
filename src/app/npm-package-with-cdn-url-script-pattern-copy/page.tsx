'use client';

import { useEffect } from 'react';

export default function ExamplePage() {
  useEffect(() => {
    const fpPromise = import('https://fp.jurajuhlar.eu/web/v3/2UZgp3skqLzfJpFUGUrw').then(
      (FingerprintJS) =>
        FingerprintJS.load({
          endpoint: ['https://fp.jurajuhlar.eu', FingerprintJS.defaultEndpoint],
          region: 'eu',
        }),
    );

    // Get the visitorId when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        const visitorId = result.visitorId;
        console.log(visitorId);
      });
  }, []);
  return <></>;
}
