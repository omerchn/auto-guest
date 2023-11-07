import { procedure } from '../../trpc'
import { solveCaptchaAndSubmit } from './solve.methods'
import { SolveInputSchema, SolveOutputSchema } from './solve.types'

export const solve = procedure
  .input(SolveInputSchema)
  .output(SolveOutputSchema)
  .mutation(({ input }) => solveCaptchaAndSubmit(input))
