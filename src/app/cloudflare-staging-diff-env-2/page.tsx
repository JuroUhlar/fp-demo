import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';


export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { region } = sub.loadOptions;
  const { serverApiKey, differentEnvPublicApiKeys, integrations } = sub;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: differentEnvPublicApiKeys[1],
        region,
        endpoint: integrations.cloudflare.endpoint,
        scriptUrlPattern: integrations.cloudflare.scriptUrlPattern,
      }}
      name={'Cloudflare Integration Staging Global integration, different env public api key'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
