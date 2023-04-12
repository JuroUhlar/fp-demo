import { FingerprintJsServerApiClient, Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { SERVER_API_KEY } from '../constants';

// Init client with the given region and the secret api_key
const client = new FingerprintJsServerApiClient({
  region: Region.EU,
  apiKey: SERVER_API_KEY,
});

// Get visitor history
client
  .getEvent('1673351180902.CUPqGn')
  .then((event) => console.log(event.products?.identification));
