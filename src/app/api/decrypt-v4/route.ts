import {
  DecryptionAlgorithm,
  unsealEventsResponse,
} from '@fingerprint/node-sdk';

export type DecryptPayload = {
  sealedResult: string;
  decryptionKey?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DecryptPayload;
    const sealedData = payload.sealedResult;
    const decryptionKey = payload.decryptionKey ?? process.env.SEALED_RESULTS_DECRYPT_KEY;

    if (!sealedData || !decryptionKey) {
      return Response.json(
        { error: 'Missing sealedResult or SEALED_RESULTS_DECRYPT_KEY' },
        { status: 400 },
      );
    }

    const unsealedData = await unsealEventsResponse(
      Buffer.from(sealedData, 'base64'),
      [
        {
          key: Buffer.from(decryptionKey, 'base64'),
          algorithm: DecryptionAlgorithm.Aes256Gcm,
        },
      ],
    );

    return Response.json(unsealedData);
  } catch (e) {
    console.error(e);
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
