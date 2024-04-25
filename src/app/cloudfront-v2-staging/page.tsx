import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '8PxIlryhGKPBmCb2DBnK',
        endpoint: 'https://d3j20ztznbj8fe.cloudfront.net/fpjs/result?region=us',
        scriptUrlPattern:
          'https://d3j20ztznbj8fe.cloudfront.net/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'Cloudfront V2 Staging'}
    />
  );
}
