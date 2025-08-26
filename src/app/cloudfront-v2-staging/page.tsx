import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;
  const { cloudfront } = sub.integrations;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: 'bJZc9CKuc4syDoGpTupm',
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
