import { z } from 'zod'
import { studentSchema } from '../shared'
import { CATEGORIES } from '../../consts'

export const guestCategorySchema = z.enum([
  CATEGORIES.guestVisit,
  CATEGORIES.guestSleep,
])

export const guestSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string(),
})

export const guestInputSchema = z.object({
  category: guestCategorySchema,
  student: studentSchema,
  guest: guestSchema,
})

export type GuestInput = z.infer<typeof guestInputSchema>
