# AGENTS.md — svelte-sandbox

## Main goal

Test the `@fingerprint/svelte` SDK as close to the way a real user would use it as possible.

## Codebase philosophy

Keep this sandbox small, minimal, and boring. A human should be able to open any file and confirm it works in seconds.

- Every line, file, and doc must earn its place. If it's unused, unclear, or not load-bearing, delete it.
- Prefer deleting over adding. Prefer editing an existing file over creating a new one.
- No duplication that isn't intentional. Factor shared UI/logic into one place.
- No dead code, dead props, dead config fields, or aspirational scaffolding "for later."
- Docs are minimum viable: the main goal, the non-obvious constraints, the known bugs. No status logs, plans, or migration checklists — `git log` already has those.
- Comments only for non-obvious *why*. Skip anything a well-named identifier already tells you.

When in doubt: fewer lines, fewer files, fewer abstractions.

That means:

- Wrap content in `FingerprintProvider` once at app bootstrap with a single `StartOptions` (same as an app user following the docs).
- Exercise the single public SDK entry point: `useVisitorData()`.
- Do **not** fake this by calling `Fingerprint.start()` directly, bypassing the provider, or otherwise working around the SDK.
- Config switching (scenario, cache) is handled by persisting the selection to `localStorage` and reloading the page, so the provider re-installs with the new options — because that's how it would work in a real app.

## Port constraint

Dev-server ports must stay exactly as configured. Only specific ports are whitelisted in our environment; shifting to a fallback port breaks tooling and must be treated as an error, not tolerated.

- SPA (Svelte 4): **5176** — set in `spa-svelte4/vite.config.ts` via `server.port`.
- SPA (Svelte 5): **5177** — set in `spa-svelte5/vite.config.ts` via `server.port`.
- SvelteKit (Svelte 4): **5178** — set in `kit-svelte4/vite.config.ts` via `server.port`.
- SvelteKit (Svelte 5): **5179** — set in `kit-svelte5/vite.config.ts` via `server.port`.

Rules for agents:

- Do not change these ports.
- Do not add `strictPort: false` or rely on Vite's automatic port fallback.
- If a dev server fails to bind because the port is already in use, stop and kill the stale process rather than letting it drift.

## Current structure

- Four sub-apps: two SPAs (Svelte 4, Svelte 5) and two SvelteKit apps (Svelte 4, Svelte 5).
- Shared `.svelte` components use Svelte 4 syntax (store subscriptions, `{#if}`, `<slot>`) — this compiles in both Svelte 4 and Svelte 5 (legacy mode).
- Three scenario presets in `shared/config.ts` (`default`, `sealed-results`, `incremental-identification`). Only one is active per page load; the dropdown switches and reloads.
- `incremental-identification` intentionally uses the non-public `optimizeRepeatedVisits` start option. Keep it in scope.
- One card in `shared/ScenarioCard.svelte` using `useVisitorData({ immediate: false })`.
- Cache controls (enable / storage / duration) also reload on change because they feed into the bootstrap `StartOptions`.
- `linkedId` and `tag` are shared text inputs passed to every identify call via `GetOptions`.

## Server-side mirror

The card auto-fetches a server-side result after a successful identify and renders it alongside the client result.

- `shared/server.ts` — Node-only module. Uses `@fingerprint/node-sdk` (`FingerprintServerApiClient.getEvent` + `unsealEventsResponse`). Reads secrets from the root `.env` via `process.loadEnvFile` (Node ≥ 20.6).
- SvelteKit apps expose it via native server routes at `src/routes/api/identification/[eventId]/+server.ts` and `src/routes/api/unseal/+server.ts`.
- SPA apps expose the same two routes via a Vite dev-middleware plugin in `vite.config.ts`. The SPA has no production server; this is dev-only.
- The client picks which endpoint to hit based on `selectedScenarioKey` — sealed scenarios POST to `/api/unseal`, everything else GETs `/api/identification/{eventId}`.
- The card's reactive statement calls server fetch only when `event_id` changes, preventing refires on cache hits.
- Never import `shared/server.ts` from client code — it pulls Node built-ins and will break the browser bundle.

## Known SDK bug — sealed_result lost across localStorage/sessionStorage cache

`@fingerprint/agent` JSON-serializes the visitor result when `cache.storage` is `localStorage` or `sessionStorage` and does not rehydrate `BinaryOutput` on read. On a cache hit, `sealed_result.base64()` throws. The serialization happens inside the agent — the sandbox never touches the cached payload. `cache.storage: agent` (in-memory) is unaffected. Do not paper over this with a defensive guard in the cards; the cards are meant to mirror real SDK usage.
