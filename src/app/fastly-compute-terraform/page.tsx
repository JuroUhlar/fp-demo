import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

const integrationUrl = 'https://fastly-compute-tf.jurajuhlar.com';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.openResponse.loadOptions.apiKey,
        region: SUBS.openResponse.loadOptions.region,
        endpoint: `${integrationUrl}/result`,
        scriptUrlPattern: `${integrationUrl}/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Fastly Compute Integration via Terraform'}
      serverApiKey={SUBS.openResponse.serverApiKey}
      decryptionKey="kFNxOgVnDbJY4bjNn02tHnR/9ZOebWVMCEQV9Lmolb0="
    />
  );
}
