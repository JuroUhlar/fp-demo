# Svelte Sandbox — Implementation Plan

Test `@fingerprint/svelte@3.0.0-rc.0` the same way `vue-sandbox` tests `@fingerprint/vue@2.0.0`: exercise every configuration permutation against the real SDK surface, with a server-side mirror for each identification.

## Decisions

| Question | Answer |
|---|---|
| Sub-projects | **4**: Svelte 4 SPA, Svelte 5 SPA, Svelte 4 SvelteKit, Svelte 5 SvelteKit |
| Cards per app | **1** — the SDK exposes one surface: `useVisitorData()` |
| Shared component syntax | Svelte 4 store-based (`$store`, `{#if}`, slots) — works in all 4 apps |
| Dev ports | 5176 (S4 SPA), 5177 (S5 SPA), 5178 (S4 Kit), 5179 (S5 Kit) |
| Server-side mirror | Yes, full parity with vue-sandbox |
| Cross-sandbox sharing | None — self-contained copy, adapted for Svelte types |
| SDK version | Pinned `3.0.0-rc.0` |
| Runes in Svelte 5 apps | No — legacy store syntax everywhere (shared + app-level) |
| Cloudflare Pages build | Deferred — out of scope for initial implementation |

## Risk: Svelte 4 syntax in Svelte 5 compiler

The entire shared-component strategy depends on Svelte 5's legacy mode compiling Svelte 4 syntax (store subscriptions, `{#if}` blocks, `<slot>`). This works for most patterns, but edge cases exist (e.g., `<svelte:component>`, lifecycle hooks). **Phase 0 validates this before scaffolding all four apps.**

## File tree

```
svelte-sandbox/
├── .env                         # FP_SECRET_API_KEY, FP_SEALED_RESULTS_SECRET_KEY
├── .gitignore
├── AGENTS.md
├── README.md
├── package.json                 # root — workspace scripts
├── pnpm-workspace.yaml          # packages: [spa-svelte4, spa-svelte5, kit-svelte4, kit-svelte5]
│
├── shared/
│   ├── config.ts                # scenarios, API keys, cache presets (Svelte writable stores)
│   ├── server.ts                # Node-only: @fingerprint/node-sdk (getEvent + unseal)
│   ├── serverClient.ts          # Browser-only: fetch /api/* endpoints
│   ├── SandboxShell.svelte      # scenario dropdown, cache controls, linkedId/tag inputs
│   ├── DemoCard.svelte          # generic card: client result + server result display
│   └── ScenarioCard.svelte      # one card using useVisitorData() + server mirror
│
├── spa-svelte4/
│   ├── package.json             # svelte@^4, @fingerprint/svelte@3.0.0-rc.0
│   ├── vite.config.ts           # port 5176, strictPort, Vite dev-middleware for /api/*
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.ts              # mount App.svelte
│       └── App.svelte           # FingerprintProvider + SandboxShell
│
├── spa-svelte5/
│   ├── package.json             # svelte@^5, @fingerprint/svelte@3.0.0-rc.0
│   ├── vite.config.ts           # port 5177, same middleware
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── main.ts
│       └── App.svelte
│
├── kit-svelte4/
│   ├── package.json             # svelte@^4, @sveltejs/kit, @fingerprint/svelte@3.0.0-rc.0
│   ├── svelte.config.js
│   ├── vite.config.ts           # port 5178
│   ├── tsconfig.json
│   └── src/
│       ├── app.html
│       ├── routes/
│       │   └── +page.svelte     # FingerprintProvider + SandboxShell (browser-gated)
│       └── routes/api/
│           ├── identification/[eventId]/+server.ts
│           └── unseal/+server.ts
│
└── kit-svelte5/
    ├── package.json             # svelte@^5, @sveltejs/kit, @fingerprint/svelte@3.0.0-rc.0
    ├── svelte.config.js
    ├── vite.config.ts           # port 5179
    ├── tsconfig.json
    └── src/
        ├── app.html
        ├── routes/
        │   └── +page.svelte
        └── routes/api/
            ├── identification/[eventId]/+server.ts
            └── unseal/+server.ts
```

## Phases

### Phase 0 — Validate Svelte 4/5 shared-component compatibility

**Goal**: Confirm that a `.svelte` file using Svelte 4 syntax (store subscriptions, `{#if}`, `<slot>`) compiles and runs correctly when imported by a Svelte 5 app.

1. Scaffold `spa-svelte5/` with a minimal Vite + Svelte 5 setup.
2. Create one tiny shared component using `$store`, `{#if}`, `<slot>`.
3. Import it from the Svelte 5 app, run `pnpm dev`, verify it renders.
4. If it fails, fall back to two shared dirs (`shared-v4/`, `shared-v5/`).

### Phase 1 — Shared code

Port the shared modules from vue-sandbox, adapting for Svelte idioms:

