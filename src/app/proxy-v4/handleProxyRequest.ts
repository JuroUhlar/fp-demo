/**
 * Fingerprint v4 custom proxy. One handler for agent download, identification,
 * and browser-cache requests: rewrite the origin, keep the rest of the path.
 *
 * In v4 the Identification API host also serves the JS agent, so every request
 * is `https://{region}.api.fpjs.io` + the path after `/proxy-v4`.
 *
 * @see https://docs.fingerprint.com/docs/custom-proxy-integrations
 * @see https://github.com/fingerprintjs/cloudflare-worker-proxy/blob/main/src/handlers/handleApiRequest.ts
 */
import { parseCookies, parseHost, parseIp, randomShortString } from '../proxy/utils';
import { isNativeError } from 'util/types';

const PROXY_PATH = '/proxy-v4';

export async function handleProxyRequest(request: Request, proxySecret: string): Promise<Response> {
  try {
    const incomingUrl = new URL(request.url);
    const targetUrl = fingerprintApiUrl(incomingUrl);
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.set(key, value);
    }
    headers.delete('cookie');

    if (request.method === 'POST') {
      targetUrl.searchParams.append('ii', 'custom-proxy-integration/1.0/ingress');
      const iidt = parseCookies(request.headers.get('cookie'))['_iidt'];
      if (iidt) {
        headers.set('cookie', `_iidt=${iidt}`);
      }
      headers.set('FPJS-Proxy-Secret', proxySecret);
      headers.set('FPJS-Proxy-Client-IP', parseIp(request));
      headers.set('FPJS-Proxy-Forwarded-Host', parseHost(request));
      if (headers.get('FPJS-Proxy-Client-IP') === '::1' || process.env.NODE_ENV === 'development') {
        headers.set('FPJS-Proxy-Client-IP', '54.90.6.179');
      }
    } else if (targetUrl.pathname.startsWith('/web')) {
      targetUrl.searchParams.append('ii', 'custom-proxy-integration/1.0/procdn');
    }

    const originResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.blob(),
    });

    return toClientResponse(originResponse);
  } catch (error) {
    console.error(error);
    return errorResponse(request, error);
  }
}

function fingerprintApiUrl(incomingUrl: URL): URL {
  const path = incomingUrl.pathname.slice(PROXY_PATH.length) || '/';
  const targetUrl = new URL(path, `https://${apiHost(incomingUrl.searchParams.get('region'))}`);
  targetUrl.search = incomingUrl.search;
  return targetUrl;
}

function apiHost(region: string | null): string {
  switch (region) {
    case 'us':
      return 'api.fpjs.io';
    case 'ap':
      return 'ap.api.fpjs.io';
    default:
      // Demo workspace is eu; the agent often omits `?region=` on the proxy URL.
      return 'eu.api.fpjs.io';
  }
}

function toClientResponse(originResponse: Response): Response {
  const headers = new Headers(originResponse.headers);
  headers.delete('strict-transport-security');
  // Node fetch decompresses the body; drop encoding headers so the client does not decode twice.
  headers.delete('content-encoding');
  headers.delete('transfer-encoding');
  headers.delete('content-length');

  if (headers.get('content-type')?.includes('javascript')) {
    headers.set('cache-control', 'public, max-age=3600, s-maxage=60');
  }

  return new Response(originResponse.body, {
    status: originResponse.status,
    statusText: originResponse.statusText,
    headers,
  });
}

function errorResponse(request: Request, error: unknown): Response {
  const message = isNativeError(error) ? error.message : String(error);

  if (request.method !== 'POST') {
    return new Response(message, { status: 500 });
  }

  return Response.json(
    {
      v: '2',
      error: {
        code: 'IntegrationFailed',
        message: `An identification error occurred with the custom integration. Reason: ${message}`,
      },
      requestId: `${Date.now()}.${randomShortString({ length: 6 })}`,
      products: {},
    },
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': request.headers.get('origin') ?? new URL(request.url).origin,
        'Access-Control-Allow-Credentials': 'true',
      },
    },
  );
}
