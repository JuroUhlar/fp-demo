import { NextRequest } from 'next/server';
import { Readable } from 'stream';
import { URLSearchParams } from 'url';
import { isNativeError } from 'util/types';

export const dynamic = 'force-dynamic';
const PROXY_SECRET = process.env.PROXY_SECRET;

const parseCookies = (cookieHeader?: string | null) => {
  if (!cookieHeader) {
    return {};
  }
  const cookies = cookieHeader.split(';');
  const result: Record<string, string> = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    result[name.trim()] = value.trim();
  });
  return result;
};

const parseIp = (request: NextRequest) => {
  return (
    request.ip ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0] ??
    '127.0.0.1'
  );
};

const parseHost = (request: NextRequest) => {
  return request.headers.get('host') ?? new URL(request.url).hostname;
};

export async function POST(req: NextRequest) {
  try {
    // Call the right endpoint depending on the region parameter:
    // https://api.fpjs.io, https://eu.api.fpjs.io, or https://ap.api.fpjs.io
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const region = queryParams.get('region');
    const prefix = region === 'us' ? '' : `${region}.`;
    const identificationUrl = new URL(`https://${prefix}api.fpjs.io`);

    // Forward all present query parameters and append the monitoring parameter
    identificationUrl.search = req.url.split('?')[1] ?? '';
    identificationUrl.searchParams.append('ii', `custom-integration/1.0/ingress`);

    // Copy all headers
    const headers = new Headers();
    for (const [key, value] of req.headers.entries()) {
      headers.set(key, value);
    }

    // Delete all cookies from the Cookie header but keep `_iidt` if present
    const cookieMap = parseCookies(headers.get('cookie'));
    const _iidtCookie = cookieMap['_iidt'];
    headers.delete('cookie');
    if (_iidtCookie) {
      headers.set('cookie', `_iidt=${_iidtCookie}`);
    }

    // Add the necessary Fingerprint headers
    if (!PROXY_SECRET) {
      throw new Error('Missing PROXY_SECRET environment variable');
    }
    headers.set('FPJS-Proxy-Secret', PROXY_SECRET);
    headers.set('FPJS-Proxy-Client-IP', parseIp(req));
    headers.set('FPJS-Proxy-Forwarded-Host', parseHost(req));

    // Make the identification request
    const identificationResponse = await fetch(identificationUrl.toString(), {
      headers: headers,
      method: 'POST',
      body: await req.blob(),
    });

    // If your app needs to work using HTTP, remove the `strict-transport-security` header
    const updatedHeaders = new Headers(identificationResponse.headers);
    updatedHeaders.delete('strict-transport-security');

    // Return the response to the client
    return new Response(await identificationResponse.blob(), {
      status: identificationResponse.status,
      statusText: identificationResponse.statusText,
      headers: updatedHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(isNativeError(error) ? error.message : `Something went wrong, ${error} `, {
      status: 500,
    });
  }
}
