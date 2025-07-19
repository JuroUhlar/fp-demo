import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

export default function CloudflareIntegrationProduction() {
  const sub = SUBS.main;
  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: `https://jurajuhlar.com/SecExUMwEmvMmeoq/zJlUakSrf61FAWS1?region=eu`,
        scriptUrlPattern: `https://jurajuhlar.com/SecExUMwEmvMmeoq/MZyHobvHDyS0fYzi?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare Integration Production'}
      serverApiKey={serverApiKey}
    />
  );
}
