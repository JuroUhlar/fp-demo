import { proxyAgentDownloadRequest } from '../../proxy/proxyAgentDownloadRequest';
import { STAGING_CDN_URL } from '../const';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return proxyAgentDownloadRequest(request, STAGING_CDN_URL);
}
