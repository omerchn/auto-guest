import './i18n/i18n'
import { useTranslation } from 'react-i18next'

// pages
import HomePage from './pages/home'

// components
import Box from '@mui/material/Box'
import Header from './Header'

export default function App() {
  const { i18n } = useTranslation()
  document.body.style.direction = i18n.dir()
  document.body.dir = i18n.dir()
  document.dir = i18n.dir()

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <Box sx={{ padding: '1em' }}>
        <HomePage />
      </Box>
    </Box>
  )
}
