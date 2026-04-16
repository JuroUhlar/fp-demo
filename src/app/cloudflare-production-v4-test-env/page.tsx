import { NpmPackageIdentificationDemo } from '../../components/JsAgentNpmDemo';
import { NpmPackageIdentificationDemoV4 } from '../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../constants';

export default function CloudflareIntegrationProduction() {
  const sub = SUBS.main;
  const { region } = sub.loadOptions;
  const { serverApiKey } = sub;
  return (
    <>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <NpmPackageIdentificationDemoV4
            startOptions={{
              // "Test" env public API key
              apiKey: 'eQdnLxibK6dGFAe7Ah0T',
              region,
              endpoints: `https://jurajuhlar.com/xfBLL3AWyabcw9Jh?region=eu`,
            }}
            name={'Cloudflare Integration Production Agent V4'}
            serverApiKey={serverApiKey}
          />
        </div>
        <div style={{ flex: 1 }}>
          <NpmPackageIdentificationDemo
            loadOptions={{
              apiKey: 'eQdnLxibK6dGFAe7Ah0T',
              region,
              endpoint: `https://jurajuhlar.com/xfBLL3AWyabcw9Jh/VcCRZEERZCRhqJRE?region=eu`,
              scriptUrlPattern: `https://jurajuhlar.com/xfBLL3AWyabcw9Jh/DaVIawhJ5TV7jy2D?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>`,
            }}
            name={'Cloudflare Integration Production Agent V3'}
            serverApiKey={serverApiKey}
          />
        </div>
      </div>
    </>
  );
}
