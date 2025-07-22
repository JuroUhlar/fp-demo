import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';


export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey, integrations } = sub;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: integrations.cloudflare.endpoint,
        scriptUrlPattern: integrations.cloudflare.scriptUrlPattern,
      }}
      name={'Cloudflare Integration Staging'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
