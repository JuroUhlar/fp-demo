import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: 'https://fastly4.jurajuhlar.eu/fpjs/result?region=eu',
        scriptUrlPattern:
          'https://fastly4.jurajuhlar.eu/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Fastly VCL Integration'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