**`shared/config.ts`**
- Same scenarios: `default`, `sealed-results`, `incremental-identification`.
- Same API keys: `2UZgp3skqLzfJpFUGUrw` (main), `Xxcooa8Yc0MaSEo9VQDy` (sealed).
- Same region: `eu`.
- Persisted state via Svelte `writable` stores with `localStorage` subscribers (synchronous write in subscriber, not deferred — matches Vue's `flush: 'sync'`).
- `getBootStartOptions()` reads current store values, returns `StartOptions`.
- `getCommonGetOptions()` returns `{ linkedId, tag }` from shared inputs.
- `toDisplayResult()` — same sealed_result.base64() extraction.
- Types from `@fingerprint/svelte` (`Fingerprint` namespace) instead of `@fingerprint/vue`.

**`shared/server.ts`**
- Verbatim copy from vue-sandbox. Pure Node, no framework dependency.
- Reads `.env` from `../.env` via `process.loadEnvFile`.

**`shared/serverClient.ts`**
- Same logic as vue-sandbox but with Svelte-compatible types.
- `loadServerResultIfNew()` takes a state object and result, skips fetch on same `event_id`.
- Import `Fingerprint` types from `@fingerprint/svelte`.

**`shared/SandboxShell.svelte`**
- Scenario dropdown, cache toggle/storage/duration selects, linkedId/tag inputs.
- All controls backed by the writable stores from `config.ts`.
- Scenario and cache changes call `window.location.reload()` (same reload pattern as Vue).
- Displays current `StartOptions` and `GetOptions` as JSON.
- Renders `<ScenarioCard />`.

**`shared/DemoCard.svelte`**
- Props: title, subtitle, isFetched, isLoading, error, data, serverNote, serverLoading, serverError, serverData.
- Client result + server result display blocks.
- `<slot name="actions" />` for the Identify button.

**`shared/ScenarioCard.svelte`**
- Uses `useVisitorData({ immediate: false })`.
- Identify button calls `getData(getCommonGetOptions())`.
- Watches `$data` for changes, calls `loadServerResultIfNew()`.
- Passes all state to `<DemoCard>`.

### Phase 2 — SPA apps (Svelte 4 + Svelte 5)

**`spa-svelte4/`** (port 5176) and **`spa-svelte5/`** (port 5177):

- Vite + `@sveltejs/vite-plugin-svelte`.
- `App.svelte` wraps content in `<FingerprintProvider options={getBootStartOptions()}>`.
- `vite.config.ts`: path alias `@shared` → `../shared`, `strictPort: true`, Vite dev-middleware plugin for `/api/identification/:eventId` and `/api/unseal` (same pattern as vue-sandbox SPA).
- `fs.allow` includes shared dir.

Difference between the two: only `svelte` version in `package.json` (`^4` vs `^5`).

### Phase 3 — SvelteKit apps (Svelte 4 + Svelte 5)

**`kit-svelte4/`** (port 5178) and **`kit-svelte5/`** (port 5179):

- `@sveltejs/kit` + `@sveltejs/adapter-auto`.
- **SSR gating**: `FingerprintProvider` is browser-only. Use `import { browser } from '$app/environment'` and `{#if browser}` to gate the provider and SDK usage. The `+page.svelte` wraps `FingerprintProvider` + `SandboxShell` in `{#if browser}`.
- `svelte.config.js`: path alias `@shared` → `../shared` via `kit.alias`.
- `vite.config.ts`: port + `strictPort`, `fs.allow` for shared dir.
- Server routes (native SvelteKit):
  - `src/routes/api/identification/[eventId]/+server.ts` — GET, calls `fetchIdentification`.
  - `src/routes/api/unseal/+server.ts` — POST, calls `unsealResult`.
- `.svelte-kit/` in `.gitignore`.

Difference between the two: only `svelte` version in `package.json`.

### Phase 4 — Root plumbing

- `package.json`: workspace scripts (`dev`, `dev:spa4`, `dev:spa5`, `dev:kit4`, `dev:kit5`, `typecheck`).
- `pnpm-workspace.yaml`: list all four packages.
- `.env`: same secrets as vue-sandbox (shared Fingerprint workspace).
- `.gitignore`: `node_modules`, `.env`, `dist`, `.svelte-kit`, `.vite`, `.cache`, `*.log`.
- `AGENTS.md`: main goal, codebase philosophy, port constraint, structure, server-side mirror, known sealed-result bug, `optimizeRepeatedVisits` note.
- `README.md`: run instructions, notes.

### Phase 5 — Verification

1. `pnpm install` from root.
2. Run each app individually, verify:
   - Page loads, scenario dropdown works.
   - Identify button triggers identification, client result displays.
   - Server result auto-fetches and displays.
   - Scenario switch + reload works.
   - Cache toggle works (enable, change storage/duration, reload).
   - linkedId/tag inputs flow to GetOptions.
   - Sealed-results scenario works (server unseals).
   - Incremental-identification scenario triggers `optimizeRepeatedVisits`.
3. `pnpm dev` runs all four in parallel without port conflicts.
4. Typecheck passes for all four apps.

## Non-obvious constraints

- **`optimizeRepeatedVisits`** is a non-public `StartOptions` field on `@fingerprint/agent` v4. The incremental-identification scenario uses it. Verify it actually triggers the experimental behavior with the Svelte SDK (same underlying agent, should work, but confirm).
- **Sealed-result + persistent cache bug**: `sealed_result.base64()` throws on cache hit from `localStorage`/`sessionStorage` because the agent doesn't rehydrate `BinaryOutput`. Same bug exists regardless of framework. Don't work around it silently — document it in AGENTS.md.
- **`server.ts` must never be imported from browser code** — it pulls Node built-ins. SPA apps use `serverClient.ts` on the client side and dynamic-import `server.ts` only inside the Vite middleware.
- **Reload-on-config-change**: localStorage writes in Svelte store subscribers are synchronous, but verify the store subscription fires before `location.reload()` is called. The Vue sandbox uses `flush: 'sync'` for this guarantee.
