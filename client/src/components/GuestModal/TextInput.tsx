import { HTMLInputTypeAttribute } from 'react'
import { FieldError } from 'react-hook-form'

// components
import TextField from '@mui/material/TextField'

interface FieldProps {
  field: object
  type?: HTMLInputTypeAttribute
  label: string
  error: FieldError | undefined
}

export default function TextInput(props: FieldProps) {
  return (
    <TextField
      variant="standard"
      {...props.field}
      type={props.type}
      label={props.label}
      error={!!props.error}
      helperText={props.error?.message}
    />
  )
}
