'use client';

import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../constants';
import { DEV_WARDEN_URL } from '../../proxy-dev/const';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: '/proxy/result?region=eu',
        scriptUrlPattern:
          '/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Main Production custom proxy integration',
      }}
      name={'Main Production custom proxy integration'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
