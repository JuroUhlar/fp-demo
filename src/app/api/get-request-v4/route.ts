import { SERVER_API_KEY } from '../../../constants';
import { NextRequest, NextResponse } from 'next/server';

export type GetEventPayloadV4 = {
  eventId: string;
  region: 'us' | 'eu' | 'ap';
  secretApiKey?: string;
  customServerApiUrl?: string;
};

/** Server API v4 event response – flat structure, snake_case (see migration guide). */
export type EventV4Response = Record<string, unknown>;

const getEventV4 = async ({
  eventId,
  region,
  secretApiKey,
  customServerApiUrl,
}: GetEventPayloadV4): Promise<EventV4Response> => {
  const regionPrefix = region === 'us' ? '' : `${region}.`;
  const baseUrl = customServerApiUrl ?? `https://${regionPrefix}api.fpjs.io`;
  const response = await fetch(`${baseUrl}/v4/events/${eventId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${secretApiKey ?? SERVER_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<EventV4Response>;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { eventId, secretApiKey, region, customServerApiUrl } =
    (await request.json()) as GetEventPayloadV4;

  try {
    const eventResponse = await getEventV4({
      eventId,
      secretApiKey: secretApiKey ?? SERVER_API_KEY,
      region,
      customServerApiUrl,
    });
    return NextResponse.json(eventResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500, statusText: String(error) },
    );
  }
}
