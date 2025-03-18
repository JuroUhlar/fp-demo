import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';
import { DEV_WARDEN_URL } from '../const';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.stagingAppDevIgnoreProxyErrors.loadOptions.apiKey,
        region: SUBS.stagingAppDevIgnoreProxyErrors.loadOptions.region,
        endpoint: '/proxy-dev/result',
        scriptUrlPattern:
          '/proxy-dev/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Dev custom proxy integration',
      }}
      name={'Dev JavaScript Agent, Dev custom proxy integration'}
      // serverApiKey={serverApiKey}
      customServerApiUrl={DEV_WARDEN_URL}
    />
  );
}
