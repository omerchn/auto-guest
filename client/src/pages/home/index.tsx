// trpc
import { StartInput, trpc } from '../../lib/trpc'

// components
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import SolveCaptcha from './SolveCaptcha'
import SavedStartInput from './SavedStartInput'

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

export default function Home() {
  const { mutate, data, isLoading, error } = trpc.start.useMutation()

  const handleStart = () => {
    mutate(defaultData)
  }

  return (
    <div className="home-page">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : data ? (
        <SolveCaptcha id={data.id} captchaImgPath={data.captchaImgPath} />
      ) : (
        <>
          <SavedStartInput onSubmit={(data) => console.log(data)} />
          {/* <Button variant="contained" onClick={handleStart}>
            התחלת בקשה
          </Button> */}
        </>
      )}
    </div>
  )
}
