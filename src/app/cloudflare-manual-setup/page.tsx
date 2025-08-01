import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'fingerprint-proxy-integration.juraj-uhlar.workers.dev';
const host = 'manual-cf.jurajuhlar.site';

export default function CloudflareManualSetup() {
  const sub = SUBS.main;
  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;

  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: `https://${host}/fpjs/result?region=eu`,
        scriptUrlPattern: `https://${host}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare manual setup'}
      serverApiKey={serverApiKey}
    />
  );
}
