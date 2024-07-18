import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
const host = 'cloudfront-via-terraform.juraj.click';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        endpoint: `https://${host}/fpjs/result?region=eu`,
        scriptUrlPattern: `https://${host}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudfront Terraform New Distribution'}
      serverApiRegion={SUBS.main.serverApiRegion}
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
