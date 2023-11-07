import { z } from 'zod'

export const categorySchema = z.enum(['פניות בנושא לינה', 'פניות בנושא מבקרים'])

export const studentSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string(),
  dorm: z.string(),
  building: z.string(),
  floor: z.string(),
  unit: z.string(),
  side: z.string().optional(),
})

export const guestSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  phone: z.string(),
})

export const openInputSchema = z.object({
  category: categorySchema,
  student: studentSchema,
  guest: guestSchema,
})

export type Category = z.infer<typeof categorySchema>
export type Student = z.infer<typeof studentSchema>
export type Guest = z.infer<typeof guestSchema>
export type OpenInput = z.infer<typeof openInputSchema>

export const openOutputSchema = z.object({
  pageId: z.string(),
  captchaImgPath: z.string(),
})

export type StartOutput = z.infer<typeof openOutputSchema>
