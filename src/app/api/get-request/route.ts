import { EventsGetResponse } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { REGION, SERVER_API_KEY } from '../../../constants';
import { NextRequest, NextResponse } from 'next/server';

export type GetEventPayload = {
  requestId: string;
  region: 'us' | 'eu' | 'ap';
  secretApiKey?: string;
  customServerApiUrl?: string;
};

const getEvent = async ({
  requestId,
  region,
  secretApiKey,
  customServerApiUrl,
}: GetEventPayload) => {
  const regionPrefix = region === 'us' ? '' : `${region}.`;
  const baseUrl = customServerApiUrl ?? `https://${regionPrefix}api.fpjs.io`;
  console.log('baseUrl', baseUrl);
  console.log('secretApiKey', secretApiKey);
  const response = await fetch(`${baseUrl}/events/${requestId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Auth-API-Key': secretApiKey ?? SERVER_API_KEY,
    },
  });
  return response.json() as Promise<EventsGetResponse>;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { requestId, secretApiKey, region, customServerApiUrl } =
    (await request.json()) as GetEventPayload;

  try {
    const eventResponse = await getEvent({
      requestId,
      secretApiKey: secretApiKey ?? SERVER_API_KEY,
      region,
      customServerApiUrl,
    });
    return NextResponse.json(eventResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500, statusText: String(error) },
    );
  }
}
