import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { STAGING_SERVER_API, SUBS } from '../../constants';

export default function ExamplePage() {
  const { apiKey, region, endpoint, scriptUrlPattern } =
    SUBS.stagingMain.loadOptions;
  const { serverApiKey } = SUBS.stagingMain;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        // apiKey: 'ZPyin0HmymWsc76J8fSy',
        apiKey: 's8vq6stc9wQPVX1hDVaf',
        endpoint: 'https://aps1-warden.dev.fpjs.sh/',
        scriptUrlPattern,
        region: 'ap',
      }}
      name={'Dev environment JavaScript Agent'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_SERVER_API}
    />
  );
}
