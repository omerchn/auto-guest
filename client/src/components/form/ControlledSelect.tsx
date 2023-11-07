import { ControllerRenderProps, FieldError } from 'react-hook-form'

// components
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import LinearProgress from '@mui/material/LinearProgress'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import { useRef } from 'react'
import { Student } from '../StudentModal/types'

interface FieldProps<TName extends keyof Student> {
  options: Array<{ label: string; value: string }>
  field: ControllerRenderProps<Student, TName>
  label: string
  error: FieldError | undefined
  disabled?: boolean
  onChange?: (name: keyof Student, value: string) => void
  isLoading?: boolean
}

export default function ControlledSelect<TName extends keyof Student>(
  props: FieldProps<TName>
) {
  const prevValue = useRef(props.field.value ?? '')

  const getDefault = () => {
    if (prevValue.current !== '') {
      prevValue.current = ''
      props.onChange?.(props.field.name, '')
    }
    return ''
  }

  const getValue = () =>
    props.options.some((opt) => opt.label === props.field.value)
      ? props.field.value
      : getDefault()

  const isDisabled =
    props.options.length === 0 ||
    (props.options.length === 1 && props.options[0].value.trim() === '')

  return (
    <FormControl error={!!props.error} sx={{ marginTop: '1em' }}>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select
        variant="standard"
        {...props.field}
        onChange={(event) => {
          const label = event.target.value
          prevValue.current = label ?? ''
          props.field.onChange(label)
          props.field.onBlur()
          const value = props.options.find((opt) => opt.label === label)?.value
          props.onChange?.(props.field.name, value ?? '')
        }}
        value={getValue()}
        label={props.label}
        labelId={props.label}
        disabled={isDisabled || props.isLoading}
        IconComponent={(() => {
          if (isDisabled) return () => null
          return undefined
        })()}
      >
        {props.options
          .filter((opt) => !!opt.value.trim())
          .map((opt) => (
            <MenuItem key={opt.value} value={opt.label}>
              {opt.label}
            </MenuItem>
          ))}
      </Select>
      <Box sx={{ position: 'relative', width: '100%', overflow: 'visible' }}>
        <Fade appear in={props.isLoading}>
          <LinearProgress
            sx={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '2px',
            }}
          />
        </Fade>
      </Box>
      {!!props.error && <FormHelperText>{props.error?.message}</FormHelperText>}
    </FormControl>
  )
}
