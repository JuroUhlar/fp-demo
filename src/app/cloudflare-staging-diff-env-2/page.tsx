import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { SUBS } from '../../constants';
import { STAGING_WARDEN_URL } from '../proxy-dev/const';


export default function CloudflareIntegrationStaging() {
  const sub = SUBS.stagingMain;

  const { region } = sub.loadOptions;
  const { serverApiKey, differentEnvPublicApiKeys } = sub;
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: differentEnvPublicApiKeys[1],
        region,
        endpoint: `https://jurajuhlar.com/SM06tiFRZxMER8wp/isnS18MoIYKsQigO`,
        scriptUrlPattern: `https://jurajuhlar.com/SM06tiFRZxMER8wp/N3eRdnD9riVoQpMy?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
      }}
      name={'Cloudflare Integration Staging Global integration, different env public api key'}
      serverApiKey={serverApiKey}
      customServerApiUrl={STAGING_WARDEN_URL}
    />
  );
}
