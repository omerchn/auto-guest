import { useEffect, useState } from 'react'

// trpc
import { StartInput, trpc } from '../../lib/trpc'

// components
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import SolveCaptcha from './SolveCaptcha'
import SavedGuests from './SavedGuests'
import SavedStudent from './SavedStudent'
import { Student } from '../../components/StudentModal'

// const StartInputSchema = z.object({
//   student: z.object({
//     id: z.string().length(9, 'על הת.ז להכיל 9 תווים'),
//     fullName: z.string(),
//     phone: z.string(),
//     dorm: z.enum(['מעונות איינשטיין', 'מעונות ברושים']),
//     building: z.string(),
//     floor: z.string(),
//     apartmentNumber: z.string(),
//     side: z.enum(['ימין', 'שמאל']),
//   }),
//   category: z.enum(['פניות בנושא מבקרים', 'פניות בנושא לינה']),
//   guest: z.object({
//     id: z.string().length(9, 'על הת.ז להכיל 9 תווים'),
//     fullName: z.string().min(1, 'נדרש להזין שם מלא'),
//     phone: z.string().min(1, 'נדרש להזין מספר טלפון'),
//   }),
// })

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
  const [student, setStudent] = useState<Student>()
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
          <SavedStudent student={student} setStudent={setStudent} />
          <SavedGuests onSubmit={(data) => console.log(data)} />
          {/* <Button variant="contained" onClick={handleStart}>
            התחלת בקשה
          </Button> */}
        </>
      )}
    </div>
  )
}
