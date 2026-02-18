import { parseCookies, parseHost, parseIp, randomShortString } from '../proxy/utils';
import { isNativeError } from 'util/types';

type ProxyIdentificationRequestOptions = {
  proxySecret: string;
  customApiUrl?: string;
};

const proxyIdentificationRequest = async (
  request: Request,
  options: ProxyIdentificationRequestOptions,
): Promise<Response> => {
  const { proxySecret } = options;

  // Call the right endpoint depending on the region:
  const identificationUrl = new URL(`https://eu.api.fpjs.io`);

  // Forward all present query parameters and append the monitoring parameter
  identificationUrl.search = request.url.split('?')[1] ?? '';
  identificationUrl.searchParams.append('ii', `custom-proxy-integration/1.0/ingress`);

  // Forward all headers except the cookie header
  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    headers.set(key, value);
  }
  headers.delete('cookie');

  // Only keep the _iidt cookie
  const cookieMap = parseCookies(request.headers.get('cookie'));
  const _iidtCookie = cookieMap['_iidt'];
  if (_iidtCookie) {
    headers.set('cookie', `_iidt=${_iidtCookie}`);
  }

  // Add the necessary Fingerprint headers
  headers.set('FPJS-Proxy-Secret', proxySecret);
  headers.set('FPJS-Proxy-Client-IP', parseIp(request));
  headers.set('FPJS-Proxy-Forwarded-Host', parseHost(request));

  // Use query params to override the headers for testing purposes
  // const searchParams = new URL(request.url).searchParams;
  // const proxyClientIpParam = searchParams.get('proxyClientIp');
  // const proxySecretParam = searchParams.get('proxySecret');
  // const proxyForwardedHostParam = searchParams.get('proxyForwardedHost');
  if (headers.get('FPJS-Proxy-Client-IP') === '::1' || process.env.NODE_ENV === 'development') {
    headers.set('FPJS-Proxy-Client-IP', '54.90.6.179');
  }

  // Make the identification request
  const identificationResponse = await fetch(identificationUrl, {
    headers: headers,
    method: 'POST',
    body: await request.blob(),
  });

  // Remove the HSTS header to allow HTTP requests if necessary (e.g. for localhost debugging purposes)
  const updatedHeaders = new Headers(identificationResponse.headers);
  updatedHeaders.delete('strict-transport-security');

  // // Remove content-encoding headers to prevent double decoding (same fix as in proxyBrowserCacheRequest)
  // updatedHeaders.delete('content-encoding');
  // updatedHeaders.delete('content-length'); // Remove this too as the length may change after decoding

  // Return the response to the client
  return new Response(await identificationResponse.blob(), {
    status: identificationResponse.status,
    statusText: identificationResponse.statusText,
    headers: updatedHeaders,
  });
};

const getIdentificationRequestErrorResponse = (request: Request, error: unknown): Response => {
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
        'Access-Control-Allow-Origin': request.headers.get('origin') ?? new URL(request.url).origin,
        'Access-Control-Allow-Credentials': 'true',
      },
    },
  );
};

export const proxyIdentificationRequestHandler = async (
  request: Request,
  options: ProxyIdentificationRequestOptions,
): Promise<Response> => {
  try {
    return await proxyIdentificationRequest(request, options);
  } catch (error) {
    console.error('error', error);
    return await getIdentificationRequestErrorResponse(request, error);
  }
};
