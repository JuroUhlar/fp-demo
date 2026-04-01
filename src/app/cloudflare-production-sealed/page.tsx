import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';

export default function CloudflareIntegrationProductionSealed() {
  const sub = SUBS.sealedResults;
  const { apiKey, region } = sub.loadOptions;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: `https://jurajuhlar.com/PcCjlpjUH0i5OYie/7g5pz0JwTKypnx9X?region=eu`,
        scriptUrlPattern: `https://jurajuhlar.com/PcCjlpjUH0i5OYie/AP1b9z0PLLtLl16o?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare Integration Production Sealed Agent V3'}
    />
  );
}
