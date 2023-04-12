const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

import {
  FingerprintJsServerApiClient,
  Region,
} from "@fingerprintjs/fingerprintjs-pro-server-api";
import { SERVER_API_KEY } from '../constants';

// Init client with the given region and the secret api_key
const client = new FingerprintJsServerApiClient({
  region: Region.EU,
  apiKey: SERVER_API_KEY,
});

// Get visitor history
client
  .getVisitorHistory("cMBjS1eCyObMgQ4BiYEO", {
    request_id: "1673351180902.CUPqGn",
  })
  .then((visitorHistory) => {
    console.log(visitorHistory);
  });
