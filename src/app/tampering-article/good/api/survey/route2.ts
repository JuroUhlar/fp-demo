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
  const { requestId, data } = (await request.json()) as Payload;
  const identificationEvent = await (
    await fetch(`https://eu.api.fpjs.io/events/${requestId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-API-Key': SUBS.main.serverApiKey,
      },
    })
  ).json();

  /**
   * ✅ EXAMPLE OF GOOD PRACTICE
   * Validate the consistency of the Fingerprint identification result with the associated HTTP request
   * Check timestamps, IP, origin and other metadata to prevent replay attacks
   */
  const { okay, error } = validateFingerprintResult(
    identificationEvent,
    request,
  );
  if (!okay) {
    return Response.json({ error }, { status: 403 });
  }

  const visitorId =
    identificationEvent?.products?.identification?.data?.visitorId;
  if (await submissionsDatabase.has(visitorId)) {
    return Response.json({ message: 'Already submitted' }, { status: 403 });
  }

  submissionsDatabase.set(visitorId, data);
  return Response.json({ status: 'OK' });
}
