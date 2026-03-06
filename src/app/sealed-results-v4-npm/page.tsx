import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

const sealedResultsSub = SUBS.sealedResults;

export default function SealedResultsV4Page() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: sealedResultsSub.loadOptions.apiKey,
        region: sealedResultsSub.loadOptions.region,
      }}
      name={`${sealedResultsSub.name} (NPM)`}
      description={
        <p>
          Demo using <strong>NPM</strong> installation method: @fingerprint/agent package with
          sealed results subscription.
        </p>
      }
    />
  );
}
