import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { PUBLIC_API_KEY, REGION, SERVER_API_KEY, REGION_SDK } from '../../constants';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        region: REGION,
        endpoint: 'https://fastly.jurajuhlar.eu/result',
        scriptUrlPattern:
          'https://fastly.jurajuhlar.eu/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Fastly VCL Integration'}
      serverApiKey={SERVER_API_KEY}
      serverApiRegion={REGION_SDK}
    />
  );
}
