import { z } from 'zod'
import { t } from 'i18next'

export const StudentSchema = z.object({
  id: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.id_error') })
    ),
  fullName: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.full_name_error') })
    ),
  phone: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.phone_error') })
    ),
  dorm: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.dorm_error') })
    ),
  building: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.building_error') })
    ),
  floor: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.floor_error') })
    ),
  unit: z
    .string()
    .trim()
    .refine(
      (input) => !!input,
      () => ({ message: t('fields.apartment_error') })
    ),
  side: z.string().optional(),
})

export type Student = z.infer<typeof StudentSchema>
