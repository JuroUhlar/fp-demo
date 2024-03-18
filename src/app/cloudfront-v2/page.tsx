import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        region: 'eu',
        endpoint: 'https://cloudfront2.juraj.click/fpjs/result?region=eu',
        scriptUrlPattern:
          'https://cloudfront2.juraj.click/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'CloudFront V2'}
    />
  );
}
