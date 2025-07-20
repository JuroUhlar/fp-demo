import { NextRequest } from 'next/server';
import { STAGING_WARDEN_URL } from '../const';
import { proxyIdentificationRequestHandler } from '../../proxy/proxyIdentificationRequest';
import { ENV } from '../../../../env';

export async function POST(request: NextRequest) {
  return proxyIdentificationRequestHandler(request, {
    proxySecret: ENV.CUSTOM_PROXY_SECRET_STAGING,
    customApiUrl: STAGING_WARDEN_URL,
  });
}
