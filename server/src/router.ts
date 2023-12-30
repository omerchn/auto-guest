import { router } from './trpc'
import { options } from './procedures/options'
import { guest } from './procedures/guest'
import { solve } from './procedures/solve'
import { maintenance } from './procedures/maintenance'

export const appRouter = router({
  options,
  guest,
  solve,
  maintenance,
})

export type AppRouter = typeof appRouter
