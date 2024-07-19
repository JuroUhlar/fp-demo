import { MapFile } from '../../../../../utils/MapFile';

type Payload = {
  visitorId: string;
  data: Record<string, any>;
};

// const submissions = new Map<string, Record<string, any>>();
const submissionsDatabase = new MapFile<string, Record<string, any>>('./data.json');

export async function POST(request: Request) {
  /**
   * ❌ Example of insecure practice
   * The visitorId provided from the client could have been spoofed
   */
  const { visitorId, data } = (await request.json()) as Payload;
  if (await submissionsDatabase.has(visitorId)) {
    return Response.json(
      {
        message: 'This browser already participated in the survey',
      },
      { status: 403 },
    );
  }

  submissionsDatabase.set(visitorId, data);
  return Response.json({ status: 'OK' });
}
