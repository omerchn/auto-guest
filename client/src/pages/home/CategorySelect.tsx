// components
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface Props {
  category: string | undefined
  setCategory: React.Dispatch<string | undefined>
}

export default function CategorySelect(props: Props) {
  return (
    <FormControl error={!props.category} sx={{ marginBottom: '.5em' }}>
      <Select
        variant="standard"
        value={props.category || ''}
        onChange={(e) => props.setCategory(e.target.value)}
        label="category"
      >
        <MenuItem value="פניות בנושא מבקרים">פניות בנושא מבקרים</MenuItem>
        <MenuItem value="פניות בנושא לינה">פניות בנושא לינה</MenuItem>
      </Select>
      {!props.category && <FormHelperText>יש להזין סוג פנייה</FormHelperText>}
    </FormControl>
  )
}
