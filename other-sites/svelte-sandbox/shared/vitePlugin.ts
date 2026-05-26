import type { IncomingMessage, ServerResponse } from 'node:http'

export function sandboxApi() {
  return {
    name: 'svelte-sandbox-api' as const,
    configureServer(server: { middlewares: { use(fn: Function): void } }) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        try {
          const url = req.url ?? ''
          const { fetchIdentification, unsealResult } = await import('./server')

          const idMatch = req.method === 'GET' && url.match(/^\/api\/identification\/([^/?]+)/)
          if (idMatch) return json(res, await fetchIdentification(idMatch[1]))

          if (req.method === 'POST' && url.startsWith('/api/unseal')) {
            const { sealed } = await readJson<{ sealed?: string }>(req)
            if (!sealed) return fail(res, 400, 'sealed required')
            return json(res, await unsealResult(sealed))
          }
          next()
        } catch (error) {
          fail(res, 500, error instanceof Error ? error.message : String(error))
        }
      })
    },
  }
}

function json(res: ServerResponse, body: unknown) {
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify(body))
}
function fail(res: ServerResponse, code: number, message: string) {
  res.statusCode = code
  json(res, { error: message })
}
async function readJson<T>(req: IncomingMessage): Promise<T> {
  req.setEncoding('utf8')
  let text = ''
  for await (const chunk of req) text += chunk
  return JSON.parse(text || '{}') as T
}
