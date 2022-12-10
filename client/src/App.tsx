// pages
import HomePage from './pages/home'

// components
import Box from '@mui/material/Box'
import Header from './Header'

export default function App() {
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
