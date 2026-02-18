import { proxyAgentDownloadRequest } from './proxyAgentDownloadRequest';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { path: string[] } }) {
  console.log('[...path] params:', params?.path);
  return proxyAgentDownloadRequest(request);
}
