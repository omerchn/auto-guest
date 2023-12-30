import { procedure } from '../../trpc'
import { captchaInitDataSchema } from '../shared'
import { createMaintenanceRequest } from './maintenance.methods'
import { maintenanceInputSchema } from './maintenance.types'

export const maintenance = procedure
  .input(maintenanceInputSchema)
  .output(captchaInitDataSchema)
  .mutation(({ input }) => createMaintenanceRequest(input))
