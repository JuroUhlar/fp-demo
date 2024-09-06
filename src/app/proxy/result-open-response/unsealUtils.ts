import {
  unsealEventsResponse,
  DecryptionAlgorithm,
} from '@fingerprintjs/fingerprintjs-pro-server-api';

export async function unsealDataWithNodeSDK(
  sealedResult: string,
  decryptionKey: string,
) {
  return await unsealEventsResponse(Buffer.from(sealedResult, 'base64'), [
    {
      key: Buffer.from(decryptionKey, 'base64'),
      algorithm: DecryptionAlgorithm.Aes256Gcm,
    },
  ]);
}

import { inflateRaw } from 'pako';
// This example uses "@noble/ciphers/aes" package which provides encryption API that works on environments in
// which Node.js "crypto" library is not available
import { gcm } from '@noble/ciphers/aes';

const SEALED_HEADER = new Uint8Array([0x9e, 0x85, 0xdc, 0xed]);

// Utility function that converts base64 string to Uint8Array
function base64StrToUint8Array(str: string) {
  const binary = atob(str);
  const data = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    data[i] = binary.charCodeAt(i);
  }

  return data;
}

// Function that decrypts sealed data using AES-256-GCM
function decrypt(sealedData: Uint8Array, encryptionKey: string) {
  // Get the decryption key generated in our dashboard
  const decryptionKey = base64StrToUint8Array(encryptionKey);

  const nonceLength = 12;
  const nonce = sealedData.slice(
    SEALED_HEADER.length,
    SEALED_HEADER.length + nonceLength,
  );
  const ciphertext = sealedData.slice(SEALED_HEADER.length + nonceLength);

  const aes = gcm(decryptionKey, nonce);
  const data = aes.decrypt(ciphertext);
  const decompressed = inflateRaw(data);

  return new TextDecoder().decode(decompressed);
}

export async function unsealDataCustom(
  rawSealedData: string,
  decryptionKey: string,
) {
  try {
    const sealedData = base64StrToUint8Array(rawSealedData);
    const result = decrypt(sealedData, decryptionKey);
    return JSON.parse(result);
  } catch (e) {
    console.error('failed to unseal data', e);
    return null;
  }
}
