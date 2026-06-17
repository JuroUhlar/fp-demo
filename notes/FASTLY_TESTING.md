# Fastly Compute latest main testing - plugin removal / single backend

Tested: 2026-06-17
Commit tested: `fd15ce64f3699fb488c5ccaf536588bbfff019c9` (`INTER-2098: Remove OCR plugin system and use single backend`)
Release status: no newer GitHub release exists yet; built and deployed from `main`.
Terraform: not tested; manual/CLI path only.

## Migration guide cleanup and localhost retest

Tested: 2026-06-18
Guide: `fingerprintjs/docs` PR [#289](https://github.com/fingerprintjs/docs/pull/289), `fastly-compute-v3-to-v4-migration-guide.mdx`
Demo: `http://localhost:3000/fastly-compute-latest`

### Service migration changes

US service `qpRIe1OIuDfIMijt5udzL1`:

- Cloned active version 7 to version 8.
- Kept only `fingerprint` -> `api.fpjs.io`.
- Removed `api.fpjs.io`, `eu.api.fpjs.io`, `ap.api.fpjs.io`, and `fpcdn.io`.
- Removed the `Fingerprint_Results_qpRIe1OIuDfIMijt5udzL1` KV Store resource link.
- Activated version 8.
- Deleted `DECRYPTION_KEY` from the Secret Store.
- Deleted these plugin Config Store entries:
  - `OPEN_CLIENT_RESPONSE_PLUGINS_ENABLED`
  - `SAVE_TO_KV_STORE_PLUGIN_ENABLED`
  - `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED`
- Deleted the results KV Store and its 21 entries.

EU service `urFb9O94erZ7G2GScP9Igl`:

- Cloned active version 5 to version 6.
- Kept only `fingerprint` -> `eu.api.fpjs.io`.
- Removed `api.fpjs.io` and `eu.api.fpjs.io`.
- Activated version 6.
- Deleted these plugin Config Store entries:
  - `SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED`
  - `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED`

Both services retain `AGENT_SCRIPT_DOWNLOAD_PATH` and `GET_RESULT_PATH` because the e2e demo still verifies JavaScript agent v3 compatibility. Both Secret Stores now contain only `PROXY_SECRET`.

### Post-migration verification

| Check | Result |
|---|---|
| US `/status` | Version 8, `Fingerprint backend is configured`, no plugin section |
| EU `/status` | Version 6, `Fingerprint backend is configured`, no plugin section |
| US V4 from localhost | Passed, event `1781738485111.09XrtT`, sealed result returned |
| US V3 from localhost | Passed, request `1781738486301.1hvYJb`, sealed result returned |
| EU V4 from localhost | Passed, event `1781738484528.afjNob`, visitor `frQI0uJyKysH4BOgqXkj` |
| EU V3 from localhost | Passed, request `1781738486259.OED3h5`, visitor `frQI0uJyKysH4BOgqXkj` |
| Server API checks | All four events returned and reported `fingerprint-pro-fastly-compute` |
| Browser/network errors | None; all Fastly agent, cache, and identification requests returned HTTP 200 |

### V4 endpoint without a region query

Removed the legacy `?region=us` and `?region=eu` suffixes from the demo's V4
`endpoints` values and repeated the localhost e2e test.

| Check | Result |
|---|---|
| US V4 POST | `https://fastly-compute.jurajuhlar.eu/?ci=js/4.1.0&q=...`, passed |
| EU V4 POST | `https://totally-legal-hog.edgecompute.app/?ci=js/4.1.0&q=...`, passed |
| V4 `region` query parameter | Absent from both identification POSTs |
| US/EU V3 regression | Both `/agent` and `/result` flows still passed |
| Server API checks | All four events returned and reported `fingerprint-pro-fastly-compute` |
| Browser/network errors | None |

This works because each migrated service now has a single `fingerprint` backend
configured for its subscription region. The migration guide's code examples
still include `?region=us`, so the examples are more conservative than the new
single-backend runtime behavior.

### Oddities

- The migration guide names only `OPEN_CLIENT_RESPONSE_PLUGINS_ENABLED` and `SAVE_TO_KV_STORE_PLUGIN_ENABLED`, but services tested against the RC also contained `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED` and `SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED`. These are plugin-only and no longer read, so they were removed too.
- The migrated single-backend implementation no longer needs the V4 `region` query parameter, but the migration guide's V4 endpoint examples still include it.
- Deleting several Config Store entries concurrently caused one Fastly API `409 Conflict`; retrying the affected deletion sequentially succeeded.
- The package and Server API integration metadata still report `0.4.0-rc.0`, even though the deployed package was built from post-RC commit `fd15ce64`. This is because both `handleStatusPage.ts` and `addTrafficMonitoring.ts` read `packageJson.version`, while `package.json` on `main` still has `"version": "0.4.0-rc.0"`.
- The locally built package SHA-512 is `ebcebff007467f8c645b5969cf2f872ada46a08a27efa9022d45d1ab66bb4e46179ec6ad0de692bcac5a38b218fddb297ad1212a34932b2d5cafd6b0766fee9d`, exactly matching the active package metadata on both services.
- The previous `origin_not_available` result from localhost is no longer reproducible. Both EU V3 and V4 pass from `http://localhost:3000`.

### Service cleanup

Retained and renamed:

| Region | Service name | Service ID | Active version |
|---|---|---|---|
| US | `fingerprint-fastly-compute-manual-us-test` | `qpRIe1OIuDfIMijt5udzL1` | 8 |
| EU | `fingerprint-fastly-compute-manual-eu-test` | `urFb9O94erZ7G2GScP9Igl` | 6 |

Deleted:

- `neatly-liberal-tahr.edgecompute.app` (`IlrgCZnYwFBP0EKVNRQsD6`)
- `fingerprint-fastly-compute-terraform-test` (`52FYzRcQKQzSdcd1MZ7v0M`)

After deletion, the Fastly account lists only the two retained Compute services.
The deleted Terraform service's orphaned Config Store and Secret Store were
also deleted. The local `fastly-compute-terraform/main.tf` still references its
deleted service ID.

## Source verification

```bash
git clone --depth 1 https://github.com/fingerprintjs/fastly-compute-proxy.git /tmp/fastly-compute-proxy-main
cd /tmp/fastly-compute-proxy-main
pnpm install --frozen-lockfile
pnpm test
pnpm run build
```

Results:

| Check | Result |
|---|---|
| Unit tests | 7 suites / 97 tests passed |
| Package build | `pkg/fingerprint-fastly-compute-proxy-integration.tar.gz` built successfully |
| Built package size | 4,030,243 bytes in Fastly package metadata |
| Package hash | `ebcebff007467f8c645b5969cf2f872ada46a08a27efa9022d45d1ab66bb4e46179ec6ad0de692bcac5a38b218fddb297ad1212a34932b2d5cafd6b0766fee9d` |

## Manual Fastly deployments

The public latest release endpoint still returns stable `v0.3.1`; the newest release/tag is `v0.4.0-rc.0`. The plugin-removal/single-backend changes are on `main` only, so the package was built locally and deployed with the Fastly CLI from the local dev dependency.

### US subscription service

| Resource | Value |
|---|---|
| Service ID | `qpRIe1OIuDfIMijt5udzL1` |
| Domain | `fastly-compute.jurajuhlar.eu` |
| Subscription | `SUBS.openResponse` |
| Package deploy version | 6 |
| Final active version | 7 |
| New backend | `fingerprint` -> `api.fpjs.io` |

Commands used:

```bash
fastly compute deploy --package pkg/fingerprint-fastly-compute-proxy-integration.tar.gz \
  --service-id qpRIe1OIuDfIMijt5udzL1 --status-check-off \
  --comment 'Test fd15ce64 remove OCR/plugins' --non-interactive

fastly backend create --service-id qpRIe1OIuDfIMijt5udzL1 --version active --autoclone \
  --name fingerprint --address api.fpjs.io --override-host api.fpjs.io \
  --ssl-cert-hostname api.fpjs.io --ssl-sni-hostname api.fpjs.io \
  --use-ssl --ssl-check-cert --port 443 --connect-timeout 1000 \
  --first-byte-timeout 15000 --between-bytes-timeout 10000 --max-conn 200 \
  --non-interactive

fastly service-version activate --service-id qpRIe1OIuDfIMijt5udzL1 --version 7 --non-interactive
```

Status page:

| Check | Result |
|---|---|
| `/status` | Service version 7 |
| Single backend status | `Fingerprint backend is configured` |
| Plugin section | Removed |
| Required config | `PROXY_SECRET` set |
| V3 path config | `AGENT_SCRIPT_DOWNLOAD_PATH` and `GET_RESULT_PATH` set |

Functional checks:

| Check | Result |
|---|---|
| JS Agent V4 via `https://fastly-compute.jurajuhlar.eu?region=us` | HTTP 200, returned `event_id: 1781722647291.JnE21x` and `sealed_result` |
| Server API V4 event | `visitor_id: 03WGtDX4mini0dTxaevq`; `sdk.integrations[0].name: fingerprint-pro-fastly-compute`; version `0.4.0-rc.0` |
| JS Agent V3 via `/agent` + `/result` | Agent download 200, browser cache 200, identification POST 200; returned `requestId: 1781722937021.1sxn3A` and `sealedResult` |

### EU subscription service

| Resource | Value |
|---|---|
| Service ID | `urFb9O94erZ7G2GScP9Igl` |
| Domain | `totally-legal-hog.edgecompute.app` |
| Subscription | `SUBS.main` |
| Package deploy version | 4 |
| Final active version | 5 |
| New backend | `fingerprint` -> `eu.api.fpjs.io` |

Commands used:

```bash
fastly compute deploy --package pkg/fingerprint-fastly-compute-proxy-integration.tar.gz \
  --service-id urFb9O94erZ7G2GScP9Igl --status-check-off \
  --comment 'Test fd15ce64 remove OCR/plugins' --non-interactive

fastly backend create --service-id urFb9O94erZ7G2GScP9Igl --version active --autoclone \
  --name fingerprint --address eu.api.fpjs.io --override-host eu.api.fpjs.io \
  --ssl-cert-hostname eu.api.fpjs.io --ssl-sni-hostname eu.api.fpjs.io \
  --use-ssl --ssl-check-cert --port 443 --connect-timeout 1000 \
  --first-byte-timeout 15000 --between-bytes-timeout 10000 --max-conn 200 \
  --prefer-ipv6 true --non-interactive

fastly service-version activate --service-id urFb9O94erZ7G2GScP9Igl --version 5 --non-interactive
```

Status page:

| Check | Result |
|---|---|
| `/status` | Service version 5 |
| Single backend status | `Fingerprint backend is configured` |
| Plugin section | Removed |
| Required config | `PROXY_SECRET` set |
| V3 path config | `AGENT_SCRIPT_DOWNLOAD_PATH` and `GET_RESULT_PATH` set |

Functional checks:

| Check | Result |
|---|---|
| JS Agent V4 from `https://www.jurajuhlar.eu/` origin via `https://totally-legal-hog.edgecompute.app?region=eu` | HTTP 200, returned `event_id: 1781722876479.TsxReP`, `visitor_id: l12OeNeVNZxu0cpjPofJ`, `sealed_result: null` |
| Server API V4 event | `visitor_id: l12OeNeVNZxu0cpjPofJ`; `sdk.integrations[0].name: fingerprint-pro-fastly-compute`; version `0.4.0-rc.0` |
| JS Agent V3 from `https://www.jurajuhlar.eu/` origin via `/agent` + `/result` | Agent download 200, browser cache 200, identification POST 200; returned `requestId: 1781722976906.J8ZZuF`, `visitorId: l12OeNeVNZxu0cpjPofJ` |

Historical caveat:

- During the initial 2026-06-17 test, `SUBS.main` returned HTTP 403 `origin_not_available` from `http://localhost:3020`. This was not reproducible during the 2026-06-18 migration retest from `http://localhost:3000`; both EU V3 and V4 passed.

## Notes / observations

- The status page still displays integration version `0.4.0-rc.0` because `package.json` has not been versioned after the `main` changes. The package metadata hash/size and status page behavior confirm the deployed code is from the new build.
- The old plugin configuration block is gone from both status pages.
- The new `fingerprint` backend path is active on both services. Deprecated region-named backends remained after the initial deployment and were removed during the 2026-06-18 migration cleanup.
- EU service activation needed a short propagation delay. Immediately after activating version 5, `/status` still showed version 4; after roughly 30 seconds it showed version 5.

# Fastly Compute v0.4.0-rc.0 Testing Results

Tested: 2026-06-01
Service: `qpRIe1OIuDfIMijt5udzL1` (fastly-compute.jurajuhlar.eu)
Previous version: 0.3.1 (service version 4) → **0.4.0-rc.0** (service version 5)

## Deployment

Deployed the pre-built release package from [v0.4.0-rc.0](https://github.com/fingerprintjs/fastly-compute-proxy/releases/tag/v0.4.0-rc.0):

```bash
gh release download v0.4.0-rc.0 --repo fingerprintjs/fastly-compute-proxy --dir /tmp/fastly-rc
tar xzf /tmp/fastly-rc/fingerprint-fastly-compute-proxy-integration.tar.gz
cd /tmp/fastly-rc/fingerprint-fastly-compute-proxy-integration
fastly compute deploy --package /tmp/fastly-rc/fingerprint-fastly-compute-proxy-integration.tar.gz \
  --service-id qpRIe1OIuDfIMijt5udzL1 --status-check-off
```

Note: `fastly compute publish` tries to rebuild from source and fails without `package.json`. Use `fastly compute deploy` with `--package` for pre-built releases.

## Config migration

The config key `SAVE_TO_KV_STORE_PLUGIN_ENABLED` was renamed to `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED`. The new code falls back to the old key, but the status page shows a deprecation warning until migrated:

```bash
fastly config-store-entry update --store-id=jb2fs8Fj3OYkjVIRPyexx4 \
  --key=SAVE_TO_KV_STORE_PLUGIN_ENABLED --value=false
fastly config-store-entry create --store-id=jb2fs8Fj3OYkjVIRPyexx4 \
  --key=SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED --value=true
```

No other config changes required. All existing entries (`AGENT_SCRIPT_DOWNLOAD_PATH`, `GET_RESULT_PATH`, `OPEN_CLIENT_RESPONSE_PLUGINS_ENABLED`, secrets) continue to work.

## Verification results

| Check | Result |
|---|---|
| Status page (`/status`) | All green, version 0.4.0-rc.0, service version 5 |
| JS Agent identification (V3, open response) | `sealedResult` returned, `visitorId` empty (expected) |
| Local decryption (`/api/decrypt`) | Decrypts successfully, `visitorId: s98cElxuAD0gqi9vGqFN` |
| KV Store plugin (`saveSealedResultToKVStore`) | Entry saved with full decrypted event JSON, keyed by requestId |
| Backward compat (old `SAVE_TO_KV_STORE_PLUGIN_ENABLED`) | Works via fallback, status page shows deprecation warning |
| Backward compat (migrated key) | Works, clean status page |
| JS Agent V4 identification (`Fingerprint.start()` with `endpoints`) | `event_id` and `sealed_result` returned via catch-all route |
| Server API v4 event response | Full event with `sdk.version: "4.1.0"`, integration `fingerprint-pro-fastly-compute v0.4.0-rc.0` |
| V4 sealed result decryption (`/api/decrypt-v4`) | Decrypts successfully, `visitor_id: s98cElxuAD0gqi9vGqFN`, all smart signals present |

Not tested:
- `processIdentificationResponse` plugin / `SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED`
- Removing `fpcdn.io` backend from service dashboard

### Bug: `processSealedResultResponse` runs unconditionally (2026-06-02)

**Empirically confirmed** on service `urFb9O94erZ7G2GScP9Igl` (`totally-legal-hog.edgecompute.app`) — a separate Fastly Compute service deployed with `SUBS.main` (no sealed results enabled).

When a V4 identification succeeds (HTTP 200) but the subscription does not have sealed results enabled (`sealed_result: null` in response), the Fastly Compute logs show:

```
Make sure Decryption Key is added to Secret Store and its activated from Fingerprint workspace:
  (new Error("Sealed result is not enabled for this subscription", "__fastly_helpers.js", 5760))
```

**Root cause** (`src/handlers/handleApiRequest.ts:61-67`): `processSealedResultResponse()` is called unconditionally on every successful POST. Unlike `processOpenClientResponse()` (gated by `isOpenClientResponseEnabled()`), there is no guard. The function throws at line 19 when `sealedResult`/`sealed_result` is null/missing, before any plugin's own enabled-check can run.

In contrast, `processIdentificationResponse` handles this correctly — the `saveEventToKVStore` plugin checks its config store flag first and exits early:
```
Plugin 'SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED' is not enabled
```

**Impact**: Every identification request on a subscription without sealed results logs a misleading error about missing Decryption Keys. No functional impact (the `.catch()` prevents it from breaking the response), but it does unnecessary work (parsing, secret store lookup) and pollutes logs.

**Fix**: Gate `processSealedResultResponse` behind a config check before calling it, similar to how `processOpenClientResponse` is gated. Or move the sealed-result/decryption-key validation after confirming at least one `processSealedResult` plugin is registered and enabled.

**Test service**: `urFb9O94erZ7G2GScP9Igl` (`totally-legal-hog.edgecompute.app`), v0.4.0-rc.0, using `SUBS.main` proxy secret `znYGLC2S6jcfp0P7BDuL`.
Demo page: `src/app/fastly-compute-terraform-v4-no-sealed/page.tsx`

### Bug: Status page hides missing KV store when OCR is disabled (2026-06-02)

**Empirically confirmed** on service `urFb9O94erZ7G2GScP9Igl` (`totally-legal-hog.edgecompute.app`).

The KV store health check for sealed results (`handleStatusPage.ts:270`) only runs when **both** `isOpenClientResponseEnabled(env)` AND `isSaveSealedResultToKvStorePluginEnabled(env)` are true. But sealed-result storage is independent of Open Client Response — `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED=true` with OCR disabled is a valid config (the plugin just saves sealed results to a KV store during `processSealedResult`).

The event KV store check (`handleStatusPage.ts:279`) correctly has no OCR gate — `isSaveEventToKvStorePluginEnabled(env)` alone is sufficient.

**Test setup**: Service `urFb9O94erZ7G2GScP9Igl` with no `Fingerprint_Results_*` or `Fingerprint_Events_*` KV stores.

| Config state | Event KV warning | Sealed result KV warning |
|---|---|---|
| OCR=unset, `SAVE_SEALED_RESULT`=true, `SAVE_EVENT`=true | Yes (correct) | **No (BUG)** |
| OCR=true, `SAVE_SEALED_RESULT`=true, `SAVE_EVENT`=true | Yes | Yes |

**Impact**: A customer who enables sealed-result storage but not OCR (a valid V4-only config) gets no status page warning when the required `Fingerprint_Results_<serviceId>` KV store is missing or unreachable. The plugin silently fails at runtime.

**Fix**: Remove the `isOpenClientResponseEnabled(env)` condition from the sealed-result KV store check on line 270, matching how the event KV store check on line 279 works.

### Terraform-managed service verification (2026-06-02)

Service `52FYzRcQKQzSdcd1MZ7v0M` at `fastly-compute-tf.jurajuhlar.com`, upgraded to v0.4.0-rc.0 via `download_asset = false` + manually placed package.

| Check | Result |
|---|---|
| Status page (`/status`) | All green, version 0.4.0-rc.0, service version 3 |
| JS Agent V3 identification (open response) | `sealedResult` returned, decryption successful, all smart signals present |
| JS Agent V4 identification (`endpoints` catch-all) | `event_id` and `sealed_result` returned |
| Server API v4 event response | `sdk.version: "4.1.0"`, integration `fingerprint-pro-fastly-compute v0.4.0-rc.0` |
| V4 sealed result decryption (`/api/decrypt-v4`) | Decrypts successfully, all smart signals present |

## Terraform-managed service

A separate Fastly Compute service was created via the [Terraform module](https://github.com/fingerprintjs/temp-fastly-compute-terraform) to test the Terraform deployment workflow independently from the manually-managed service above.

| Resource | Value |
|---|---|
| Service ID | `52FYzRcQKQzSdcd1MZ7v0M` |
| Domain | `fastly-compute-tf.jurajuhlar.com` |
| Config Store | `Fingerprint_Compute_Config_Store_52FYzRcQKQzSdcd1MZ7v0M` (ID: `gec4z3HxxoIhoaICCbbA71`) |
| Secret Store | `Fingerprint_Compute_Secret_Store_52FYzRcQKQzSdcd1MZ7v0M` (ID: `Op2bbR6ATk8AGR847aKxPv`) |
| TLS Subscription | `RdWLe9lOZIdn3zphTN6ybw` (Let's Encrypt, issued) |
| Version | v0.4.0-rc.0 (upgraded from v0.3.1 on 2026-06-02) |
| Subscription | `SUBS.openResponse` (same as manual service) |

Config: `my-fp-demo/fastly-compute-terraform/main.tf`
Demo pages:
- `src/app/fastly-compute-terraform/page.tsx` — V3 agent
- `src/app/fastly-compute-terraform-v4/page.tsx` — V4 agent

### Setup notes

The Terraform module uses `var.service_id` as a naming suffix for stores (e.g., `Fingerprint_Compute_Config_Store_<service_id>`), but the integration code at runtime looks up stores using `env('FASTLY_SERVICE_ID')` (the actual Fastly service ID). This creates a chicken-and-egg problem: the service ID isn't known until Terraform creates it. The workaround was:

1. Create with a placeholder `service_id` → get actual service ID from Fastly
2. `terraform state rm` the stores
3. Update `service_id` to the actual service ID
4. `terraform apply` to create correctly-named stores

DNS (CNAME to Fastly) and TLS ACME challenge records were added via Cloudflare API (zone `jurajuhlar.com`). Secrets (`PROXY_SECRET`, `DECRYPTION_KEY`) were set via Fastly API.

## Breaking changes in v0.4.0

### Plugin system

| v0.3.x | v0.4.0 |
|---|---|
| `processOpenClientResponse` | `processSealedResult` (new name), `processOpenClientResponse` (deprecated, still works) |
| — | `processIdentificationResponse` (new, for V4 non-sealed responses) |
| `saveToKVStore.ts` | `saveSealedResultToKVStore.ts` (sealed → `Fingerprint_Results_<id>`) |
| — | `saveEventToKVStore.ts` (V4 raw → `Fingerprint_Events_<id>`) |
| `SAVE_TO_KV_STORE_PLUGIN_ENABLED` | `SAVE_SEALED_RESULT_TO_KV_STORE_PLUGIN_ENABLED` (falls back to old key) |
| — | `SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED` (new) |
| `context.event?.products.identification?.data?.requestId` | `getEventId(context.event)` helper (V3/V4 compatible) |

### V4 endpoint config

V4 uses `Fingerprint.start()` with `endpoints` pointing at the integration URL. The catch-all route forwards all unmatched requests to the API origin. Tested with `endpoints: "https://fastly-compute.jurajuhlar.eu?region=us"`.

Test pages: `src/app/fastly-compute-agent-v4/page.tsx` (manual service), `src/app/fastly-compute-terraform-v4/page.tsx` (terraform service)

### V3 path config

`AGENT_SCRIPT_DOWNLOAD_PATH` and `GET_RESULT_PATH` are now optional (V3 only). V4 uses a catch-all default route — all unmatched requests are forwarded to the API origin.

### fpcdn.io backend

No longer used. V3 agent downloads now go through the regional API origin. The `fpcdn.io` backend can be removed from the service dashboard.

## Design context

From [PR #66](https://github.com/fingerprintjs/fastly-compute-proxy/pull/66) and [Slack discussion](https://fingerprintjs.slack.com/archives/C050TKU9X5L/p1779456896435579) (#integrations-internal, 2026-05-22):

### Why were plugins split into two types?

In V3, the JS agent response was obfuscated ("Open Client Response" / OCR removed the obfuscation) and optionally sealed (encrypted). The plugin system only dealt with unsealed data.

In V4, responses are no longer obfuscated, so OCR is irrelevant. But sealed results still exist. This created two distinct data flows:

1. **Sealed results** — customer enables sealed results, proxy decrypts on the edge → `processSealedResult`
2. **Raw identification** — no sealing, response passed as-is → `processIdentificationResponse`

### Was supporting both paths the agreed plan?

**No.** The team discussed this at length. Juraj's recommendation was to keep it sealed-results-only for this release:

> "Product question is: Is this worth doing now or not? It's just a proposal to merge multiple breaking changes into one release. Absent strong motivation/demand, we can also keep the current Sealed results-only plugin API shape for now."

> "I think you can assume the answers are 1) yes 2) **keep current sealed result expectation**. You can adjust your approach later if needed, code is cheaper than calendar time"

Eray implemented both paths anyway in commit `754a35b`, responding to Przemo's PR review comment ("Since open client response is only relevant for v3"). The broader team (Necip, Ilya) had argued that plugins are needed for latency in V4 regardless of sealing, which influenced the decision.

### Key participants

- **Eray Aydın** — implemented the changes
- **Przemysław Żydek** (TheUnderScorer) — PR reviewer, pointed out OCR is V3-only
- **Necip Allefbaşı** — argued plugins needed for V4 latency use case
- **Ilya Taratukhin** — supported unsealing as good DX
- **Martin Makarsky** — OK with breaking changes since V3→V4 is already breaking
- **Juraj Uhlar** — recommended sealed-results-only scope for this release

### Open question

The `processIdentificationResponse` plugin type and `SAVE_EVENT_TO_KV_STORE_PLUGIN_ENABLED` config were shipped but are untested and undocumented from our side. Worth verifying before the stable release whether this path actually works and whether we want to recommend it to customers.
