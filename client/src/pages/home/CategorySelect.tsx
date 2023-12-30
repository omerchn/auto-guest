import { z } from 'zod'

// components
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { categorySchema } from './schemas'
import { useTranslation } from 'react-i18next'

export type Category = z.infer<typeof categorySchema>

interface Props {
  category: Category | undefined
  onChange: React.Dispatch<Category | undefined>
}

export default function CategorySelect(props: Props) {
  const { t } = useTranslation()

  return (
    <FormControl sx={{ marginBottom: '.5em' }}>
      <Select
        variant="standard"
        value={props.category || ''}
        onChange={(e) => props.onChange(categorySchema.parse(e.target.value))}
        label="category"
      >
        <MenuItem value={'פניות בנושא מבקרים' satisfies Category}>
          {t('category.visit')}
        </MenuItem>
        <MenuItem value={'פניות בנושא לינה' satisfies Category}>
          {t('category.sleep')}
        </MenuItem>
        <MenuItem value={'פניות בנושאי תחזוקה' satisfies Category}>
          {t('category.maintenance')}
        </MenuItem>
      </Select>
      {!props.category && <FormHelperText>{t('category.pick')}</FormHelperText>}
    </FormControl>
  )
}
