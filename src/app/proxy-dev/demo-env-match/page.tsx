import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../constants';

export default function ExamplePage() {
  const { serverApiKey, environments } = SUBS.stagingApDev;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: environments.default.publicApiKey,
        region: 'us',
        endpoint: `/proxy-dev/result?proxySecret=${environments.default.proxySecret}&proxyClientIp=54.90.6.179`,
        scriptUrlPattern: '/proxy-dev/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Dev custom proxy integration',
      }}
      name={'Dev JavaScript Agent, Dev custom proxy integration, Public API key <> Proxy Secret matching environment ✅'}
      serverApiKey={serverApiKey}
    />
  );
}
