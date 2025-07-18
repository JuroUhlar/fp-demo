import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import {
  CUSTOM_SUBDOMAIN,
  CUSTOM_SUBDOMAIN_SCRIPT_URL,
  SERVER_API_KEY,
  SUBS,
} from '../../constants';

export default function ExamplePage() {
  const { loadOptions, serverApiKey, serverApiRegion } = SUBS.prodApRegion;
  const { apiKey, region } = loadOptions;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint: CUSTOM_SUBDOMAIN,
        scriptUrlPattern: CUSTOM_SUBDOMAIN_SCRIPT_URL,
      }}
      name={'JS Agent default (no products param)'}
      serverApiKey={SERVER_API_KEY}
    />
  );
}
