import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { unsealResult } from '@shared/server'

export const POST: RequestHandler = async ({ request }) => {
  const { sealed } = await request.json() as { sealed?: string }
  if (!sealed) throw error(400, 'sealed required')
  try {
    const result = await unsealResult(sealed)
    return json(result)
  } catch (e) {
    throw error(500, e instanceof Error ? e.message : String(e))
  }
}
