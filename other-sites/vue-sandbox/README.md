# Fingerprint Vue SDK sandbox

Two apps (Vite SPA + Nuxt) share [`shared/SandboxShell.vue`](./shared/SandboxShell.vue). Each renders the three public `@fingerprint/vue@2.0.0-rc.0` surfaces — Composition, Options, Mixin — against a selectable scenario and cache config. Each card auto-fetches a server-side mirror (`@fingerprint/node-sdk`) and renders it alongside the client result. The shell also provides common `linkedId` / `tag` inputs that are passed to every identify call across all three surfaces.

## Run

```bash
pnpm install
pnpm run dev       # both apps
pnpm run dev:spa   # http://localhost:5175
pnpm run dev:nuxt  # http://localhost:3002
```

### Cloudflare Pages (SPA only)

```bash
cd spa
pnpm run build:cloudflare
pnpm dlx wrangler pages deploy dist
```

The SPA Cloudflare build disables the dev-only server mirror UI because `/api/identification/*` and `/api/unseal` only exist in the local Vite middleware, not in a static Pages deployment.

## Notes

- Scenario + cache selection is persisted to `localStorage`; changing it reloads the page so the plugin re-installs with the new `StartOptions`. See [`AGENTS.md`](./AGENTS.md) for why.
- The `incremental-identification` scenario intentionally uses the non-public `optimizeRepeatedVisits` option because the sandbox also tracks that real-world usage, even though it is not part of the typed public API.
- Public API keys live in [`shared/config.ts`](./shared/config.ts). Default/incremental use the normal key; sealed-results uses the sealed-results key. Default Fingerprint endpoint — localhost compatible.
- Server secrets (`FP_SECRET_API_KEY`, `FP_SEALED_RESULTS_SECRET_KEY`) live in a single root `.env` — loaded by `shared/server.ts` via `process.loadEnvFile` (Node ≥ 20.6).
- Known SDK bug (`sealed_result` + persistent cache) is documented in [`AGENTS.md`](./AGENTS.md).
