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
