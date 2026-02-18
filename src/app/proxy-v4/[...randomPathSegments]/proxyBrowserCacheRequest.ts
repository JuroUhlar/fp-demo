import { isNativeError } from 'util/types';
import { REGION } from '../../../constants';

/**
 * Browser cache request handler
 */
export const proxyBrowserCacheRequest = async (
  request: Request,
  params: { randomPathSegments: string[] },
  customApiUrl?: string,
): Promise<Response> => {
  try {
    const randomPath = params.randomPathSegments.join('/');
    const browserCacheUrl = new URL(`https://eu.api.fpjs.io/${randomPath}`);

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

    return browserCacheResponse;

    // // Forward the response but remove content-encoding headers to prevent double decoding
    // const responseHeaders = new Headers(browserCacheResponse.headers);

    // return new Response(browserCacheResponse.body, {
    //   status: browserCacheResponse.status,
    //   statusText: browserCacheResponse.statusText,
    //   headers: responseHeaders,
    // });
  } catch (error) {
    console.error(error);
    return new Response(isNativeError(error) ? error.message : `Browser cache error: ${error} `, {
      status: 500,
    });
  }
};
