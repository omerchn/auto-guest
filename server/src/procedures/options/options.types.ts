import { z } from 'zod'

export const optionsInputSchema = z.object({
  viewState: z.string().optional(),
  eventValidation: z.string().optional(),
  values: z
    .object({
      dorm: z.string().optional(),
      building: z.string().optional(),
      floor: z.string().optional(),
      unit: z.string().optional(),
      side: z.string().optional(),
    })
    .optional(),
})

export type OptionsInput = z.infer<typeof optionsInputSchema>
export type OptionsInputKey = keyof OptionsInput

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export const optionsSchema = z.object({
  dorm: z.array(optionSchema),
  building: z.array(optionSchema),
  floor: z.array(optionSchema),
  unit: z.array(optionSchema),
  side: z.array(optionSchema),
})

export const optionsOutputSchema = z.object({
  viewState: z.string(),
  eventValidation: z.string(),
  options: optionsSchema,
})

export type Options = z.infer<typeof optionsSchema>
export type OptionsKey = keyof Options
