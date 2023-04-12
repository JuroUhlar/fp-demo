import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';

export default async function getFlightsEndpoint(req, res) {
  const { from, to, requestId } = req.body;

  // requestId in the wrong format can be rejected immediately
  if (!/^\d{13}\.[a-zA-Z0-9]{6}$/.test(requestId)) {
    res.status(403).json({
      message: 'malformed requestId, potential spoofing detected',
    });
  }

  let botDetection;
  try {
    // Initialise Server API client
    const client = new FingerprintJsServerApiClient({
      region: Region.EU,
      apiKey: '2ittvzwZZThxLA36pKGX',
    });

    // Get analysis event from the Server API using the request ID
    const eventResponse = await client.getEvent(requestId);
    botDetection = eventResponse.products?.botd?.data;
    console.log(botDetection);
  } catch (error) {
    // If getting the event fails, it's likely that the
    // requestId was spoofed, so don't return the results
    res.status(500).json({
      message: 'requestId not found, potential spoofing detected',
    });
  }

  if (!botDetection) {
    res.status(500).json({
      message: 'bot detection disabled',
    });
    return;
  }

  // continue processing botDetection result...
  if (botDetection.bot.result === 'bad') {
    res.status(403).json({
      message: 'Malicious bot detected, scraping flight data is not allowed.',
    });
    return;
  }

  // fingerprinting event must be max 3 seconds old
  if (Date.now() - Number(new Date(botDetection.time)) > 3000) {
    res.status(403).json({
      message: 'Old visit detected, potential replay attack.',
    });
    return;
  }

  const fpRequestOrigin = new URL(botDetection.url).origin;
  if (
    fpRequestOrigin !== req.headers['origin'] ||
    fpRequestOrigin !== 'http://localhost:3000' ||
    req.headers['origin'] !== 'http://localhost:3000'
  ) {
    res.status(403).json({
      message: 'Origin mismatch detected, potential spoofing attack.',
    });
    return;
  }

  if (botDetection.ip !== req.headers['x-forwarded-for']?.split(',')[0]) {
    res.status(403).json({
      message: 'IP mismatch detected, potential spoofing attack.',
    });
    return;
  }

  const flights = await getFlightResults(from, to);
  res.status(200).json({ flights });
}

function getFlightResults(from, to) {
  // ...
  return ['departure', 'arrival', 'price'];
}
