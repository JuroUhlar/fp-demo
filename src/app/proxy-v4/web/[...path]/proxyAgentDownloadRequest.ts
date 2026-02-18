import { URLSearchParams } from 'url';
import { isNativeError } from 'util/types';

export async function proxyAgentDownloadRequest(request: Request): Promise<Response> {
  try {
    // Extract the path segment after "web"
    const regex = /\/web(\/.*)?/;
    const path = new URL(request.url).pathname.match(regex)?.[1];
    // Construct the agent download URL
    const agentDownloadUrl = new URL(`https://api.fpjs.io/web/${path}`);

    // Forward all query parameters and add the monitoring parameter
    agentDownloadUrl.search = request.url.split('?')[1];
    agentDownloadUrl.searchParams.append('ii', `custom-proxy-integration/1.0/procdn`);

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

    // If you cannot properly forward the cache-control header, add one manually with low max-age values
    const updatedHeaders = new Headers(agentResponse.headers);
    updatedHeaders.set('cache-control', 'public, max-age=3600, s-maxage=60');

    // If your http library decompresses the response automatically (as `fetch` does here), you need to remove these headers
    // to tell the client the response is not compressed
    updatedHeaders.delete('content-encoding');
    updatedHeaders.delete('transfer-encoding');

    // Return the response to the client
    return new Response(agentResponse.body, {
      status: agentResponse.status,
      statusText: agentResponse.statusText,
      headers: updatedHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(isNativeError(error) ? error.message : `Agent download error: ${error} `, {
      status: 500,
    });
  }
}
