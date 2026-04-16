import type { Fingerprint, FingerprintPluginOptions } from '@fingerprint/vue'

// SUBS.main — see /src/constants.ts. We intentionally don't send the custom subdomain
// (fp.jurajuhlar.eu) because it blocks localhost origins. The default Fingerprint endpoint
// is fine for sandbox testing.
export const MAIN_API_KEY = '2UZgp3skqLzfJpFUGUrw'

export const mainPluginOptions: FingerprintPluginOptions = {
  apiKey: MAIN_API_KEY,
  region: 'eu',
}

export function summarizeVisitorData(result?: Fingerprint.GetResult) {
  if (!result) {
    return undefined
  }

  return {
    event_id: result.event_id,
    visitor_id: result.visitor_id ?? '(absent)',
    suspect_score: result.suspect_score ?? null,
    sealed_result: result.sealed_result ? 'available' : null,
    cache_hit: result.cache_hit ?? null,
  }
}
