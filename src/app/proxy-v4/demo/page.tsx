'use client';

import { NpmPackageIdentificationDemo } from '../../../components/JsAgentNpmDemo';
import { SUBS } from '../../../constants';

const spoofedIp = '54.90.6.179';

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemo
      loadOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        endpoint: `/proxy/result?region=eu${spoofedIp ? `&proxyClientIp=${spoofedIp}` : ''}`,
        scriptUrlPattern: '/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      }}
      getOptions={{
        linkedId: 'Main Production custom proxy integration',
      }}
      name={'Main Production custom proxy integration'}
      description={
        <div>
          You can use these query params to debug the proxy integration:
          <ul>
            <li>
              <code>proxySecret</code> - The secret key for the proxy
            </li>
            <li>
              <code>proxyClientIp</code> - The client IP address for the proxy
            </li>
            <li>
              <code>proxyForwardedHost</code> - The forwarded host for the proxy
            </li>
          </ul>
        </div>
      }
      serverApiKey={SUBS.main.serverApiKey}
      serverApiRegion={SUBS.main.serverApiRegion}
    />
  );
}
