import { handleProxyRequest } from '../handleProxyRequest';
import { ENV } from '../../../../env';

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  return handleProxyRequest(request, ENV.CUSTOM_PROXY_SECRET);
}

export function POST(request: Request) {
  return handleProxyRequest(request, ENV.CUSTOM_PROXY_SECRET);
}
