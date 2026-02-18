'use client';

import { NpmPackageIdentificationDemoV4 } from '../../../components/JsAgentNpmDemo_v4';
import { SUBS } from '../../../constants';
import * as Fingerprint from '@fingerprint/agent';

const spoofedIp = '54.90.6.179';

function getFingerprintEndpoint(endpoint?: string) {
  if (typeof window === 'undefined' || !endpoint) {
    return '';
  }

  // In Agent V4, the endpoint must be a valid URL
  return new URL(endpoint, location.origin).toString();
}

export default function ExamplePage() {
  return (
    <NpmPackageIdentificationDemoV4
      startOptions={{
        apiKey: SUBS.main.loadOptions.apiKey,
        region: SUBS.main.loadOptions.region,
        // endpoints: Fingerprint.withoutDefault(getFingerprintEndpoint('/proxy-v4')),
        // endpoints: getFingerprintEndpoint('/proxy-v4'),
        endpoints: typeof window !== 'undefined' ? new URL('/proxy-v4/', window.location.origin).toString() : undefined,
        // endpoints: '/proxy-v4/',
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
