import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// components
import ControlledTextField from '../form/ControlledTextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import ControlledSelect from '../form/ControlledSelect'
import Grow from '@mui/material/Grow'
import { TransitionProps } from '@mui/material/transitions'
import { useStudentOptions } from '../../hooks/useStudentOptions'
import { Student, StudentSchema } from './types'
import { DEFAULT } from './consts'
import { useDocumentState } from '../../hooks/document-state'
import { getTranslatedDormName } from './utils'

interface Props {
  defaultValues?: Student
  open: boolean
  onClose: () => void
  onSubmit: (student: Student) => void
}

export default function StudentModal(props: Props) {
  const { t, i18n } = useTranslation()
  const form = useForm<Student>({
    resolver: zodResolver(StudentSchema),
    mode: 'onBlur',
  })

  const { resetSubToMain, mergeSubToMain } = useDocumentState()
  const { options, isFetching, setValues, resetOptions } = useStudentOptions()

  const handleSelectChange = (key: keyof Student, value: string) => {
    setValues({ [key]: value })
  }

  const handleSubmit: SubmitHandler<Student> = (data) => {
    mergeSubToMain()
    resetAndClose()
    props.onSubmit(data)
  }

  const resetAndClose = () => {
    resetSubToMain()
    resetOptions()
    form.reset(props.defaultValues)
    props.onClose()
  }

  useEffect(() => {
    form.reset(props.defaultValues || DEFAULT)
  }, [props.defaultValues])

  return (
    <Dialog open={props.open} TransitionComponent={Transition}>
      <Box component="form" onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogTitle>{t('student.details')}</DialogTitle>
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
            <Controller
              name="dorm"
              control={form.control}
              render={({ field }) => (
                <ControlledSelect
                  options={options?.dorm ?? []}
                  field={field}
                  label={t('fields.dorm')}
                  error={form.formState.errors.dorm}
                  onChange={handleSelectChange}
                  isLoading={isFetching}
                  transformLabel={getTranslatedDormName(i18n.language)}
                />
              )}
            />
            <Controller
              name="building"
              control={form.control}
              render={({ field }) => (
                <ControlledSelect
                  options={options?.building ?? []}
                  field={field}
                  label={t('fields.building')}
                  error={form.formState.errors.building}
                  onChange={handleSelectChange}
                  isLoading={isFetching}
                />
              )}
            />
            <Controller
              name="floor"
              control={form.control}
              render={({ field }) => (
                <ControlledSelect
                  options={options?.floor ?? []}
                  field={field}
                  label={t('fields.floor')}
                  error={form.formState.errors.floor}
                  onChange={handleSelectChange}
                  isLoading={isFetching}
                />
              )}
            />
            <Controller
              name="unit"
              control={form.control}
              render={({ field }) => (
                <ControlledSelect
                  options={options?.unit ?? []}
                  field={field}
                  label={t('fields.apartment')}
                  error={form.formState.errors.unit}
                  onChange={handleSelectChange}
                  isLoading={isFetching}
                />
              )}
            />
            <Controller
              name="side"
              control={form.control}
              render={({ field }) => (
                <ControlledSelect
                  options={options?.side ?? []}
                  field={field}
                  label={t('fields.side')}
                  error={form.formState.errors.side}
                  onChange={handleSelectChange}
                  isLoading={isFetching}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={resetAndClose}>
            {t('button.cancel')}
          </Button>
          <Button
            variant="outlined"
            type="submit"
            disabled={!form.formState.isDirty}
          >
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
