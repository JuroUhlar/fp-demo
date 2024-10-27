import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { REGION_SDK, SERVER_API_KEY, SUBS } from '../../constants';

const integrationUrl = 'https://fastly-compute.jurajuhlar.site';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.openResponse.loadOptions.apiKey,
        region: SUBS.openResponse.loadOptions.region,
        endpoint: `${integrationUrl}/result`,
        scriptUrlPattern: `${integrationUrl}/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Fastly Compute Integration. Open Response'}
      serverApiKey={SUBS.openResponse.serverApiKey}
    />
  );
}
