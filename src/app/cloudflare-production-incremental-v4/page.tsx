import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

export default function CloudflareProductionIncrementalV4() {
  const sub = SUBS.main;
  const { apiKey, region } = sub.loadOptions;
  const { serverApiKey } = sub;
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey,
        region,
        endpoints: `https://jurajuhlar.com/SecExUMwEmvMmeoq?region=eu`,
        // @ts-expect-error
        optimizeRepeatedVisits: true,
      }}
      name={'Cloudflare Integration Production Agent V4 Incremental ID'}
      serverApiKey={serverApiKey}
    />
  );
}
