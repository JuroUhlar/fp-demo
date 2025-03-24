import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
// todo change later
const integrationUrl = 'https://dcmm2kwlmx499.cloudfront.net';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.stagingMain.loadOptions.apiKey,
        endpoint: `${integrationUrl}/fpjs/result?region=us`,
        scriptUrlPattern: `${integrationUrl}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudfront V2 Staging'}
    />
  );
}
