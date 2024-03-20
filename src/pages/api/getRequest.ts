import { SERVER_API_KEY, REGION_SDK } from './../../constants';
import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getFlightsEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const { requestId, apiKey, region } = req.body;
  console.log(req.body);
  try {
    const client = new FingerprintJsServerApiClient({
      region: region ?? REGION_SDK,
      apiKey: apiKey ?? SERVER_API_KEY,
    });

    const eventResponse = await client.getEvent(requestId);
    res.status(200).json(eventResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'requestId not found',
    });
  }
}
