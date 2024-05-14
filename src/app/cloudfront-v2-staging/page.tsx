import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '8PxIlryhGKPBmCb2DBnK',
        endpoint: 'https://d1de520979kahm.cloudfront.net/fpjs/result?region=us',
        scriptUrlPattern:
          'https://d1de520979kahm.cloudfront.net/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Cloudfront V2 Staging'}
    />
  );
}
