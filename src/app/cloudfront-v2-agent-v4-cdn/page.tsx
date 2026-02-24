'use client';

import { CdnIdentificationDemoV4 } from '../../components/JsAgentCdnDemo_v4';
import { SUBS } from '../../constants';

const integrationUrl = 'https://d2fwmy7pay6lnr.cloudfront.net';

export default function CloudFrontV2AgentV4CdnPage() {
  return (
    <CdnIdentificationDemoV4
      cdnScriptUrl={`${integrationUrl}/fpjs/web/v4/${SUBS.main.loadOptions.apiKey}`}
      startOptions={{
        endpoints: `${integrationUrl}/fpjs?region=eu`,
        region: SUBS.main.loadOptions.region,
      }}
      getOptions={{
        linkedId: 'CloudFront V2 Agent V4 CDN',
      }}
      name={'CloudFront V2 Agent V4 CDN'}
      description={
        <p>
          This demo uses the <strong>CDN installation method</strong> to load the v4 agent.
        </p>
      }
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
