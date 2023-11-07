import { procedure } from '../../trpc'
import { openGuestRequest } from './open.methods'
import { openInputSchema, openOutputSchema } from './open.types'

export const open = procedure
  .input(openInputSchema)
  .output(openOutputSchema)
  .mutation(({ input }) => openGuestRequest(input))
