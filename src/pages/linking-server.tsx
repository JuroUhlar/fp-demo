import { useEffect } from 'react';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { PUBLIC_API_KEY } from '../constants';

export default function LinkingDataUsingYourServer(): JSX.Element {
  useEffect(() => {
    const fpPromise = FingerprintJS.load({ apiKey: PUBLIC_API_KEY });

    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        const { visitorId, requestId } = result;
        console.log(requestId, visitorId);
        fetch(`/api/linking-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visitorId,
            requestId,
            accountId: '123456',
          }),
        });
      });
  }, []);

  return (
    <div>
      <h1>Linking visitorId to data server side</h1>
    </div>
  );
}
