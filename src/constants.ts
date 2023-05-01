import { Region } from '@fingerprintjs/fingerprintjs-pro-server-api';

export const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_PUBLIC_API_KEY ?? '2UZgp3skqLzfJpFUGUrw';
export const SERVER_API_KEY = process.env.SERVER_API_KEY ?? '2ittvzwZZThxLA36pKGX';
export const CUSTOM_SUBDOMAIN = 'https://fp.jurajuhlar.eu';
export const REGION = 'eu';
export const REGION_SDK = Region.EU;
