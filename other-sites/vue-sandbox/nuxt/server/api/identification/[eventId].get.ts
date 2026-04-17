import { fetchIdentification } from '@shared/server'

export default defineEventHandler(async (event) => {
  const eventId = getRouterParam(event, 'eventId')
  if (!eventId) throw createError({ statusCode: 400, statusMessage: 'eventId required' })
  return fetchIdentification(eventId)
})
