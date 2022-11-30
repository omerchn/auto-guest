// trpc
import { trpc } from '../../lib/trpc'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
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
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error.message}</Alert>
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
