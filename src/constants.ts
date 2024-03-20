import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';

export const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? '2UZgp3skqLzfJpFUGUrw';
export const SERVER_API_KEY = process.env.SERVER_API_KEY ?? '2ittvzwZZThxLA36pKGX';
export const CUSTOM_SUBDOMAIN = 'https://fp.jurajuhlar.eu';
export const CUSTOM_SUBDOMAIN_SCRIPT_URL =
  'https://fp.jurajuhlar.eu/web/v<version>/<apiKey>/loader_v<loaderVersion>.js';
export const REGION = 'eu';
export const REGION_SDK = Region.EU;

export const CLOUDFRONT_ENDPOINT =
  'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/0FDnBHGnHdW3xKHa?region=eu';
export const CLOUDFRONT_SCRIPT_URL =
  'https://cloudfront.juraj.click/ghTV3FGADFbJVSId/buc1pMANm4wmx5j1?apiKey=<apiKey>&version=<version>&loaderVersion=<loaderVersion>';

// export const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? 'xvADip1wZkem5uyghtMj';
// export const SERVER_API_KEY = process.env.SERVER_API_KEY ?? 'irOLwdzWwi9KwKCioLTo';
// export const CUSTOM_SUBDOMAIN = 'https://fp.jurajuhlar.eu';
// export const REGION = 'us';
// export const REGION_SDK = Region.Global;
