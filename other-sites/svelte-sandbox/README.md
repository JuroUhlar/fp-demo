# Fingerprint Svelte SDK sandbox

Four apps (2 × Vite SPA + 2 × SvelteKit) share [`shared/SandboxShell.svelte`](./shared/SandboxShell.svelte). Each renders the `@fingerprint/svelte@3.0.0-rc.0` `useVisitorData()` hook against a selectable scenario and cache config. The card auto-fetches a server-side mirror (`@fingerprint/node-sdk`) and renders it alongside the client result. The shell provides common `linkedId` / `tag` inputs passed to every identify call.

## Run

```bash
pnpm install
pnpm run dev        # all four apps
pnpm run dev:spa4   # http://localhost:5176
pnpm run dev:spa5   # http://localhost:5177
pnpm run dev:kit4   # http://localhost:5178
pnpm run dev:kit5   # http://localhost:5179
```

## Notes

- Scenario + cache selection is persisted to `localStorage`; changing it reloads the page so the provider re-installs with the new `StartOptions`.
- The `incremental-identification` scenario uses the non-public `optimizeRepeatedVisits` option.
- Public API keys live in [`shared/config.ts`](./shared/config.ts).
- Server secrets live in a single root `.env` — loaded by `shared/server.ts` via `process.loadEnvFile` (Node ≥ 20.6).
- Shared `.svelte` files use Svelte 4 syntax; Svelte 5 apps compile them in legacy mode.
- Known SDK bug (`sealed_result` + persistent cache) is documented in [`AGENTS.md`](./AGENTS.md).
