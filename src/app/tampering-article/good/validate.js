// @ts-check

export const IPv4_REGEX =
  /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9]|)\d)$/;
export const ALLOWED_REQUEST_TIMESTAMP_DIFF_MS = 4000;

const env = process.env;

/**
 * Validates the consistency of the Fingerprint identification result with the associated HTTP request
 *
 * @param {import("@fingerprintjs/fingerprintjs-pro-server-api").EventsGetResponse} identificationEvent - The event retrieved from Server API or Sealed result
 * @param {Request} request - The HTTP request (for example, the survey submission request)
 * @returns {{ okay: boolean, error?: string} } - An object indicating the validation result.
 */
export function validateFingerprintResult(identificationEvent, request) {
  const identification = identificationEvent.products?.identification?.data;

  // The expected data might be missing completely.
  if (!identification) {
    return {
      okay: false,
      error: 'Identification event not found, potential spoofing attack.',
    };
  }

  // Check freshness of the identification request to prevent replay attacks.
  const ALLOWED_REQUEST_TIMESTAMP_DIFF_MS = 3000;
  if (
    Date.now() - Number(new Date(identification.time)) >
    ALLOWED_REQUEST_TIMESTAMP_DIFF_MS
  ) {
    return {
      okay: false,
      error: 'Old identification request, potential replay attack.',
    };
  }

  const identificationOrigin = new URL(identification.url).origin;
  const requestOrigin = request.headers.get('origin');
  if (
    identificationOrigin !== requestOrigin ||
    identificationOrigin !== 'https://yourwebsite.com' ||
    requestOrigin !== 'https://yourwebsite.com'
  ) {
    return {
      okay: false,
      error: 'Unexpected origin, potential replay attack.',
    };
  }

  /**
   * Note: Parsing the user IP from `x-forwarded-for` can be unreliable as
   * any proxy between your server and the visitor can overwrite or spoof the header.
   * In most cases, using the right-most external IP is more appropriate
   * than the left-most one as is demonstrated here. You might need to adjust or skip
   * this check depending on your use case and server configuration.
   * You can learn more at:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
   * https://adam-p.ca/blog/2022/03/x-forwarded-for/.
   *
   * @param {Request} request
   * @returns {string}
   */
  const parseIp = (request) => {
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const requestIp = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor?.split(',')[0] ?? '';
    return requestIp;
  };

  const identificationIp = identification.ip;
  const requestIp = parseIp(request);

  // This check currently works only for IPv4 addresses.
  if (IPv4_REGEX.test(requestIp) && identificationIp !== requestIp) {
    return {
      okay: false,
      error: 'Unexpected IP address, potential replay attack.',
    };
  }

  if (
    Number(identification?.confidence?.score) < Number(env.MIN_CONFIDENCE_SCORE)
  ) {
    return {
      okay: false,
      error:
        'Identification confidence score too low, potential spoofing attack.',
    };
  }

  if (identificationEvent.products?.botd?.data?.bot?.result === 'bad') {
    return { okay: false, error: 'Malicious bot detected.' };
  }

  if (identificationEvent.products?.vpn?.data?.result === true) {
    return { okay: false, error: 'VPN network detected.' };
  }

  if (identificationEvent.products?.tor?.data?.result === true) {
    return { okay: false, error: 'Tor network detected.' };
  }

  if (identificationEvent.products?.tampering?.data?.result === true) {
    return { okay: false, error: 'Browser tampering detected.' };
  }

  return { okay: true };
}
