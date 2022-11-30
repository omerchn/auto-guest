import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// components
import TextInput from './TextInput'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// const StartInputSchema = z.object({
//   student: z.object({
//     id: z.string().length(9, 'על הת.ז להכיל 9 תווים'),
//     fullName: z.string(),
//     phone: z.string(),
//     dorm: z.enum(['מעונות איינשטיין', 'מעונות ברושים']),
//     building: z.string(),
//     floor: z.string(),
//     apartmentNumber: z.string(),
//     side: z.enum(['ימין', 'שמאל']),
//   }),
//   category: z.enum(['פניות בנושא מבקרים', 'פניות בנושא לינה']),
//   guest: z.object({
//     id: z.string().length(9, 'על הת.ז להכיל 9 תווים'),
//     fullName: z.string().min(1, 'נדרש להזין שם מלא'),
//     phone: z.string().min(1, 'נדרש להזין מספר טלפון'),
//   }),
// })

const GuestSchema = z.object({
  id: z.string().length(9, 'על הת.ז להכיל 9 תווים'),
  fullName: z.string().min(1, 'נדרש להזין שם מלא'),
  phone: z.string().min(1, 'נדרש להזין מספר טלפון'),
})

export type Guest = z.infer<typeof GuestSchema>

interface Props {
  defaultValues?: Guest
  onSubmit: (data: Guest) => void
  open: boolean
  handleClose: () => void
}

export default function InputModal(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Guest>({
    resolver: zodResolver(GuestSchema),
    defaultValues: props.defaultValues || {
      id: '',
      fullName: '',
      phone: '',
    },
  })

  const onSubmit: SubmitHandler<Guest> = (data) => {
    props.onSubmit(data)
    props.handleClose()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>שמירת אורח</DialogTitle>
        <DialogContent>
          <DialogContentText>נא להזין פרטי אורח</DialogContentText>
          <Box display="flex" flexDirection="column">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <TextInput
                  type="number"
                  field={field}
                  label="ת.ז"
                  error={errors.id}
                />
              )}
            />
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextInput
                  field={field}
                  label="שם מלא"
                  error={errors.fullName}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextInput
                  type="number"
                  field={field}
                  label="טלפון"
                  error={errors.phone}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={props.handleClose}>
            ביטול
          </Button>
          <Button variant="outlined" type="submit">
            שמירה
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
