// trpc
import { trpc } from '../../lib/trpc'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import Box from '@mui/material/Box'
import SolveCaptcha from './SolveCaptcha'
import SavedGuests from './SavedGuests'
import SavedStudent from './SavedStudent'
import CategorySelect, { Category } from './CategorySelect'
import { Guest } from '../../components/GuestModal'
import Loader from '../../components/general/Loader'
import FadeIn from '../../containers/FadeIn'
import Alert from '../../components/general/Alert'
import { Student } from '../../components/StudentModal/types'

export default function Home() {
  const [student, setStudent] = useLocalStorage<Student>('student')
  const [category, setCategory] = useLocalStorage<Category>('category')
  const { mutate, data, isLoading, error, reset } = trpc.open.useMutation()

  const handleStart = (guest: Guest) => {
    if (!student || !category) return
    mutate({
      student,
      category,
      guest,
    })
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" message={error.message} onReset={reset} />
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box>
        <Loader message="ממלא טופס, נא להמתין.." />
      </Box>
    )
  }

  if (data) {
    return (
      <Box>
        <FadeIn duration={500}>
          <Box>
            <SolveCaptcha
              pageId={data.pageId}
              captchaImgPath={data.captchaImgPath}
              onReset={reset}
            />
          </Box>
        </FadeIn>
      </Box>
    )
  }

  return (
    <FadeIn duration={500}>
      <Box>
        <SavedStudent student={student} onChange={setStudent} />
        {student && (
          <>
            <CategorySelect category={category} onChange={setCategory} />
            <SavedGuests
              onSubmit={handleStart}
              disabled={!student || !category}
            />
          </>
        )}
      </Box>
    </FadeIn>
  )
}
