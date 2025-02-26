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
          'https://fingerprint-pro-azure-integration-appn4ka2ywrzcti6.azurewebsites.net/fpjs/result?region=eu',
        scriptUrlPattern:
          'https://fingerprint-pro-azure-integration-appn4ka2ywrzcti6.azurewebsites.net/fpjs/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      name={'JS Agent NPM package, Azure integration, without Frontdoor'}
      serverApiKey={SERVER_API_KEY}
    />
  );
}
