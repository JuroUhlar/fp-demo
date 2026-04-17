import type { Fingerprint } from '@fingerprint/vue'
import { selectedScenarioKey } from './config'

export type ServerState = {
  serverData: unknown
  serverError: Error | null
  serverLoading: boolean
}

export async function loadServerResult(
  state: ServerState,
  result: Fingerprint.GetResult | null | undefined,
): Promise<void> {
  if (!result) {
    state.serverData = undefined
    state.serverError = null
    return
  }
  state.serverLoading = true
  state.serverError = null
  try {
    state.serverData = await fetchServerResult(result)
  } catch (e) {
    state.serverError = e instanceof Error ? e : new Error(String(e))
    state.serverData = undefined
  } finally {
    state.serverLoading = false
  }
}

export async function fetchServerResult(result: Fingerprint.GetResult): Promise<unknown> {
  const res =
    selectedScenarioKey.value === 'sealed-results' && result.sealed_result
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
