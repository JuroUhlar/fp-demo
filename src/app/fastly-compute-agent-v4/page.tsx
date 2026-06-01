import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

const integrationUrl = 'https://fastly-compute.jurajuhlar.eu';

export default function FastlyComputeAgentV4Page() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: SUBS.openResponse.loadOptions.apiKey,
        region: SUBS.openResponse.loadOptions.region,
        endpoints: `${integrationUrl}?region=us`,
      }}
      getOptions={{
        linkedId: 'Fastly Compute Agent V4',
      }}
      name={'Fastly Compute Integration. Agent V4. Open Response'}
      serverApiKey={SUBS.openResponse.serverApiKey}
      decryptionKey="kFNxOgVnDbJY4bjNn02tHnR/9ZOebWVMCEQV9Lmolb0="
    />
  );
}
