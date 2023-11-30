// import axios from 'axios';
// import { URLSearchParams } from 'url';
// import { isNativeError } from 'util/types';

// export async function GET(req: Request) {
//   try {
//     const queryParams = new URLSearchParams(req.url.split('?')[1]);
//     const apiKey = queryParams.get('apiKey');
//     const version = queryParams.get('version');
//     const loaderVersion = queryParams.get('loaderVersion');

//     const base = `https://fpcdn.io/v${version}/${apiKey}`;
//     const lv = loaderVersion ? `/loader_v${loaderVersion}.js` : '';
//     const proCDNURL = new URL(`${base}${lv}`);

//     // Forward all query parameters
//     proCDNURL.search = req.url.split('?')[1];

//     // Add monitoring parameter
//     proCDNURL.searchParams.append('ii', `custom-integration/1.0/procdn`);

//     // console.log(proCDNURL);

//     const axiosHeaders: Record<string, string> = {};
//     for (const [key, value] of req.headers.entries()) {
//       axiosHeaders[key] = value;
//     }

//     const cdnResponseAxios = await axios.get(proCDNURL.toString(), {
//       headers: { 'Content-Type': 'application/javascript' },
//       decompress: false,
//     });

//     const responseHeaders = new Headers();
//     // Iterarate over cdnResponseAxios.headers and set response headers
//     for (const [key, value] of Object.entries(cdnResponseAxios.headers)) {
//       responseHeaders.set(key, value);
//     }

//     return new Response(cdnResponseAxios.data, {
//       status: cdnResponseAxios.status,
//       statusText: cdnResponseAxios.statusText,
//       headers: responseHeaders,
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(isNativeError(error) ? error.message : `Something went wrong, ${error} `, {
//       status: 500,
//     });
//   }
// }
