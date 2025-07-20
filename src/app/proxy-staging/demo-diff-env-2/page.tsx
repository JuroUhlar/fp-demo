import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS, STAGING_SERVER_API } from '../../../constants';

const spoofedIp = '54.90.6.179';

export default function ExamplePage() {
  const { region } = SUBS.stagingMain.loadOptions;
  const { serverApiKey, differentEnvPublicApiKeys } = SUBS.stagingMain;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: differentEnvPublicApiKeys[1],
        region,
        endpoint: `/proxy-staging/result?region=${region}${spoofedIp ? `&proxyClientIp=${spoofedIp}` : ''}`,
        scriptUrlPattern: '/proxy-staging/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Staging custom proxy integration',
      }}
      name={'Staging JavaScript Agent, Staging custom proxy integration, RC workspace env public api key'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
