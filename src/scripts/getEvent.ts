const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

import {
  FingerprintJsServerApiClient,
  Region,
} from "@fingerprintjs/fingerprintjs-pro-server-api";

const SERVER_API_KEY = process.env.FP_API_KEY as string;

// Init client with the given region and the secret api_key
const client = new FingerprintJsServerApiClient({
  region: Region.EU,
  apiKey: SERVER_API_KEY,
});

// Get visitor history
client
  .getEvent("1673351180902.CUPqGn")
  .then((event) => console.log(event.products?.identification));
