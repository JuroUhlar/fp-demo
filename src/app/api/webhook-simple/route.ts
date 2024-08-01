import { VisitWebhook } from '@fingerprintjs/fingerprintjs-pro-server-api';

const fingerprintEventsDatabase: Record<string, any> = { add: () => {} };


export async function POST(request: Request) {
  const identificationEvent = (await request.json()) as VisitWebhook;
  console.log(identificationEvent.visitorId);
  console.log(request.headers.get('Authorization'));
  fingerprintEventsDatabase.add(identificationEvent);
  return Response.json({ message: 'Webhook received', status: 200 });
}

export async function GET(request: Request) {
  // Return debugging response
  return Response.json({
    message: 'Send webhooks as POST requests to this URL',
  });
}
