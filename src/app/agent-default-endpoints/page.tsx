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
        apiKey: 'XSpWBBUesOp5R1n5x5Se',
        region: REGION,
      }}
      name={'JS Agent default endpoints'}
      serverApiKey={SERVER_API_KEY}
    />
  );
}
