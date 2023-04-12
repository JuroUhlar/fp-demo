import { SERVER_API_KEY } from './../../constants';
import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { NextApiRequest, NextApiResponse } from 'next';

const REGION = Region.EU;

export default async function getFlightsEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const { requestId } = req.body;
  try {
    const client = new FingerprintJsServerApiClient({
      region: Region.Global,
      apiKey: SERVER_API_KEY,
    });

    const eventResponse = await client.getEvent(requestId);
    res.status(200).json(eventResponse);
  } catch (error) {
    res.status(500).json({
      message: 'requestId not found',
    });
  }
}
