// 'use client';
// // import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
// import { useEffect, useState } from 'react';
// import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs-pro';

// export default function ClientPage() {
//   useEffect(() => {
//     // Initialize an agent at application startup.
//     const fpPromise = FingerprintJS.load({
//       apiKey: 'xvADip1wZkem5uyghtMj',
//       scriptUrlPattern: [
//         'https://fastly4.jurajuhlar.eu/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
//         FingerprintJS.defaultScriptUrlPattern, // Fallback to default CDN in case of error
//       ],
//       endpoint: [
//         'https://fastly4.jurajuhlar.eu/result',
//         FingerprintJS.defaultEndpoint, // Fallback to default endpoint in case of error
//       ],
//     });

//     // Analyze the visitor when necessary.
//     fpPromise
//       .then((fp) => fp.get({ extendedResult: true }))
//       .then((result) => {
//         console.log(result.requestId, result.visitorId);
//         setFingerprintData(result);
//       });
//   }, []);

//   const [fingerprintData, setFingerprintData] = useState<GetResult | null>(null);

//   return (
//     <>
//       <main className="m-10">
//         <h1>Fastly integration</h1>
//         <pre>{JSON.stringify(fingerprintData, null, 2)}</pre>
//       </main>
//     </>
//   );
// }

import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { REGION_SDK, SERVER_API_KEY, SUBS } from '../../constants';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.openResponse.loadOptions.apiKey,
        region: SUBS.openResponse.loadOptions.region,
        endpoint: 'https://fastly4.jurajuhlar.eu/result',
        scriptUrlPattern:
          'https://fastly4.jurajuhlar.eu/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Fastly Compute Integration. Open Response'}
      serverApiKey={SUBS.openResponse.serverApiKey}
    />
  );
}
