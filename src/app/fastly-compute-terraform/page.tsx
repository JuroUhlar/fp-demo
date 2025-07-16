import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { REGION_SDK, SERVER_API_KEY, SUBS } from '../../constants';

const integrationUrl = 'https://fastly-compute.jurajuhlar.eu';

export default function ExamplePage() {
  const { loadOptions, serverApiKey } = SUBS.identificationOnly;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: loadOptions.apiKey,
        region: loadOptions.region,
        endpoint: `${integrationUrl}/result`,
        scriptUrlPattern: `${integrationUrl}/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Fastly Compute Integration via Terraform'}
      serverApiKey={serverApiKey}
    />
  );
}
