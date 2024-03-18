'use client';

import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: '2UZgp3skqLzfJpFUGUrw',
        region: 'eu',
        endpoint: 'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu',
        scriptUrlPattern:
          'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/buc1pMANm4wmx5j1?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'CloudFront V1'}
    />
  );
}
