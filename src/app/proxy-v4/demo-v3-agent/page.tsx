'use client';

import { SUBS } from '../../../constants';
import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: '/proxy-v4/',
        scriptUrlPattern: '/proxy-v4/web/v3/<apiKey>/loader_v<loaderVersion>.js',
      }}
      getOptions={{
        linkedId: 'Main Production Proxy V4 custom proxy integration but with V3 agent',
      }}
      name={'Main Production Proxy V4 custom proxy integration but with V3 agent'}
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
