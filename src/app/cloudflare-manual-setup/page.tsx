import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'fingerprint-proxy-integration.juraj-uhlar.workers.dev';
const host = 'manual-cf.jurajuhlar.site';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        endpoint: `https://${host}/fpjs/result?region=eu`,
        scriptUrlPattern: `https://${host}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare manual setup'}
      serverApiRegion={SUBS.main.serverApiRegion}
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
