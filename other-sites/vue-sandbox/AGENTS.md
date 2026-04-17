# AGENTS.md — vue-sandbox

## Main goal

Test the `@fingerprint/vue` SDK as close to the way a real user would use it as possible.

## Codebase philosophy

Keep this sandbox small, minimal, and boring. A human should be able to open any file and confirm it works in seconds.

- Every line, file, and doc must earn its place. If it's unused, unclear, or not load-bearing, delete it.
- Prefer deleting over adding. Prefer editing an existing file over creating a new one.
- No duplication that isn't intentional (the three SDK-surface cards are — see below). Factor shared UI/logic into one place.
- No dead code, dead props, dead config fields, or aspirational scaffolding "for later."
- Docs are minimum viable: the main goal, the non-obvious constraints, the known bugs. No status logs, plans, or migration checklists — `git log` already has those.
- Comments only for non-obvious *why*. Skip anything a well-named identifier already tells you.

When in doubt: fewer lines, fewer files, fewer abstractions.

That means:

- Install `FingerprintPlugin` once at app bootstrap with a single `StartOptions` (same as an app user following the docs).
- Exercise the three public SDK entry points as a user would:
  - **Composition API** — `useVisitorData()` from `<script setup>`.
  - **Options API (plugin)** — `this.$fingerprint.getVisitorData()`.
  - **Mixin API** — `fingerprintGetVisitorDataMixin` + `this.$getVisitorData()`.
- Do **not** fake these by calling `Fingerprint.start()` directly behind the scenes, shadowing `$fingerprint`, or otherwise bypassing the plugin. If you add a new surface, it must be the real SDK surface.
- Config switching (scenario, cache) is handled by persisting the selection to `localStorage` and reloading the page, so the plugin re-installs with the new options — because that's how it would work in a real app.

## Port constraint

Dev-server ports must stay exactly as configured. Only specific ports are whitelisted in our environment; shifting to a fallback port (e.g. Vite picking 5176 when 5175 is busy) breaks tooling and must be treated as an error, not tolerated.

- SPA (Vite): **5175** — set in `spa/vite.config.ts` via `server.port`.
- Nuxt: **3002** — set in `nuxt/package.json` via `nuxt dev --port 3002`.

Rules for agents:

- Do not change these ports.
- Do not add `strictPort: false` or rely on Vite's automatic port fallback.
- If a dev server fails to bind because the port is already in use, stop and kill the stale process (`pkill -f vite` / `pkill -f nuxt`) rather than letting it drift to 5176/3003/etc.
- When verifying compiles via `curl`, always hit the fixed port. If `curl` hits a different port because Vite moved, that is a failure state to fix, not a result to interpret.

## Current structure

- Three scenario presets in `shared/config.ts` (`default`, `sealed-results`, `incremental-identification`). Only one is active per page load; the dropdown at the top switches the active one and reloads.
- Three cards in `shared/` (`ScenarioCardComposition.vue`, `ScenarioCardOptions.vue`, `ScenarioCardMixin.vue`), each using exactly one SDK surface.
- Cache controls (enable / storage / duration) also reload on change because they feed into the bootstrap `StartOptions`.

## Server-side mirror

Each card also auto-fetches a server-side result after a successful identify and renders it alongside the client result.

- `shared/server.ts` — Node-only module. Uses `@fingerprint/node-sdk` (`FingerprintServerApiClient.getEvent` + `unsealEventsResponse`). Reads `FP_SECRET_API_KEY` and `FP_SEALED_RESULTS_SECRET_KEY` from the root `.env` via `process.loadEnvFile` (Node ≥ 20.6).
- Nuxt exposes it at `nuxt/server/api/identification/[eventId].get.ts` and `nuxt/server/api/unseal.post.ts`.
- SPA exposes the same two routes via a Vite dev-middleware plugin in `spa/vite.config.ts`. The SPA has no production server; this is dev-only.
- The client picks which endpoint to hit based on `selectedScenarioKey` — sealed scenarios POST to `/api/unseal`, everything else GETs `/api/identification/{eventId}`.
- Never import `shared/server.ts` or `@fingerprint/node-sdk` from client code — it pulls Node built-ins and will break the browser bundle. Client code uses `shared/serverClient.ts`.

## Known SDK bug — sealed_result lost across `localStorage`/`sessionStorage` cache

`@fingerprint/agent` JSON-serializes the visitor result when `cache.storage` is `localStorage` or `sessionStorage` and does not rehydrate `BinaryOutput` on read. On a cache hit, `sealed_result.base64()` throws `raw.sealed_result.base64 is not a function`. The serialization happens inside the agent — the sandbox never touches the cached payload. `cache.storage: agent` (in-memory) is unaffected. Do not paper over this with a defensive `typeof === 'function'` guard in the cards without noting it here; the cards are meant to mirror real SDK usage, and silent guards hide the upstream defect.
