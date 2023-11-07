import { z } from 'zod'

export const StudentSchema = z.object({
  id: z.string().trim().min(1, 'יש להזין מספר ת.ז'),
  fullName: z.string().trim().min(1, 'יש להזין שם מלא'),
  phone: z.string().trim().min(1, 'יש להזין מספר טלפון'),
  dorm: z.string().trim().min(1, 'יש לבחור מעון'),
  building: z.string().trim().min(1, 'יש לבחור בניין'),
  floor: z.string().trim().min(1, 'יש לבחור קומה'),
  unit: z.string().trim().min(1, 'יש לבחור מספר דירה'),
  side: z.string().optional(),
})

export type Student = z.infer<typeof StudentSchema>
