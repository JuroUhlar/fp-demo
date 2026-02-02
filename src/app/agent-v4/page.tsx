import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { CUSTOM_SUBDOMAIN, PUBLIC_API_KEY, REGION, SERVER_API_KEY } from '../../constants';

export default function AgentV4Page() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: PUBLIC_API_KEY,
        region: REGION,
        endpoints: CUSTOM_SUBDOMAIN,
      }}
      name="JS Agent v4 (NPM)"
      serverApiKey={SERVER_API_KEY}
    />
  );
}
