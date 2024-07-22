import { SUBS } from '../../../../../constants';
import { MapFile } from '../../../../../utils/MapFile';
import { validateFingerprintResult } from '../../validate';

type Payload = {
  requestId: string;
  data: Record<string, any>;
};

// const submissions = new Map<string, Record<string, any>>();
const submissionsDatabase = new MapFile<string, Record<string, any>>(
  './data.json',
);

export async function POST(request: Request) {
  /**
   * ✅ EXAMPLE OF GOOD PRACTICE
   * Get only the `requestId` from the client and use it
   * to retrieve the full identification event from Server API
   */
  const { requestId, data } = (await request.json()) as Payload;
  const identificationEvent = await (
    await fetch(`https://eu.api.fpjs.io/events/${requestId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-API-Key': SUBS.main.serverApiKey,
      },
    })
  ).json();

  const visitorId =
    identificationEvent?.products?.identification?.data?.visitorId;
  if (!visitorId) {
    throw new Error('Could not retrieve visitor ID.');
  }

  if (await submissionsDatabase.has(visitorId)) {
    return Response.json(
      {
        message: 'You already submitted this survey',
      },
      { status: 403 },
    );
  }

  submissionsDatabase.set(visitorId, data);
  return Response.json({ status: 'OK' });
}

const { okay, error } = validateFingerprintResult(identificationEvent, request);
if (!okay) {
  return Response.json({ error }, { status: 403 });
}
