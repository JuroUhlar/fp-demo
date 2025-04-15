'use client';
import { useEffect, useState } from 'react';
import FingerprintJS, {
  Agent,
  defaultScriptUrlPattern,
} from '@fingerprintjs/fingerprintjs-pro';

export default function ClientPage() {
  const loadFingerprint = async () => {
    try {
      const fpPromise = FingerprintJS.load({
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        region: 'eu',
        scriptUrlPattern: [
          'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js',
          // defaultScriptUrlPattern,
        ],
        endpoint: 'https://fp.jurajuhlar.eu/',
      });

      const fp = await fpPromise;

      // const result = await fp.get();

      // console.log(result);
      setFingerprintAgent(fp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFingerprint();
  }, []);

  const [fingerprintAgent, setFingerprintAgent] = useState<Agent | null>(null);

  return (
    <>
      <main className="m-10">
        <h1>Just load() fingerprint agent, no identification</h1>
        <pre>{fingerprintAgent?.get ? 'loaded' : 'not loaded'}</pre>
      </main>
    </>
  );
}
