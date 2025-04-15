import { NextRequest } from 'next/server';
import { REGION, SUBS } from '../../constants';
import { parseCookies, parseHost, parseIp, randomShortString } from './utils';
import { isNativeError } from 'util/types';

const proxyIdentificationRequest = async (
  request: NextRequest,
  customApiUrl?: string,
): Promise<Response> => {
  // Call the right endpoint depending on the region parameter:
  // https://api.fpjs.io, https://eu.api.fpjs.io, or https://ap.api.fpjs.io
  const region = request.nextUrl.searchParams.get('region');
  const prefix = region == 'eu' || region == 'ap' ? `${region}.` : '';
  let identificationUrl = new URL(`https://${prefix}api.fpjs.io`);

  // Just in case we need to use a custom API URL
  if (customApiUrl) {
    identificationUrl = new URL(customApiUrl);
  }

  // Forward all present query parameters and append the monitoring parameter
  identificationUrl.search = request.url.split('?')[1] ?? '';
  identificationUrl.searchParams.append(
    'ii',
    `custom-proxy-integration/1.0/ingress`,
  );

  console.log('identificationUrl', identificationUrl);

  // Copy all headers
  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    headers.set(key, value);
    console.log('received header', key, value);
  }

  // Delete all cookies from the Cookie header but keep `_iidt` if present
  headers.delete('cookie');
  const cookieMap = parseCookies(request.headers.get('cookie'));
  const _iidtCookie = cookieMap['_iidt'];
  if (_iidtCookie) {
    headers.set('cookie', `_iidt=${_iidtCookie}`);
  }

  // Add the necessary Fingerprint headers
  const PROXY_SECRET = process.env.PROXY_SECRET;
  if (!PROXY_SECRET) {
    throw new Error('Missing PROXY_SECRET environment variable');
  }
  headers.set('FPJS-Proxy-Secret', PROXY_SECRET);
  headers.set('FPJS-Proxy-Client-IP', parseIp(request));
  headers.set('FPJS-Proxy-Forwarded-Host', parseHost(request));

  // Use query params to override the headers for testing purposes
  const searchParams = request.nextUrl.searchParams;
  const proxySecretParam = searchParams.get('proxySecret');
  const proxyClientIpParam = searchParams.get('proxyClientIp');
  const proxyForwardedHostParam = searchParams.get('proxyForwardedHost');

  if (proxySecretParam) {
    headers.set('FPJS-Proxy-Secret', proxySecretParam);
  }

  if (proxyClientIpParam) {
    headers.set('FPJS-Proxy-Client-IP', proxyClientIpParam);
  }

  if (proxyForwardedHostParam) {
    headers.set('FPJS-Proxy-Forwarded-Host', proxyForwardedHostParam);
  }


  // Make the identification request
  const identificationResponse = await fetch(identificationUrl, {
    headers: headers,
    method: 'POST',
    body: await request.blob(),
  });

  const updatedHeaders = new Headers(identificationResponse.headers);
  // If your app needs to work using HTTP, remove the `strict-transport-security` header
  // updatedHeaders.delete('strict-transport-security');

  // Return the response to the client
  return new Response(await identificationResponse.blob(), {
    status: identificationResponse.status,
    statusText: identificationResponse.statusText,
    headers: updatedHeaders,
  });
};

const getIdentificationRequestErrorResponse = (
  request: Request,
  error: unknown,
): Response => {
  const message = isNativeError(error) ? error.message : error;
  const requestId = `${new Date().getTime()}.${randomShortString({ length: 6 })}`;
  return Response.json(
    {
      v: '2',
      error: {
        code: 'IntegrationFailed',
        message: `An identification error occurred with the custom integration. Reason: ${message}`,
      },
      requestId,
      products: {},
    },
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':
          request.headers.get('origin') ?? new URL(request.url).origin,
        'Access-Control-Allow-Credentials': 'true',
      },
    },
  );
};

export const proxyIdentificationRequestHandler = async (
  request: NextRequest,
  customApiUrl?: string,
): Promise<Response> => {
  try {
    return await proxyIdentificationRequest(request, customApiUrl);
  } catch (error) {
    console.error('error', error);
    return await getIdentificationRequestErrorResponse(request, error);
  }
};
