import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
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
import Grow from '@mui/material/Grow'
import { TransitionProps } from '@mui/material/transitions'

const GuestSchema = z.object({
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
  const { t } = useTranslation()
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

  const handleClose = () => {
    form.clearErrors()
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t('guest.details')}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <Controller
              name="id"
              control={form.control}
              render={({ field }) => (
                <ControlledTextField
                  type="number"
                  field={field}
                  label={t('fields.id')}
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
                  label={t('fields.full_name')}
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
                  label={t('fields.phone')}
                  error={form.formState.errors.phone}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={resetAndClose}>
            {t('button.cancel')}
          </Button>
          <Button variant="outlined" type="submit">
            {t('button.save')}
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
