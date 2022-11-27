import './App.scss'
import SolveCaptcha from './components/SolveCaptcha'
import { StartInput, trpc } from './lib/trpc'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { Button } from '@mui/material'

const defaultData: StartInput = {
  student: {
    id: '212638993',
    fullName: 'מרייה דרגילב',
    phone: '0523565333',
    dorm: 'מעונות איינשטיין',
    building: 'F',
    floor: '2',
    apartmentNumber: '105',
    side: 'ימין',
  },
  category: 'פניות בנושא מבקרים',
  guest: {
    id: '324173046',
    fullName: 'עומר כהן',
    phone: '0543395856',
  },
}

export default function App() {
  const { mutate, data, isLoading, error } = trpc.start.useMutation()

  const handleStart = () => {
    mutate(defaultData)
  }

  return (
    <div className="App">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : data ? (
        <SolveCaptcha id={data.id} captchaImgPath={data.captchaImgPath} />
      ) : (
        <Button variant="contained" onClick={handleStart}>
          התחלת בקשה
        </Button>
      )}
    </div>
  )
}
