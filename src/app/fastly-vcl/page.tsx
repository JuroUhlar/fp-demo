import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.identificationOnly.loadOptions.apiKey,
        endpoint: 'https://fastly.jurajuhlar.eu/behavior/result',
        scriptUrlPattern:
          'https://fastly.jurajuhlar.eu/behavior/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Fastly VCL Integration'}
      serverApiKey={SUBS.identificationOnly.serverApiKey}
    />
  );
}
