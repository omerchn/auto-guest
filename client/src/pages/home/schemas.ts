import { z } from 'zod'

export const guestCategorySchema = z.enum([
  'פניות בנושא מבקרים',
  'פניות בנושא לינה',
])

export const maintenanceCategorySchema = z.enum(['פניות בנושאי תחזוקה'])

export const categorySchema = z.enum([
  ...guestCategorySchema.options,
  ...maintenanceCategorySchema.options,
])
