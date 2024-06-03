export async function GET(request: Request) {
  // Return debugging response
  return Response.json({ message: 'Send webhooks as POST requests to this URL' });
}

const errors = {
  missingSecret: 'Internal Server Error: Missing WEBHOOK_SIGNATURE_SECRET environment variable',
  noSignatureHeader:
    'No signature header found, make sure Webhook signing is enabled for your Fingerprint workspace.',
  invalidSignature: 'Invalid signature, potential spoofing attack.',
};

export async function POST(request: Request) {
  try {
    const secret = process.env.WEBHOOK_SIGNATURE_SECRET;
    if (!secret) {
      console.error(errors.missingSecret);
      return Response.json({ error: errors.missingSecret }, { status: 500 });
    }

    const signatureHeader = request.headers.get('fpjs-event-signature');
    if (!signatureHeader) {
      console.error(errors.noSignatureHeader);
      return Response.json({ error: errors.noSignatureHeader }, { status: 401 });
    }

    const data = Buffer.from(await request.arrayBuffer());

    console.log({ signatureHeader, secret, data });

    if (!isValidWebhookSignature({ signatureHeader, data, secret })) {
      console.error(errors.invalidSignature);
      return Response.json({ message: errors.invalidSignature }, { status: 403 });
    }

    console.log('Webhook signature is valid');
    return Response.json({ message: 'Webhook received' });
  } catch (e) {
    console.error(e);
    return Response.json({ error: e }, { status: 500, statusText: String(e) });
  }
}

import crypto from 'crypto';

function isValidHmacSignature(signature: string, data: Buffer, secret: string) {
  return signature === crypto.createHmac('sha256', secret).update(data).digest('hex');
}

type SignatureValidationParams = {
  signatureHeader: string;
  data: Buffer;
  secret: string;
};

/**
 * Verifies the HMAC signature extracted from the "fpjs-event-signature" header of the incoming request. This is a part of the webhook signing process, which is available only for enterprise customers.
 * If you wish to enable it, please contact our support: https://fingerprint.com/support
 *
 * @param {Object} params
 * @param {string} params.signatureHeader - The value of the "fpjs-event-signature" header.
 * @param {Buffer} params.data - The raw data of the incoming request.
 * @param {string} params.secret - The secret key used to sign the request.
 *
 * @return {boolean} true if the signature is valid, false otherwise.
 */
export function isValidWebhookSignature({
  signatureHeader,
  data,
  secret,
}: SignatureValidationParams): boolean {
  const signatures = signatureHeader.split(',');
  for (const signature of signatures) {
    const [version, hash] = signature.split('=');
    if (version === 'v1') {
      if (isValidHmacSignature(hash, data, secret)) {
        return true;
      }
    }
  }
  return false;
}
