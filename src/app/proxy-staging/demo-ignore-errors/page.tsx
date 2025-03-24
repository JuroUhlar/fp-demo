import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';

export default function ExamplePage() {
  const { apiKey, endpoint, scriptUrlPattern } =
    SUBS.stagingUSIgnoreProxyErrors.loadOptions;
  // const { serverApiKey } = SUBS.stagingEuIgnoreProxyErrors;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        endpoint: '/proxy-staging/result',
        scriptUrlPattern:
          '/proxy-staging/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Staging US Ignore Proxy Errors',
      }}
      name={'Staging US Ignore Proxy Errors'}
      // serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
