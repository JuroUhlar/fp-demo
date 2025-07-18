import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'fingerprint-proxy-integration.juraj-uhlar.workers.dev';
const host = 'manual-cf.jurajuhlar.site';

export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: `https://jurajuhlar.com/SM06tiFRZxMER8wp/isnS18MoIYKsQigO`,
        scriptUrlPattern: `https://jurajuhlar.com/SM06tiFRZxMER8wp/N3eRdnD9riVoQpMy?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare Integration Staging'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
