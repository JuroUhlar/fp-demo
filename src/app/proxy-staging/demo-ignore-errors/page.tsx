import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';

export default function ExamplePage() {
  const { apiKey, region, endpoint, scriptUrlPattern } =
    SUBS.stagingUSIgnoreProxyErrors.loadOptions;
  // const { serverApiKey } = SUBS.stagingEuIgnoreProxyErrors;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: '/proxy-staging/result?region=eu',
        scriptUrlPattern:
          '/proxy-staging/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Staging custom proxy integration',
      }}
      name={'Staging JavaScript Agent, Staging custom proxy integration'}
      // serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
