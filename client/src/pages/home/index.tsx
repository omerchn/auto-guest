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
import CategorySelect, { Category } from './CategorySelect'
import { Guest } from '../../components/GuestModal'
import Loader from '../../components/general/Loader'
import FadeIn from '../../containers/FadeIn'
import ErrorAlert from './components/ErrorAlert'

export default function Home() {
  const [student, setStudent] = useLocalStorage<Student>('student')
  const [category, setCategory] = useLocalStorage<Category>('category')
  const { mutate, data, isLoading, error, reset } = trpc.start.useMutation()

  const handleStart = (guest: Guest) => {
    if (!student || !category) return
    mutate({
      student,
      category,
      guest,
    })
  }

  return (
    <Box>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorAlert error={error} reset={reset} />
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
