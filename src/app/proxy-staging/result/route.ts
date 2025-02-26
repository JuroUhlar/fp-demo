import { NextRequest } from 'next/server';
import { STAGING_WARDEN_URL } from '../const';
import { proxyIdentificationRequestHandler } from '../../proxy/proxyIdentificationRequest';

export async function POST(request: NextRequest) {
  return proxyIdentificationRequestHandler(request, STAGING_WARDEN_URL);
}
