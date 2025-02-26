import { NextRequest } from 'next/server';
import { proxyIdentificationRequestHandler } from '../proxyIdentificationRequest';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return proxyIdentificationRequestHandler(request);
}
