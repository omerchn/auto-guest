// trpc
import { trpc } from '../../lib/trpc'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import Box from '@mui/material/Box'
import SolveCaptcha from './SolveCaptcha'
import SavedGuests from './SavedGuests'
import SavedStudent from './SavedStudent'
import { Student } from '../../components/StudentModal'
import { Guest } from '../../components/GuestModal'
import CategorySelect from './CategorySelect'
import Loader from '../../components/general/Loader'
import FadeIn from '../../containers/FadeIn'
import ResetAlert from './components/ResetAlert'

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
    <Box
      sx={{
        padding: '1em',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ResetAlert error={error} reset={reset} />
      ) : data ? (
        <FadeIn duration={500}>
          <Box>
            <SolveCaptcha
              id={data.id}
              captchaImgPath={data.captchaImgPath}
              reset={reset}
            />
          </Box>
        </FadeIn>
      ) : (
        <FadeIn duration={500}>
          <Box>
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
          </Box>
        </FadeIn>
      )}
    </Box>
  )
}
