'use client';

import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

const integrationUrl = 'https://d2fwmy7pay6lnr.cloudfront.net';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoints: `${integrationUrl}/fpjs?region=eu`,
      }}
      getOptions={{
        linkedId: 'CloudFront V2 Agent V4',
      }}
      name={'CloudFront V2 Agent V4'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
