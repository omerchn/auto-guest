import { procedure } from '../../trpc'
import { captchaInitDataSchema } from '../shared'
import { createGuestRequest } from './guest.methods'
import { guestInputSchema } from './guest.types'

export const guest = procedure
  .input(guestInputSchema)
  .output(captchaInitDataSchema)
  .mutation(({ input }) => createGuestRequest(input))
