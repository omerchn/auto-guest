import { z } from 'zod'

// components
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const categorySchema = z.enum(['פניות בנושא מבקרים', 'פניות בנושא לינה'])

export type Category = z.infer<typeof categorySchema>

interface Props {
  category: Category | undefined
  onChange: React.Dispatch<Category | undefined>
}

export default function CategorySelect(props: Props) {
  return (
    <FormControl sx={{ marginBottom: '.5em' }}>
      <Select
        variant="standard"
        value={props.category || ''}
        onChange={(e) => props.onChange(categorySchema.parse(e.target.value))}
        label="category"
      >
        <MenuItem value={'פניות בנושא מבקרים' satisfies Category}>
          פניית ביקור
        </MenuItem>
        <MenuItem value={'פניות בנושא לינה' satisfies Category}>
          פניית לינה
        </MenuItem>
      </Select>
      {!props.category && <FormHelperText>יש לבחור סוג פנייה</FormHelperText>}
    </FormControl>
  )
}
