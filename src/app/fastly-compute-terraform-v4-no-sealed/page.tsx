import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

const integrationUrl = 'https://totally-legal-hog.edgecompute.app';

export default function FastlyComputeTerraformV4NoSealedPage() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoints: `${integrationUrl}?region=eu`,
      }}
      getOptions={{
        linkedId: 'Fastly Compute V4 No Sealed',
      }}
      name={'Fastly Compute V4 — No Sealed Results (SUBS.main)'}
      serverApiKey={SUBS.main.serverApiKey}
    />
  );
}
