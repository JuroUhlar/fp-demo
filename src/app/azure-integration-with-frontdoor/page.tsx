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
        endpoint:
          'https://fpjs-azure-uhlar-b5h4aebwe7d7gmaa.z03.azurefd.net//fpjs/result?region=eu',
        scriptUrlPattern:
          'https://fpjs-azure-uhlar-b5h4aebwe7d7gmaa.z03.azurefd.net//fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'JS Agent NPM package, Azure integration, *with* Frontdoor'}
      serverApiKey={SERVER_API_KEY}
      serverApiRegion={REGION_SDK}
    />
  );
}
