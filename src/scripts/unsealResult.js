// @ts-check

require('dotenv').config();

const {
  unsealEventsResponse,
  DecryptionAlgorithm,
} = require('@fingerprintjs/fingerprintjs-pro-server-api');

/**
 * Main function to unseal the encrypted result
 * @returns {Promise<void>}
 */
async function main() {
  /** @type {string | undefined} */
  const sealedData = process.env.BASE64_SEALED_RESULT;
  /** @type {string | undefined} */
  const decryptionKey = process.env.BASE64_KEY;

  if (!sealedData || !decryptionKey) {
    console.error(
      'Please set BASE64_KEY and BASE64_SEALED_RESULT environment variables',
    );
    process.exit(1);
  }

  try {
    /** @type {Array<{key: Buffer, algorithm: import('@fingerprintjs/fingerprintjs-pro-server-api').DecryptionAlgorithm}>} */
    const keys = [
      {
        key: Buffer.from(decryptionKey, 'base64'),
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
    ];

    const unsealedData = await unsealEventsResponse(
      Buffer.from(sealedData, 'base64'),
      keys,
    );

    console.log(JSON.stringify(unsealedData, null, 2));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
