import { unsealResult } from '@shared/server'

export default defineEventHandler(async (event) => {
  const { sealed } = await readBody<{ sealed?: string }>(event)
  if (!sealed) throw createError({ statusCode: 400, statusMessage: 'sealed required' })
  return unsealResult(sealed)
})
