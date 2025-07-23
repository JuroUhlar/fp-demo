import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { region } = sub.loadOptions;
  const { serverApiKey } = sub;
  const { cloudfront } = sub.integrations;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: sub.differentEnvPublicApiKeys[1],
        region,
        endpoint: cloudfront.endpoint,
        scriptUrlPattern: cloudfront.scriptUrlPattern,
      }}
      name={'Cloudfront Terraform Staging'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
