import { CdnIdentificationDemoV4 } from '../../components/JsAgentCdnDemo_v4';
import { SUBS } from '../../constants';

const sealedResultsSub = SUBS.sealedResults;

export default function SealedResultsV4CdnPage() {
  return (
    <CdnIdentificationDemoV4
      cdnScriptUrl={`https://fpjscdn.net/v4/${sealedResultsSub.loadOptions.apiKey}`}
      startOptions={{
        region: sealedResultsSub.loadOptions.region,
      }}
      name={`${sealedResultsSub.name} (CDN)`}
      description={
        <p>
          Demo using <strong>CDN</strong> installation method to load the v4 agent with sealed
          results subscription.
        </p>
      }
    />
  );
}
