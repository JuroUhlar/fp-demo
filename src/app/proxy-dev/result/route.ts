import { NextRequest } from 'next/server';
import { DEV_WARDEN_URL } from '../const';
import { proxyIdentificationRequestHandler } from '../../proxy/proxyIdentificationRequest';

export async function POST(request: NextRequest) {
  return proxyIdentificationRequestHandler(request, DEV_WARDEN_URL);
}
