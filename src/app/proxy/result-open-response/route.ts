import { NextRequest } from 'next/server';

import { isNativeError } from 'util/types';
import {
  parseCookies,
  parseHost,
  parseIp,
  randomShortString,
} from '../result/utils';

import { unsealDataCustom, unsealDataWithNodeSDK } from './unsealUtils';
export const dynamic = 'force-dynamic';

const REGION = 'us';

/**
 * Identification request handler
 */
export async function POST(request: NextRequest) {
  try {
    return await proxyIdentificationRequest(request);
  } catch (error) {
    console.error(error);
    return await getErrorResponse(request, error);
  }
}

const proxyIdentificationRequest = async (
  request: NextRequest,
): Promise<Response> => {
  // Call the right endpoint depending on the region parameter:
  // https://api.fpjs.io, https://eu.api.fpjs.io, or https://ap.api.fpjs.io
  const region: string = REGION;
  const prefix = region === 'us' ? '' : `${region}.`;
  const identificationUrl = new URL(`https://${prefix}api.fpjs.io`);

  // Forward all present query parameters and append the monitoring parameter
  identificationUrl.search = request.url.split('?')[1] ?? '';
  identificationUrl.searchParams.append(
    'ii',
    `custom-proxy-integration/1.0/ingress`,
  );

  // Copy all headers
  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    headers.set(key, value);
  }

  // Delete all cookies from the Cookie header but keep `_iidt` if present
  headers.delete('cookie');
  const cookieMap = parseCookies(request.headers.get('cookie'));
  const _iidtCookie = cookieMap['_iidt'];
  if (_iidtCookie) {
    headers.set('cookie', `_iidt=${_iidtCookie}`);
  }

  // Add the necessary Fingerprint headers
  const PROXY_SECRET = process.env.PROXY_SECRET_OPEN_RESPONSE;
  if (!PROXY_SECRET) {
    throw new Error('Missing PROXY_SECRET_OPEN_RESPONSE environment variable');
  }
  headers.set('FPJS-Proxy-Secret', PROXY_SECRET);
  headers.set('FPJS-Proxy-Client-IP', parseIp(request));
  headers.set('FPJS-Proxy-Forwarded-Host', parseHost(request));

  // Make the identification request
  const identificationResponse = await fetch(identificationUrl, {
    headers: headers,
    method: 'POST',
    body: await request.blob(),
  });

  const updatedHeaders = new Headers(identificationResponse.headers);
  // If your app needs to work using HTTP, remove the `strict-transport-security` header
  updatedHeaders.delete('strict-transport-security');
  // DEBUG: For debugging purposes, I am adding the unsealed payload to the response, artificially changing the content length
  // So I need to delete the content length header to avoid a malformed (cut off) response
  updatedHeaders.delete('content-length');

  // OPEN RESPONSE ADDITION: Get the response contents
  const identificationResponseText = await identificationResponse.text();
  const identificationResponseJson = JSON.parse(identificationResponseText);

  const decryptionKey = process.env.OPEN_RESPONSE_DECRYPT_KEY;
  if (!decryptionKey) {
    throw new Error('Missing OPEN_RESPONSE_DECRYPT_KEY environment variable');
  }

  const unsealedDataNodeSDK = await unsealDataWithNodeSDK(
    identificationResponseJson.sealedResult,
    decryptionKey,
  );
  const unsealedDataCustom = await unsealDataCustom(
    identificationResponseJson.sealedResult,
    decryptionKey,
  );
  console.log(JSON.stringify(unsealedDataCustom, null, 2));
  // END OF OPEN RESPONSE ADDITION

  // DEBUG: Add the unsealed payload to the response
  const debugResponse = {
    ...identificationResponseJson,
    unsealedResult: unsealedDataCustom,
  };
  const debugResponseText = JSON.stringify(debugResponse);

  // OPEN RESPONSE CHANGE: Return the TEXT of the response `identificationResponseText` to the client instead of `blob()`
  // like `return new Response(identificationResponseText...`
  // Here we return the debug response text instead just for debugging purposes
  return new Response(debugResponseText, {
    status: identificationResponse.status,
    statusText: identificationResponse.statusText,
    headers: updatedHeaders,
  });
};

const getErrorResponse = (request: Request, error: unknown): Response => {
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

