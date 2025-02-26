import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { STAGING_SERVER_API, SUBS } from '../../constants';

export default function ExamplePage() {
  const { apiKey, region, endpoint, scriptUrlPattern } =
    SUBS.stagingMain.loadOptions;
  const { serverApiKey } = SUBS.stagingMain;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey,
        region,
        endpoint,
        scriptUrlPattern,
      }}
      name={'Staging environment JavaScript Agent'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
