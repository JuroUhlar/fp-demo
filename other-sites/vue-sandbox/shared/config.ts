import { ref, watch, type Ref } from 'vue'
import type { Fingerprint } from '@fingerprint/vue'

const MAIN_API_KEY = '2UZgp3skqLzfJpFUGUrw'
const SEALED_API_KEY = 'Xxcooa8Yc0MaSEo9VQDy'
const REGION = 'eu' as const
export const DEFAULT_LINKED_ID = 'user_1234'
export const DEFAULT_TAG = 'signup'

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

function persistedRef<T>(key: string, fallback: T, isValid: (v: unknown) => v is T): Ref<T> {
  const initial =
    typeof localStorage === 'undefined'
      ? fallback
      : (() => {
          const raw = localStorage.getItem(key)
          const parsed = raw === 'true' ? true : raw === 'false' ? false : raw
          return isValid(parsed) ? parsed : fallback
        })()
  const r = ref(initial) as Ref<T>
  if (typeof window !== 'undefined') {
    watch(r, (v) => localStorage.setItem(key, String(v)), { flush: 'sync' })
  }
  return r
}

const isBool = (v: unknown): v is boolean => typeof v === 'boolean'
const isString = (v: unknown): v is string => typeof v === 'string'
const isOneOf =
  <T extends string>(options: readonly T[]) =>
  (v: unknown): v is T =>
    typeof v === 'string' && (options as readonly string[]).includes(v)

export const cacheEnabled = persistedRef('fp-sandbox-cache-enabled', false, isBool)
export const cacheStorage = persistedRef<CacheStorage>(
  'fp-sandbox-cache-storage',
  'localStorage',
  isOneOf(cacheStorageOptions),
)
export const cacheDuration = persistedRef<CacheDurationPreset>(
  'fp-sandbox-cache-duration',
  'optimize-cost',
  isOneOf(cacheDurationOptions),
)
export const commonLinkedId = persistedRef('fp-sandbox-linked-id', DEFAULT_LINKED_ID, isString)
export const commonTag = persistedRef('fp-sandbox-tag', DEFAULT_TAG, isString)

export const startOptionsScenarios = [
  {
    key: 'default',
    title: 'Default',
    startOptions: { apiKey: MAIN_API_KEY, region: REGION },
  },
  {
    key: 'sealed-results',
    title: 'Sealed result',
    startOptions: { apiKey: SEALED_API_KEY, region: REGION },
  },
  {
    key: 'incremental-identification',
    title: 'Incremental identification',
    startOptions: {
      apiKey: MAIN_API_KEY,
      region: REGION,
      // @ts-expect-error Experimental option used for sandbox testing.
      optimizeRepeatedVisits: true,
    },
  },
] as const satisfies readonly {
  key: string
  title: string
  startOptions: Fingerprint.StartOptions
}[]

export type ScenarioKey = typeof startOptionsScenarios[number]['key']

const scenarioKeys = startOptionsScenarios.map((s) => s.key) as readonly ScenarioKey[]
export const selectedScenarioKey = persistedRef<ScenarioKey>(
  'fp-sandbox-scenario-key',
  startOptionsScenarios[0].key,
  isOneOf(scenarioKeys),
)

export function getBootStartOptions(): Fingerprint.StartOptions {
  const base =
    startOptionsScenarios.find((s) => s.key === selectedScenarioKey.value)?.startOptions ??
    startOptionsScenarios[0].startOptions
  if (!cacheEnabled.value) return { ...base }
  return {
    ...base,
    cache: { storage: cacheStorage.value, duration: cacheDuration.value },
  }
}

export function getCommonGetOptions(): Fingerprint.GetOptions {
  const linkedId = commonLinkedId.value.trim()
  const tag = commonTag.value.trim()

  return {
    ...(linkedId ? { linkedId } : {}),
    ...(tag ? { tag } : {}),
  }
}

export function toDisplayResult(raw: Fingerprint.GetResult | null | undefined) {
  if (!raw) return undefined
  return { ...raw, sealed_result: raw.sealed_result?.base64() ?? null }
}
