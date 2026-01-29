import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

export default function CloudflareIntegrationStaging() {
  const mainSub = SUBS.stagingMain;
  const sub = SUBS.environmentsTestStaging;

  const { serverApiKey, publicApiKey } = sub.environments.default;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: publicApiKey,
        region: 'us',
        endpoint: mainSub.integrations.cloudfront.endpoint,
        scriptUrlPattern: mainSub.integrations.cloudfront.scriptUrlPattern,
      }}
      name={'Cloudfront Terraform Staging'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
