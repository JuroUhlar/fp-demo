import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'fingerprint-proxy-integration.juraj-uhlar.workers.dev';
const host = 'manual-cf.jurajuhlar.site';

export default function CloudflareManualSetup() {
  const sub = SUBS.main;
  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;

  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey,
        region,
        endpoints: `https://${host}/fpjs/result?region=eu`,
      }}
      name={'Cloudflare manual setup'}
      serverApiKey={serverApiKey}
      serverApiRegion={sub.serverApiRegion}
    />
  );
}
