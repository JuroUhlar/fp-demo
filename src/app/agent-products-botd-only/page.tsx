import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import {
  CUSTOM_SUBDOMAIN,
  CUSTOM_SUBDOMAIN_SCRIPT_URL,
  PUBLIC_API_KEY,
  REGION,
  REGION_SDK,
  SERVER_API_KEY,
} from '../../constants';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: PUBLIC_API_KEY,
        region: REGION,
        endpoint: CUSTOM_SUBDOMAIN,
        scriptUrlPattern: CUSTOM_SUBDOMAIN_SCRIPT_URL,
      }}
      getOptions={{
        products: ['botd'],
      }}
      name={'JS Agent with products: ["botd"]'}
      serverApiKey={SERVER_API_KEY}
      serverApiRegion={REGION_SDK}
    />
  );
}
