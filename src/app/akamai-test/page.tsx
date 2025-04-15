import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

export default function ExamplePage() {
  const { apiKey, region } = SUBS.main.loadOptions;
  const { serverApiKey } = SUBS.main;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        endpoint:
          'https://feat-update-proxy-secret-field-as-sensitive-inter-1035.cfi-fingerprint.com/proxy/result?region=eu',
        scriptUrlPattern:
          'https://feat-update-proxy-secret-field-as-sensitive-inter-1035.cfi-fingerprint.com/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
        region,
      }}
      name={'Akamai Patch Body Test'}
      serverApiKey={serverApiKey}
    />
  );
}
