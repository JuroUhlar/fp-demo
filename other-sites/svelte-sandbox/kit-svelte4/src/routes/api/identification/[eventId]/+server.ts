import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { fetchIdentification } from '@shared/server'

export const GET: RequestHandler = async ({ params }) => {
  const eventId = params.eventId
  if (!eventId) throw error(400, 'eventId required')
  try {
    const result = await fetchIdentification(eventId)
    return json(result)
  } catch (e) {
    throw error(500, e instanceof Error ? e.message : String(e))
  }
}
