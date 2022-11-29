import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// const defaultData: StartInput = {
//   student: {
//     id: '212638993',
//     fullName: 'מרייה דרגילב',
//     phone: '0523565333',
//     dorm: 'מעונות איינשטיין',
//     building: 'F',
//     floor: '2',
//     apartmentNumber: '105',
//     side: 'ימין',
//   },
//   category: 'פניות בנושא מבקרים',
//   guest: {
//     id: '324173046',
//     fullName: 'עומר כהן',
//     phone: '0543395856',
//   },
// }

const StartInputSchema = z.object({
  student: z.object({
    id: z.string().length(9, 'על הת.ז להכיל 9 מספרים'),
    fullName: z.string(),
    phone: z.string(),
    dorm: z.enum(['מעונות איינשטיין', 'מעונות ברושים']),
    building: z.string(),
    floor: z.string(),
    apartmentNumber: z.string(),
    side: z.enum(['ימין', 'שמאל']),
  }),
  category: z.enum(['פניות בנושא מבקרים', 'פניות בנושא לינה']),
  guest: z.object({
    id: z.string(),
    fullName: z.string(),
    phone: z.string(),
  }),
})
type StartInput = z.infer<typeof StartInputSchema>

interface Props {
  onSubmit: (data: StartInput) => void
}

export default function SavedStartInput(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StartInput>({
    resolver: zodResolver(StartInputSchema),
    defaultValues: {
      student: {
        id: '',
        fullName: '',
        phone: '',
        dorm: undefined,
        building: '',
        floor: '',
        apartmentNumber: '',
        side: undefined,
      },
      category: undefined,
      guest: {
        id: '',
        fullName: '',
        phone: '',
      },
    },
  })

  const onSubmit: SubmitHandler<StartInput> = (data) => props.onSubmit(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="student.id"
        control={control}
        rules={{ required: 'wow' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="ת.ז סטודנט"
            error={!!errors.student?.id}
            helperText={errors.student?.id?.message}
          />
        )}
      />
      <Button variant="contained" type="submit">
        התחלת בקשה
      </Button>
    </form>
  )
}
