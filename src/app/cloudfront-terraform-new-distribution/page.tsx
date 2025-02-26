import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'cloudfront-via-terraform.juraj.click';
const host = 'd18gupksmr7h1t.cloudfront.net';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: `https://${host}/fpjs/result?region=eu`,
        scriptUrlPattern: `https://${host}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudfront Terraform New Distribution'}
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
