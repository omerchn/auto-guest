import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'

type LanguageSwitchTo = Record<
  string,
  { language: string; name: string } | undefined
>

const languageSwitchTo: LanguageSwitchTo = {
  he: {
    language: 'en',
    name: 'English',
  },
  en: {
    language: 'he',
    name: 'עברית',
  },
}

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const switchTo = languageSwitchTo[i18n.language]

  const handleClick = () => {
    if (!switchTo) return
    const { language } = switchTo
    i18n.changeLanguage(language)
    localStorage.setItem('lang', language)
  }

  return switchTo ? (
    <Button size="small" sx={{ textTransform: 'none' }} onClick={handleClick}>
      {switchTo.name}
    </Button>
  ) : null
}
