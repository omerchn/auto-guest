import { z } from 'zod'

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

export type Student = z.infer<typeof studentSchema>

export const captchaInitDataSchema = z.object({
  pageId: z.string(),
  captchaImgPath: z.string(),
})

export type CaptchaInitData = z.infer<typeof captchaInitDataSchema>
