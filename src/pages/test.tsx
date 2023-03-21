import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { FunctionComponent, useEffect } from 'react';

const Test: FunctionComponent = () => {
  useEffect(() => {
    // Initialize the agent on application start.
    const fpPromise = FingerprintJS.load({
      apiKey: '2UZgp3skqLzfJpFUGUrw',
      region: 'eu',
    });

    // Get the visitorId when you need it.
    fpPromise.then((fp) => fp.get()).then((result) => console.log(result.visitorId));
  }, []);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test;
