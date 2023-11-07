import { router } from './trpc'
import { options } from './procedures/options'
import { open } from './procedures/open'
import { solve } from './procedures/solve'

export const appRouter = router({
  options,
  open,
  solve,
})

export type AppRouter = typeof appRouter
