import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../constants';

export default function ExamplePage() {
  const { serverApiKey, proxySecret, environments } = SUBS.stagingApDev;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: environments.anotherEnvironment.publicApiKey,
        region: 'us',
        endpoint: `/proxy-dev/result?proxySecret=${proxySecret}&proxyClientIp=54.90.6.179`,
        scriptUrlPattern: '/proxy-dev/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Dev custom proxy integration',
      }}
      name={'Dev JavaScript Agent, Dev custom proxy integration, global proxy secret, different env public api key ✅'}
      serverApiKey={serverApiKey}
    />
  );
}
