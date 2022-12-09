// pages
import HomePage from './pages/home'

// components
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

// styles
import './App.scss'

export default function App() {
  return (
    <Box className="App">
      <Alert
        severity="info"
        icon={false}
        sx={{
          width: 'fit-content',
          textAlign: 'center',
          margin: '1em 0',
        }}
      >
        <Typography color="primary">
          האורח האוטומטי למעונות אוניברסיטת תל אביב
        </Typography>
      </Alert>
      <HomePage />
    </Box>
  )
}
