import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { REGION_SDK, SERVER_API_KEY, SUBS } from '../../constants';

const integrationUrl = 'https://fastly-vcl.jurajuhlar.site';

export default function ExamplePage() {
  const { loadOptions, serverApiKey } = SUBS.main;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: loadOptions.apiKey,
        region: loadOptions.region,
        endpoint: `${integrationUrl}/fpjs/result?region=${loadOptions.region}`,
        scriptUrlPattern: `${integrationUrl}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Fastly Compute Integration via Terraform'}
      serverApiKey={serverApiKey}
    />
  );
}
