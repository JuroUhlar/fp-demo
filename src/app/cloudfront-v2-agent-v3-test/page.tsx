'use client';

import { Fingerprint } from '@fingerprint/react';
import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';
import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

const integrationUrl = 'https://d52resu41f7dd.cloudfront.net';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: `${integrationUrl}/fpjs/result?region=eu`,
        scriptUrlPattern: `${integrationUrl}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      getOptions={{
        linkedId: 'CloudFront V2 Agent V3',
      }}
      name={'CloudFront V2 Agent V3'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
