import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// components
import ControlledTextField from '../hook-form/ControlledTextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ControlledSelect from '../hook-form/ControlledSelect'
import { useEffect } from 'react'

const StudentSchema = z.object({
  id: z.string().trim().length(9, 'נדרש להזין מספר ת.ז תקין'),
  fullName: z.string().trim().min(1, 'נדרש להזין שם מלא'),
  phone: z.string().trim().length(10, 'נדרש להזין מספר טלפון תקין'),
  dorm: z.enum(['מעונות איינשטיין', 'מעונות ברושים'], {
    required_error: 'נדרש לבחור מעון',
  }),
  building: z
    .string()
    .trim()
    .length(1, 'נדרש להזין מזהה בניין תקין')
    .transform((val) => val.toUpperCase()),
  floor: z.string().trim().min(1, 'נדרש להזין קומה'),
  apartmentNumber: z.string().trim().min(1, 'נדרש להזין מספר דירה'),
  side: z.enum(['ימין', 'שמאל'], { required_error: 'נדרש לבחור צד' }),
})

export type Student = z.infer<typeof StudentSchema>

export const DEFAULT = {
  id: '',
  fullName: '',
  phone: '',
  dorm: undefined,
  building: '',
  floor: '',
  apartmentNumber: '',
  side: undefined,
}

interface Props {
  defaultValues?: Student
  onSubmit: (data: Student) => void
  open: boolean
  handleClose: () => void
}

export default function StudentModal(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Student>({
    resolver: zodResolver(StudentSchema),
  })

  const onSubmit: SubmitHandler<Student> = (data) => {
    props.onSubmit(data)
    resetForm()
  }

  const resetForm = () => {
    props.handleClose()
    reset(props.defaultValues)
  }

  useEffect(() => {
    reset(props.defaultValues || DEFAULT)
  }, [props.defaultValues])

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>שמירת סטודנט</DialogTitle>
        <DialogContent>
          <DialogContentText>נא להזין פרטי סטודנט</DialogContentText>
          <Box display="flex" flexDirection="column">
            <Controller
              name="id"
              control={control}
              render={({ field }) => (
                <ControlledTextField
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
                <ControlledTextField
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
                <ControlledTextField
                  type="number"
                  field={field}
                  label="טלפון"
                  error={errors.phone}
                />
              )}
            />
            <Controller
              name="dorm"
              control={control}
              render={({ field }) => (
                <ControlledSelect
                  values={['מעונות איינשטיין', 'מעונות ברושים']}
                  field={field}
                  label="מעון"
                  error={errors.dorm}
                />
              )}
            />
            <Controller
              name="building"
              control={control}
              render={({ field }) => (
                <ControlledTextField
                  field={field}
                  label="בניין"
                  error={errors.building}
                />
              )}
            />
            <Controller
              name="floor"
              control={control}
              render={({ field }) => (
                <ControlledTextField
                  type="number"
                  field={field}
                  label="קומה"
                  error={errors.floor}
                />
              )}
            />
            <Controller
              name="apartmentNumber"
              control={control}
              render={({ field }) => (
                <ControlledTextField
                  type="number"
                  field={field}
                  label="מספר דירה"
                  error={errors.apartmentNumber}
                />
              )}
            />
            <Controller
              name="side"
              control={control}
              render={({ field }) => (
                <ControlledSelect
                  values={['ימין', 'שמאל']}
                  field={field}
                  label="צד"
                  error={errors.side}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={resetForm}>
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
