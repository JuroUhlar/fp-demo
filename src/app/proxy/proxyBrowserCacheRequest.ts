import { isNativeError } from 'util/types';
import { REGION } from '../../constants';

/**
 * Browser cache request handler
 */
export const proxyBrowserCacheRequest = async (
  request: Request,
  params: { randomPathSegments: string[] },
  customApiUrl?: string,
): Promise<Response> => {
  try {
    // Call the right endpoint depending on the region parameter, with the same random path segments
    // https://api.fpjs.io, https://eu.api.fpjs.io, or https://ap.api.fpjs.io
    const region: string = REGION;
    const prefix = region === 'us' ? '' : `${region}.`;
    const randomPath = params.randomPathSegments.join('/');

    let identificationUrl = new URL(`https://${prefix}api.fpjs.io`);
    // Just for me to allow testing with staging environment
    if (customApiUrl) {
      identificationUrl = new URL(customApiUrl);
    }

    const browserCacheUrl = new URL(`${identificationUrl}/${randomPath}`);

    // Forward all query parameters
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

    // Forward the response unchanged
    return browserCacheResponse;
  } catch (error) {
    console.error(error);
    return new Response(
      isNativeError(error) ? error.message : `Browser cache error: ${error} `,
      {
        status: 500,
      },
    );
  }
};
