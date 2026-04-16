import { ref, watch } from 'vue'
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

export type CacheStorage = 'localStorage' | 'sessionStorage' | 'agent'
export type CacheDurationPreset = 'optimize-cost' | 'aggressive'

export const cacheStorageOptions: readonly CacheStorage[] = [
  'localStorage',
  'sessionStorage',
  'agent',
] as const

export const cacheDurationOptions: readonly CacheDurationPreset[] = [
  'optimize-cost',
  'aggressive',
] as const

const CACHE_ENABLED_KEY = 'fp-sandbox-cache-enabled'
const CACHE_STORAGE_KEY = 'fp-sandbox-cache-storage'
const CACHE_DURATION_KEY = 'fp-sandbox-cache-duration'

function readCacheEnabled(): boolean {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem(CACHE_ENABLED_KEY) === 'true'
}

function readCacheStorage(): CacheStorage {
  if (typeof localStorage === 'undefined') return 'localStorage'
  const value = localStorage.getItem(CACHE_STORAGE_KEY)
  return cacheStorageOptions.includes(value as CacheStorage)
    ? (value as CacheStorage)
    : 'localStorage'
}

function readCacheDuration(): CacheDurationPreset {
  if (typeof localStorage === 'undefined') return 'optimize-cost'
  const value = localStorage.getItem(CACHE_DURATION_KEY)
  return cacheDurationOptions.includes(value as CacheDurationPreset)
    ? (value as CacheDurationPreset)
    : 'optimize-cost'
}

export const cacheEnabled = ref(readCacheEnabled())
export const cacheStorage = ref<CacheStorage>(readCacheStorage())
export const cacheDuration = ref<CacheDurationPreset>(readCacheDuration())

if (typeof window !== 'undefined') {
  watch(
    cacheEnabled,
    (value) => localStorage.setItem(CACHE_ENABLED_KEY, String(value)),
    { flush: 'sync' },
  )
  watch(
    cacheStorage,
    (value) => localStorage.setItem(CACHE_STORAGE_KEY, value),
    { flush: 'sync' },
  )
  watch(
    cacheDuration,
    (value) => localStorage.setItem(CACHE_DURATION_KEY, value),
    { flush: 'sync' },
  )
}

export function withCache(
  base: Fingerprint.StartOptions,
): Fingerprint.StartOptions {
  if (!cacheEnabled.value) {
    const { cache: _cache, ...rest } = base
    return rest
  }
  return {
    ...base,
    cache: {
      storage: cacheStorage.value,
      duration: cacheDuration.value,
    },
  }
}

export const defaultStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.main.publicApiKey,
  region: fingerprintConfig.main.region,
}

export const sealedResultsStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.sealedResults.publicApiKey,
  region: fingerprintConfig.sealedResults.region,
}

export const incrementalIdentificationStartOptions: Fingerprint.StartOptions = {
  apiKey: fingerprintConfig.main.publicApiKey,
  region: fingerprintConfig.main.region,
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
