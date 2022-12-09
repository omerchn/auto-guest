// components
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export type Category = 'פניות בנושא מבקרים' | 'פניות בנושא לינה'

interface Props {
  category: Category | undefined
  setCategory: React.Dispatch<Category | undefined>
}

export default function CategorySelect(props: Props) {
  return (
    <FormControl sx={{ marginBottom: '.5em' }}>
      <Select
        variant="standard"
        value={props.category || ''}
        onChange={(e) => props.setCategory(e.target.value as Category)}
        label="category"
      >
        <MenuItem value="פניות בנושא מבקרים">פניית ביקור</MenuItem>
        <MenuItem value="פניות בנושא לינה">פניית לינה</MenuItem>
      </Select>
      {!props.category && <FormHelperText>יש להזין סוג פנייה</FormHelperText>}
    </FormControl>
  )
}
