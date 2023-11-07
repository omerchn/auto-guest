import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// components
import ControlledTextField from '../form/ControlledTextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Grow from '@mui/material/Grow'
import { TransitionProps } from '@mui/material/transitions'

const GuestSchema = z.object({
  id: z.string().trim().min(1, 'יש להזין מספר ת.ז'),
  fullName: z.string().trim().min(1, 'יש להזין שם מלא'),
  phone: z.string().trim().min(1, 'יש להזין מספר טלפון'),
})

export type Guest = z.infer<typeof GuestSchema>

const DEFAULT: Partial<Guest> = {
  id: '',
  fullName: '',
  phone: '',
}

interface Props {
  defaultValues?: Guest
  onSubmit: (data: Guest) => void
  open: boolean
  onClose: () => void
}

export default function GuestModal(props: Props) {
  const form = useForm<Guest>({
    resolver: zodResolver(GuestSchema),
  })

  const handleSubmit: SubmitHandler<Guest> = (data) => {
    props.onSubmit(data)
    resetAndClose()
  }

  const resetAndClose = () => {
    form.reset(props.defaultValues)
    props.onClose()
  }

  useEffect(() => {
    form.reset(props.defaultValues || DEFAULT)
  }, [props.defaultValues])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>שמירת אורח</DialogTitle>
        <DialogContent>
          <DialogContentText>נא להזין פרטי אורח</DialogContentText>
          <Box display="flex" flexDirection="column">
            <Controller
              name="id"
              control={form.control}
              render={({ field }) => (
                <ControlledTextField
                  type="number"
                  field={field}
                  label="ת.ז"
                  error={form.formState.errors.id}
                />
              )}
            />
            <Controller
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <ControlledTextField
                  field={field}
                  label="שם מלא"
                  error={form.formState.errors.fullName}
                />
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <ControlledTextField
                  type="number"
                  field={field}
                  label="טלפון"
                  error={form.formState.errors.phone}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={resetAndClose}>
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />
})
