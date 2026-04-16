import type { Fingerprint } from '@fingerprint/vue'

declare const process:
  | {
      env: Record<string, string | undefined>
    }
  | undefined

type ServerEnvName = 'FP_SECRET_API_KEY' | 'FP_SEALED_RESULTS_SECRET_KEY'

function readServerEnv(name: ServerEnvName): string {
  if (typeof process === 'undefined') {
    throw new Error(`${name} is only available in a server environment`)
  }

  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing ${name}. Add it to other-sites/vue-sandbox/.env`)
  }

  return value
}

export const fingerprintConfig = {
  main: {
    publicApiKey: '2UZgp3skqLzfJpFUGUrw',
    region: 'eu' as const,
    get secretApiKey() {
      return readServerEnv('FP_SECRET_API_KEY')
    },
  },
  sealedResults: {
    publicApiKey: 'Xxcooa8Yc0MaSEo9VQDy',
    region: 'eu' as const,
    get secretKey() {
      return readServerEnv('FP_SEALED_RESULTS_SECRET_KEY')
    },
  },
} as const

export const globalCacheOptions: Fingerprint.StartOptions['cache'] = {
  storage: 'localStorage',
  duration: 1800,
}

export const defaultStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.main.publicApiKey,
  region: fingerprintConfig.main.region,
  cache: globalCacheOptions,
}

export const sealedResultsStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.sealedResults.publicApiKey,
  region: fingerprintConfig.sealedResults.region,
  cache: globalCacheOptions,
}

export const incrementalIdentificationStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.main.publicApiKey,
  region: fingerprintConfig.main.region,
  cache: globalCacheOptions,
  // @ts-expect-error Experimental option used for sandbox testing.
  optimizeRepeatedVisits: true,
}

export const startOptionsScenarios = [
  {
    key: 'default',
    title: 'Default',
    subtitle: 'normal API key',
    startOptions: defaultStartOptions,
  },
  {
    key: 'sealed-results',
    title: 'Sealed result',
    subtitle: 'sealed API key',
    startOptions: sealedResultsStartOptions,
  },
  {
    key: 'incremental-identification',
    title: 'Incremental identification',
    subtitle: 'normal API key + optimizeRepeatedVisits',
    startOptions: incrementalIdentificationStartOptions,
  },
] as const

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
