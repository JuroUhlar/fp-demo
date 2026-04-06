import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey, integrations } = sub;
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey,
        region,
        endpoints: integrations.cloudflare.worker,
      }}
      name={'Cloudflare Integration Staging v4'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
