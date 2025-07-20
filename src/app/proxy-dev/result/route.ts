import { NextRequest } from 'next/server';
import { DEV_WARDEN_URL } from '../const';
import { proxyIdentificationRequestHandler } from '../../proxy/proxyIdentificationRequest';
import { ENV } from '../../../../env';

export async function POST(request: NextRequest) {
  return proxyIdentificationRequestHandler(request, {
    proxySecret: ENV.CUSTOM_PROXY_SECRET_DEV,
    customApiUrl: DEV_WARDEN_URL,
  });
}
