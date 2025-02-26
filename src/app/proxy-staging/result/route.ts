import { NextRequest } from 'next/server';
import {
  proxyIdentificationRequest,
  getIdentificationRequestErrorResponse,
} from '../../proxy/result/route';
import { STAGING_WARDEN_URL } from '../const';

export async function POST(request: NextRequest) {
  try {
    return await proxyIdentificationRequest(request, STAGING_WARDEN_URL);
  } catch (error) {
    console.error(error);
    return await getIdentificationRequestErrorResponse(request, error);
  }
}
