import { ENV } from '../../../../env';
import {
  isNativeError,
  parseCookies,
  parseHost,
  parseIp,
  randomShortString,
} from '../helpers';

export const dynamic = 'force-dynamic';

const PROXY_PATH = '/proxy-v4-from-docs';
const PROXY_SECRET = ENV.CUSTOM_PROXY_SECRET;
const FPJS_API_ORIGIN = 'https://eu.api.fpjs.io';

export async function GET(request: Request): Promise<Response> {
  return handleProxyRequest(request);
}

export async function POST(request: Request): Promise<Response> {
  return handleProxyRequest(request);
}

async function handleProxyRequest(request: Request): Promise<Response> {
  try {
    const incomingUrl = new URL(request.url);
    if (!matchesProxyPrefix(incomingUrl.pathname)) {
      return new Response(null, { status: 404 });
    }

    const path = incomingUrl.pathname.slice(PROXY_PATH.length) || '/';
    const targetUrl = new URL(path, FPJS_API_ORIGIN);
    targetUrl.search = incomingUrl.search;

    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.set(key, value);
    }
    headers.delete('cookie');

    if (targetUrl.pathname.startsWith('/web')) {
      targetUrl.searchParams.append(
        'ii',
        'custom-proxy-integration/1.0/procdn',
      );
    }

    if (request.method === 'POST') {
      targetUrl.searchParams.append(
        'ii',
        'custom-proxy-integration/1.0/ingress',
      );

      const cookieMap = parseCookies(request.headers.get('cookie'));
      const _iidtCookie = cookieMap['_iidt'];
      if (_iidtCookie) {
        headers.set('cookie', `_iidt=${_iidtCookie}`);
      }

      headers.set('FPJS-Proxy-Secret', PROXY_SECRET);
      headers.set('FPJS-Proxy-Client-IP', parseIp(request));
      headers.set('FPJS-Proxy-Forwarded-Host', parseHost(request));
      // Local verification only: Fingerprint rejects private/loopback IPs.
      if (
        headers.get('FPJS-Proxy-Client-IP') === '::1' ||
        headers.get('FPJS-Proxy-Client-IP') === '127.0.0.1' ||
        headers.get('FPJS-Proxy-Client-IP') === '' ||
        process.env.NODE_ENV === 'development'
      ) {
        headers.set('FPJS-Proxy-Client-IP', '54.90.6.179');
      }
    }

    const originResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method === 'GET' || request.method === 'HEAD'
          ? undefined
          : await request.blob(),
    });

    const updatedHeaders = new Headers(originResponse.headers);

    updatedHeaders.delete('content-encoding');
    updatedHeaders.delete('transfer-encoding');
    updatedHeaders.delete('content-length');
    updatedHeaders.delete('strict-transport-security');

    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: updatedHeaders,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(request, error);
  }
}

function matchesProxyPrefix(pathname: string): boolean {
  return pathname === PROXY_PATH || pathname.startsWith(`${PROXY_PATH}/`);
}

function errorResponse(request: Request, error: unknown): Response {
  const message = isNativeError(error) ? error.message : String(error);

  if (request.method !== 'POST') {
    return new Response(message, {
      status: 500,
    });
  }

  const errorBody = {
    v: '2',
    error: {
      code: 'IntegrationFailed',
      message: `An identification error occurred with the custom integration. Reason: ${message}`,
    },
    requestId: `${Date.now()}.${randomShortString({ length: 6 })}`,
    products: {},
  } satisfies {
    v: '2';
    error: {
      code: 'IntegrationFailed';
      message: string;
    };
    requestId: string;
    products: Record<string, never>;
  };

  return Response.json(errorBody, {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':
        request.headers.get('origin') ?? new URL(request.url).origin,
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
