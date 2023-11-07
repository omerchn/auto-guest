import { z } from 'zod'

export const SolveInputSchema = z.object({
  pageId: z.string(),
  answer: z.string(),
})

export type SolveInput = z.infer<typeof SolveInputSchema>

export const SolveOutputSchema = z.object({
  message: z.string(),
  type: z.enum(['success', 'failure']),
})

export type SolveOutput = z.infer<typeof SolveOutputSchema>
