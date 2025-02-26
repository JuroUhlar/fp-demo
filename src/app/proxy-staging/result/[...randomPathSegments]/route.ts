import { proxyBrowserCacheRequest } from '../../../proxy/result/[...randomPathSegments]/route';
import { STAGING_WARDEN_URL } from '../../const';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { randomPathSegments: string[] } },
) {
  return proxyBrowserCacheRequest(request, params, STAGING_WARDEN_URL);
}
