import { NextRequest } from 'next/server';
import { proxyIdentificationRequestHandler } from './proxyIdentificationRequest';
import { ENV } from '../../../env';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  return proxyIdentificationRequestHandler(request, {
    proxySecret: ENV.CUSTOM_PROXY_SECRET,
  });
}
