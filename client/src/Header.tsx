import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { LanguageSwitcher } from './components/LanguageSwitcher'

const headerAccent = '#0051ff82'

export default function Header() {
  const { t } = useTranslation()

  return (
    <>
      <LanguageSwitcher />
      <Box
        sx={{
          width: '100%',
          paddingBottom: '1em',
          backgroundColor: 'rgba(0, 133, 255, 0.02)',
        }}
      >
        <Typography
          sx={{
            marginBottom: '-.2em',
            color: 'transparent',
            WebkitTextStroke: `1px ${headerAccent}`,
          }}
          variant="h4"
        >
          {t('header.title')}
        </Typography>
        <Typography
          sx={{
            color: headerAccent,
          }}
        >
          {t('header.sub_title')}
        </Typography>
      </Box>
    </>
  )
}
