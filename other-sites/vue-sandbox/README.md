# Fingerprint Vue SDK sandbox

Two apps (Vite SPA + Nuxt) share [`shared/SandboxShell.vue`](./shared/SandboxShell.vue). Each renders the three public `@fingerprint/vue@2.0.0-rc.0` surfaces — Composition, Options, Mixin — against a selectable scenario and cache config. Each card auto-fetches a server-side mirror (`@fingerprint/node-sdk`) and renders it alongside the client result.

## Run

```bash
pnpm install
pnpm run dev       # both apps
pnpm run dev:spa   # http://localhost:5175
pnpm run dev:nuxt  # http://localhost:3002
```

## Notes

- Scenario + cache selection is persisted to `localStorage`; changing it reloads the page so the plugin re-installs with the new `StartOptions`. See [`AGENTS.md`](./AGENTS.md) for why.
- Public API keys live in [`shared/config.ts`](./shared/config.ts). Default/incremental use the normal key; sealed-results uses the sealed-results key. Default Fingerprint endpoint — localhost compatible.
- Server secrets (`FP_SECRET_API_KEY`, `FP_SEALED_RESULTS_SECRET_KEY`) live in a single root `.env` — loaded by `shared/server.ts` via `process.loadEnvFile` (Node ≥ 20.6).
- Known SDK bug (`sealed_result` + persistent cache) is documented in [`AGENTS.md`](./AGENTS.md).
