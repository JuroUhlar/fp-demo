# Proxy v4

Custom Fingerprint proxy using a single handler. Every request under `/proxy-v4` is forwarded to the Fingerprint API with the same path, so agent download, identification, and browser cache share one code path.

See [handleProxyRequest.ts](./handleProxyRequest.ts).

| Incoming | Fingerprint API |
| --- | --- |
| `POST /proxy-v4` | identification |
| `GET /proxy-v4/web/*` | JS agent download |
| `GET /proxy-v4/*` | browser cache |

## Demo

- [demo/page.tsx](./demo/page.tsx)
- [demo-v3-agent/page.tsx](./demo-v3-agent/page.tsx)
- [demo-incremental-id/page.tsx](./demo-incremental-id/page.tsx)
