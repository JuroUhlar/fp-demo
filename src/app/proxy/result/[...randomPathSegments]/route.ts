import { isNativeError } from 'util/types';

export const dynamic = 'force-dynamic';

/**
 * Browser cache request handler
 */
export async function GET(
  request: Request,
  { params }: { params: { randomPathSegments: string[] } }
) {
  try {
    // Call the right endpoint depending on the region parameter:
    // https://api.fpjs.io, https://eu.api.fpjs.io, or https://ap.api.fpjs.io
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const region = queryParams.get('region');
    const prefix = region === 'us' ? '' : `${region}.`;
    const randomPath = params.randomPathSegments.join('/');
    const browserCacheUrl = new URL(`https://${prefix}api.fpjs.io/${randomPath}`);

    // Forward all query parameters just in case and add the monitoring parameter
    browserCacheUrl.search = request.url.split('?')[1];

    // Forward all headers except the cookie header
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.set(key, value);
    }
    headers.delete('cookie');

    // Make the browser cache request
    const browserCacheResponse = await fetch(browserCacheUrl, {
      headers,
    });

    return browserCacheResponse;
  } catch (error) {
    console.error(error);
    return new Response(isNativeError(error) ? error.message : `Browser cache error: ${error} `, {
      status: 500,
    });
  }
}
