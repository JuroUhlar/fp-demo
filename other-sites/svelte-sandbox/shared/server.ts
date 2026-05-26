import { resolve } from 'node:path'
import {
  DecryptionAlgorithm,
  FingerprintServerApiClient,
  Region,
  unsealEventsResponse,
  type Event,
} from '@fingerprint/node-sdk'

// Dev servers run with cwd = spa/ or kit/; the shared .env sits one level up.
// import.meta.url is unreliable here because bundlers may rewrite this module out of tree.
const envFile = resolve(process.cwd(), '..', '.env')
try {
  // Node 20.6+ — older @types/node used by some tooling don't know the method yet.
  ;(process as NodeJS.Process & { loadEnvFile(p: string): void }).loadEnvFile(envFile)
} catch {
  // Node < 20.6 or .env missing — fail loudly at request time instead.
}

function env(name: 'FP_SECRET_API_KEY' | 'FP_SEALED_RESULTS_SECRET_KEY'): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name} in ${envFile}`)
  return value
}

let clientSingleton: FingerprintServerApiClient | undefined
function client(): FingerprintServerApiClient {
  return (clientSingleton ??= new FingerprintServerApiClient({
    apiKey: env('FP_SECRET_API_KEY'),
    region: Region.EU,
  }))
}

export function fetchIdentification(eventId: string): Promise<Event> {
  return client().getEvent(eventId)
}

export async function unsealResult(sealedBase64: string): Promise<Event> {
  return unsealEventsResponse(Buffer.from(sealedBase64, 'base64'), [
    {
      key: Buffer.from(env('FP_SEALED_RESULTS_SECRET_KEY'), 'base64'),
      algorithm: DecryptionAlgorithm.Aes256Gcm,
    },
  ])
}
