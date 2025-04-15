import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';
import { DEV_WARDEN_URL } from '../const';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.stagingApDev.loadOptions.apiKey,
        region: 'us',
        endpoint: `/proxy-dev/result?proxySecret=${SUBS.stagingApDev.proxySecret}`,
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
