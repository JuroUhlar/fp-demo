import { proxyBrowserCacheRequest } from '../../../proxy/proxyBrowserCacheRequest';
import { DEV_WARDEN_URL, STAGING_WARDEN_URL } from '../../const';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { randomPathSegments: string[] } },
) {
  return proxyBrowserCacheRequest(request, params, DEV_WARDEN_URL);
}
