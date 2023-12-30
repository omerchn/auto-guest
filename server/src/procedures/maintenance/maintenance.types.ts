import { z } from 'zod'
import { CATEGORIES } from '../../consts'
import { studentSchema } from '../shared'

export const maintenanceCategorySchema = z.enum([CATEGORIES.maintenance])

export const maintenanceInputSchema = z.object({
  category: maintenanceCategorySchema,
  student: studentSchema,
  text: z.string(),
})

export type MaintenanceInput = z.infer<typeof maintenanceInputSchema>
