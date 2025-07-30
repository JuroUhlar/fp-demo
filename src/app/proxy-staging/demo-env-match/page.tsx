import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';

const spoofedIp = '54.90.6.179';

export default function ExamplePage() {
  const { region } = SUBS.stagingMain.loadOptions;
  const { serverApiKey, environments } = SUBS.stagingMain;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: environments.dev.publicApiKey,
        region,
        endpoint: `/proxy-staging/result?region=${region}&proxySecret=${environments.dev.proxySecret}${spoofedIp ? `&proxyClientIp=${spoofedIp}` : ''}`,
        scriptUrlPattern: '/proxy-staging/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Staging custom proxy integration',
      }}
      name={
        'Staging JavaScript Agent, Staging custom proxy integration, dev proxy secret, dev public api key'
      }
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
