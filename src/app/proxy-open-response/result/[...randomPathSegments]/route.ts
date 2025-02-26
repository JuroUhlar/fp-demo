import { proxyBrowserCacheRequest } from '../../../proxy/proxyBrowserCacheRequest';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { randomPathSegments: string[] } },
) {
  return proxyBrowserCacheRequest(request, params);
}
