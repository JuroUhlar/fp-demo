import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

const usIntegrationUrl = 'https://fastly-compute.jurajuhlar.eu';
const euIntegrationUrl = 'https://totally-legal-hog.edgecompute.app';
const openResponseDecryptionKey = 'kFNxOgVnDbJY4bjNn02tHnR/9ZOebWVMCEQV9Lmolb0=';

export default function FastlyComputeLatestPage() {
  return (
    <>
      <h1>Fastly Compute Latest Manual Test</h1>

      <h2>US V4 - Open Response</h2>
      <NpmPackageIdentificationDemoV4
        startOptions={{
          apiKey: SUBS.openResponse.loadOptions.apiKey,
          region: SUBS.openResponse.loadOptions.region,
          endpoints: usIntegrationUrl,
        }}
        getOptions={{
          linkedId: 'Fastly Compute Latest US V4',
        }}
        name="Fastly Compute Latest US V4"
        serverApiKey={SUBS.openResponse.serverApiKey}
        decryptionKey={openResponseDecryptionKey}
      />

      <hr />

      <h2>US V3 - Open Response</h2>
      <NpmPackageIdentificationDemo
        loadOptions={{
          apiKey: SUBS.openResponse.loadOptions.apiKey,
          region: SUBS.openResponse.loadOptions.region,
          endpoint: `${usIntegrationUrl}/result`,
          scriptUrlPattern: `${usIntegrationUrl}/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
        }}
        getOptions={{
          linkedId: 'Fastly Compute Latest US V3',
        }}
        name="Fastly Compute Latest US V3"
        serverApiKey={SUBS.openResponse.serverApiKey}
        decryptionKey={openResponseDecryptionKey}
      />

      <hr />

      <h2>EU V4 - Main Subscription</h2>
      <NpmPackageIdentificationDemoV4
        startOptions={{
          apiKey: SUBS.main.loadOptions.apiKey,
          region: SUBS.main.loadOptions.region,
          endpoints: euIntegrationUrl,
        }}
        getOptions={{
          linkedId: 'Fastly Compute Latest EU V4',
        }}
        name="Fastly Compute Latest EU V4"
        serverApiKey={SUBS.main.serverApiKey}
      />

      <hr />

      <h2>EU V3 - Main Subscription</h2>
      <NpmPackageIdentificationDemo
        loadOptions={{
          apiKey: SUBS.main.loadOptions.apiKey,
          region: SUBS.main.loadOptions.region,
          endpoint: `${euIntegrationUrl}/result`,
          scriptUrlPattern: `${euIntegrationUrl}/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
        }}
        getOptions={{
          linkedId: 'Fastly Compute Latest EU V3',
        }}
        name="Fastly Compute Latest EU V3"
        serverApiKey={SUBS.main.serverApiKey}
      />
    </>
  );
}
