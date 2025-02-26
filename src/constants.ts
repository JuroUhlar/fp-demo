import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';
import { JsAgentDebugProps } from './components/JsAgentNpmDemo';

export const PUBLIC_API_KEY =
  process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? '2UZgp3skqLzfJpFUGUrw';
export const SERVER_API_KEY =
  process.env.SERVER_API_KEY ?? 'lzXEt8ZurQNOZ9XGCeA9';
export const CUSTOM_SUBDOMAIN = 'https://fp.jurajuhlar.eu';
export const CUSTOM_SUBDOMAIN_SCRIPT_URL =
  'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js';
export const REGION = 'eu';
export const REGION_SDK = Region.EU;

// Staging env
export const STAGING_SERVER_API = 'https://api.stage.fpjs.sh';

export const SUBS = {
  main: {
    name: 'Main jurajuhlar.eu subscription',
    loadOptions: {
      apiKey: PUBLIC_API_KEY,
      scriptUrlPattern: CUSTOM_SUBDOMAIN_SCRIPT_URL,
      endpoint: CUSTOM_SUBDOMAIN,
      region: REGION,
    },
    serverApiKey: SERVER_API_KEY,
  },
  identificationOnly: {
    name: 'Identification only subscription',
    loadOptions: {
      apiKey: 'eajUlf6axysf2z89ZVWx',
    },
    serverApiKey: process.env.NEXT_PUBLIC_IDENTIFICATION_ONLY_SERVER_API_KEY,
  },
  zeroTrustMode: {
    name: 'Zero Trust Mode subscription',
    loadOptions: {
      apiKey: 'v36mGCIF3h552liQAU4F',
    },
    serverApiKey: process.env.NEXT_PUBLIC_ZERO_TRUST_MODE_SERVER_API_KEY,
  },
  sealedResults: {
    name: 'Sealed results subscription',
    loadOptions: {
      apiKey: 'XkSle8LOYBYgKZco5978',
    },
    decryptionKey: process.env.SEALED_RESULTS_DECRYPT_KEY,
  },
  openResponse: {
    name: 'Open response subscription',
    loadOptions: {
      apiKey: 'c0cR30fx3zBIQLEAYHOV',
      scriptUrlPattern:
        '/proxy/agent?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>',
      endpoint: '/proxy/result-open-response',
      region: 'us',
    },
    serverApiKey: '9faii9hhDKMmrELbeshz',
    decryptionKey: process.env.OPEN_RESPONSE_DECRYPT_KEY,
  },
  stagingMain: {
    name: 'Staging env Main Global subscription',
    loadOptions: {
      apiKey: 'eDfRKapeDy4otXlFqxCz',
      region: 'us',
      endpoint: 'https://api.stage.fpjs.sh',
      scriptUrlPattern:
        'https://procdn.fpjs.sh/v<version>/<apiKey>/loader_v<loaderVersion>.js',
    },
    serverApiKey: 'iKGpQSJNXuabLw7Yy9dH',
  },
} satisfies Record<string, JsAgentDebugProps>;

export const CLOUDFRONT_ENDPOINT =
  'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu';
export const CLOUDFRONT_SCRIPT_URL =
  'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/buc1pMANm4wmx5j1?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>';

// export const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? 'xvADip1wZkem5uyghtMj';
// export const SERVER_API_KEY = process.env.SERVER_API_KEY ?? 'irOLwdzWwi9KwKCioLTo';
// export const CUSTOM_SUBDOMAIN = 'https://fp.jurajuhlar.eu';
// export const REGION = 'us';
// export const REGION_SDK = Region.Global;
