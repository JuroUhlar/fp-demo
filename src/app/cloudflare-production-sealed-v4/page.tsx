import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

export default function CloudflareIntegrationProductionSealedV4() {
  const sub = SUBS.sealedResults;
  const { apiKey, region } = sub.loadOptions;
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey,
        region,
        endpoints: `https://jurajuhlar.com/PcCjlpjUH0i5OYie/?region=eu`,
      }}
      name={'Cloudflare Integration Production Sealed Agent V4'}
    />
  );
}
