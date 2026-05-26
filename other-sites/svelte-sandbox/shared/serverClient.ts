import type { Fingerprint } from '@fingerprint/svelte'
import { get } from 'svelte/store'
import { selectedScenarioKey } from './config'

export const serverResultDisabled =
  typeof import.meta !== 'undefined' &&
  Boolean((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_DISABLE_SERVER_RESULT)

export const serverResultDisabledNote =
  'Server result unavailable in static SPA deployment.'

export async function fetchServerResult(result: Fingerprint.GetResult): Promise<unknown> {
  const scenarioKey = get(selectedScenarioKey)
  const res =
    scenarioKey === 'sealed-results' && result.sealed_result
      ? await fetch('/api/unseal', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ sealed: result.sealed_result.base64() }),
        })
      : await fetch(`/api/identification/${encodeURIComponent(result.event_id)}`)
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body?.error ?? res.statusText)
  return body
}
