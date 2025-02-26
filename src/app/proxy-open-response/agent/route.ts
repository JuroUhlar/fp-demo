import { proxyAgentDownloadRequest } from '../../proxy/proxyAgentDownloadRequest';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return proxyAgentDownloadRequest(request);
}
