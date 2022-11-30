import { ControllerRenderProps, FieldError } from 'react-hook-form'

// components
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

interface FieldProps {
  values: Array<string>
  field: ControllerRenderProps<any, any>
  label: string
  error: FieldError | undefined
}

export default function ControlledSelect(props: FieldProps) {
  return (
    <FormControl error={!!props.error} sx={{ marginTop: '1em' }}>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select
        variant="standard"
        {...props.field}
        value={props.field.value || ''}
        label={props.label}
        labelId={props.label}
      >
        {props.values.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
      {!!props.error && <FormHelperText>{props.error?.message}</FormHelperText>}
    </FormControl>
  )
}
