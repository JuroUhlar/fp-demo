import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

// const host = 'd3cu7lsl52iiaf.cloudfront.net';
// const host = 'cloudfront-via-terraform.juraj.click';
// const host = 'd18gupksmr7h1t.cloudfront.net';
const host = 'metrics.staging.bvnk.com';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        endpoint: `https://${host}/x8vwd7gt3387kovmx4sf?region=eu`,
        region: SUBS.main.loadOptions.region,
        scriptUrlPattern: `https://${host}/6ger4isjyjgno3bjt3ky/?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudfront Terraform New Distribution'}
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
