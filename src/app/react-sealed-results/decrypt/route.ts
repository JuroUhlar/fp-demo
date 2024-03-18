import {
  DecryptionAlgorithm,
  EventResponse,
  unsealEventsResponse,
} from '@fingerprintjs/fingerprintjs-pro-server-api';

export type DecryptPayload = {
  sealedResult: string;
};

export type DecryptResponse = EventResponse;

export async function POST(request: Request) {
  const sealedData = ((await request?.json()) as DecryptPayload).sealedResult;
  
  const decryptionKey = process.env.SEALED_RESULTS_DECRYPT_KEY;
  
  if (!sealedData || !decryptionKey) {
    console.error('Please set BASE64_KEY and BASE64_SEALED_RESULT environment variables');
    process.exit(1);
  }
  
  try {
    const unsealedData = await unsealEventsResponse(Buffer.from(sealedData, 'base64'), [
      {
        key: Buffer.from(decryptionKey, 'base64'),
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
    ]);
    console.log(JSON.stringify(unsealedData, null, 2));
    return Response.json({ ...unsealedData })
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500, statusText: String(e) });
  }
}
