import { proxyAgentDownloadRequest } from '../../proxy/agent/route';
import { STAGING_CDN_URL } from '../const';

export async function GET(request: Request) {
  return proxyAgentDownloadRequest(request, STAGING_CDN_URL);
}
