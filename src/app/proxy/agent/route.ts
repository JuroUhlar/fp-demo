import { URLSearchParams } from 'url';
import { isNativeError } from 'util/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const apiKey = queryParams.get('apiKey');
    const version = queryParams.get('version');
    const loaderVersion = queryParams.get('loaderVersion');

    const loaderParam = loaderVersion ? `/loader_v${loaderVersion}.js` : '';
    const agentDownloadUrl = new URL(`https://fpcdn.io/v${version}/${apiKey}${loaderParam}`);

    // Forward all query parameters just in case and add the monitoring parameter
    agentDownloadUrl.search = request.url.split('?')[1];
    agentDownloadUrl.searchParams.append('ii', `custom-integration/1.0/procdn`);

    // Forward all headers except the cookie header
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.set(key, value);
    }
    headers.delete('cookie');

    // Request the JS agent from the CDN
    const agentResponse = await fetch(agentDownloadUrl, {
      headers,
    });

    const updatedHeaders = new Headers(agentResponse.headers);
    // If you cannot properly forward the cache-control header, add one manually with a low max-age values
    if (!agentResponse.headers.get('cache-control')?.includes('s-maxage')) {
      updatedHeaders.set('cache-control', 'public, max-age=3600, s-maxage=60');
    }
    // If your http library decompresses the response automatically (as `fetch` does here), you need to remove these headers
    // to tell the client the response is not compressed
    // Alternatively, depending on your http library, you might be able to disable the automatic decompression and keep the headers.
    updatedHeaders.delete('content-encoding');
    updatedHeaders.delete('transfer-encoding');

    // Create a new Response object with the updated headers
    return new Response(agentResponse.body, {
      status: agentResponse.status,
      statusText: agentResponse.statusText,
      headers: updatedHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      isNativeError(error)
        ? error.message
        : `Something went wrong with Fingerprint agent download: ${error} `,
      {
        status: 500,
      }
    );
  }
}
