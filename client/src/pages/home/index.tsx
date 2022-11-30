// trpc
import { trpc } from '../../lib/trpc'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import HashLoader from 'react-spinners/HashLoader'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import LoopRounded from '@mui/icons-material/LoopRounded'
import SolveCaptcha from './SolveCaptcha'
import SavedGuests from './SavedGuests'
import SavedStudent from './SavedStudent'
import { Student } from '../../components/StudentModal'
import { Guest } from '../../components/GuestModal'
import CategorySelect from './CategorySelect'

export default function Home() {
  const [student, setStudent] = useLocalStorage<Student>('student')
  const [category, setCategory] = useLocalStorage<string>('category')
  const { mutate, data, isLoading, error, reset } = trpc.start.useMutation()

  const handleStart = (guest: Guest) => {
    if (!student) return
    mutate({
      student,
      guest,
      category: 'פניות בנושא מבקרים',
    })
  }

  return (
    <div className="home-page">
      {isLoading ? (
        <Fade appear in timeout={1000}>
          <Box>
            <HashLoader color="#3f51b5" />
          </Box>
        </Fade>
      ) : error ? (
        <>
          <Alert severity="error">{error.message}</Alert>
          <IconButton
            style={{
              margin: '.5em',
            }}
            onClick={reset}
          >
            <LoopRounded />
          </IconButton>
        </>
      ) : data ? (
        <SolveCaptcha
          id={data.id}
          captchaImgPath={data.captchaImgPath}
          reset={reset}
        />
      ) : (
        <>
          <SavedStudent student={student} setStudent={setStudent} />
          {student && (
            <>
              <CategorySelect category={category} setCategory={setCategory} />
              <SavedGuests
                onSubmit={handleStart}
                disabled={!student || !category}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
