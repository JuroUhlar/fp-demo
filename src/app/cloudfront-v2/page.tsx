import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

const integrationUrl = 'https://d2fwmy7pay6lnr.cloudfront.net';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        region: 'eu',
        endpoint: `${integrationUrl}/fpjs/result?region=eu`,
        scriptUrlPattern: `${integrationUrl}/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'CloudFront V2'}
    />
  );
}
