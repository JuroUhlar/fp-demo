import { URLSearchParams } from 'url';
import { isNativeError } from 'util/types';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const apiKey = queryParams.get('apiKey');
    const version = queryParams.get('version');
    const loaderVersion = queryParams.get('loaderVersion');

    const loaderParam = loaderVersion ? `/loader_v${loaderVersion}.js` : '';
    const proCDNURL = new URL(`https://fpcdn.io/v${version}/${apiKey}${loaderParam}`);

    // Forward all query parameters just in case and add the monitoring parameter
    proCDNURL.search = req.url.split('?')[1];
    proCDNURL.searchParams.append('ii', `custom-integration/1.0/procdn`);

    // Forward all headers except the cookie header
    const headers = new Headers();
    for (const [key, value] of req.headers.entries()) {
      headers.set(key, value);
    }
    headers.delete('cookie');

    // Request the JS agent from the CDN
    const cdnResponse = await fetch(proCDNURL.toString(), {
      headers,
    });

    const updatedHeaders = new Headers(cdnResponse.headers);
    // If you cannot properly forward the cache-control header, add one manually with a low max-age values
    if (!cdnResponse.headers.get('cache-control')?.includes('s-maxage')) {
      updatedHeaders.set('cache-control', 'public, max-age=3600, s-maxage=60');
    }
    // If your http library decompresses the response automatically (as fetch does here), you need to remove these headers
    // to tell the client the response is not compressed
    // Alternatively, depending on your http library, you might be able to disable the automatic decompression and keep the headers
    updatedHeaders.delete('content-encoding');
    updatedHeaders.delete('transfer-encoding');

    // Create a new Response object with the updated headers
    return new Response(cdnResponse.body, {
      status: cdnResponse.status,
      statusText: cdnResponse.statusText,
      headers: updatedHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(isNativeError(error) ? error.message : `Something went wrong, ${error} `, {
      status: 500,
    });
  }
}
