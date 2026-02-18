# Proxy v4

Custom Fingerprint proxy integration using Next.js App Router.

## Handlers

| Endpoint          | Method | Handler                                                                                                                |
| ----------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `/proxy-v4`       | POST   | [proxyIdentificationRequest.ts](./proxyIdentificationRequest.ts) - Forwards identification requests to Fingerprint API |
| `/proxy-v4/*`     | GET    | [proxyBrowserCacheRequest.ts](./[...randomPathSegments]/proxyBrowserCacheRequest.ts) - Handles browser cache requests  |
| `/proxy-v4/web/*` | GET    | [proxyAgentDownloadRequest.ts](./web/[...path]/proxyAgentDownloadRequest.ts) - Serves the JS agent from CDN            |

## Routes

- [route.ts](./route.ts) - Root POST route
- [[...randomPathSegments]/route.ts](./[...randomPathSegments]/route.ts) - Catch-all GET route for cache
- [web/[...path]/route.ts](./web/[...path]/route.ts) - Agent download route

## Demo

- [demo/page.tsx](./demo/page.tsx) - Demo page using the proxy
