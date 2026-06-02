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
