import { useEffect } from 'react'
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

const GuestSchema = z.object({
  id: z.string().trim().length(9, 'יש להזין מספר ת.ז תקין'),
  fullName: z.string().trim().min(1, 'יש להזין שם מלא'),
  phone: z.string().trim().length(10, 'יש להזין מספר טלפון תקין'),
})

export type Guest = z.infer<typeof GuestSchema>

export const DEFAULT = {
  id: '',
  fullName: '',
  phone: '',
}

interface Props {
  defaultValues?: Guest
  onSubmit: (data: Guest) => void
  open: boolean
  handleClose: () => void
}

export default function GuestModal(props: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Guest>({
    resolver: zodResolver(GuestSchema),
  })

  const onSubmit: SubmitHandler<Guest> = (data) => {
    props.onSubmit(data)
    props.handleClose()
    reset()
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
        <DialogTitle>שמירת אורח</DialogTitle>
        <DialogContent>
          <DialogContentText>נא להזין פרטי אורח</DialogContentText>
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
