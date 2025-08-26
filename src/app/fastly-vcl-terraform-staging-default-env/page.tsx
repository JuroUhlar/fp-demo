import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { REGION_SDK, SERVER_API_KEY, SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';

const integrationUrl = 'http://fastly-vcl-default.environment.test.global.prod.fastly.net';

export default function ExamplePage() {
  const { environments } = SUBS.environmentsTestStaging;
  const { default: defaultEnvironment } = environments;
  const { publicApiKey, serverApiKey } = defaultEnvironment;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: publicApiKey,
        region: 'us',
        endpoint: `${integrationUrl}/fpjs/result?region=us`,
        scriptUrlPattern: `${integrationUrl}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Fastly VCL Terraform Staging Environments Test Default env integration'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
