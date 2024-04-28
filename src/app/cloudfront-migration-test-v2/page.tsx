import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        endpoint: 'https://d2u1clkalj34vq.cloudfront.net/fpjsv2/result?region=eu',
        scriptUrlPattern:
          'https://d2u1clkalj34vq.cloudfront.net/fpjsv2/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Cloudfront Migration test v1'}
    />
  );
}
