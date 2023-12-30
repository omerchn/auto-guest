import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
import { guestCategorySchema, maintenanceCategorySchema } from './schemas'
import { MaintenanceInput } from './MaintenanceInput'

export default function Home() {
  const { t } = useTranslation()
  const [student, setStudent] = useLocalStorage<Student>('student')
  const [category, setCategory] = useLocalStorage<Category>('category')
  const [maintenanceText, setMaintenanceText] = useState('')

  const parsedGuestCategory = guestCategorySchema.safeParse(category)
  const isGuestCategory = parsedGuestCategory.success

  const parsedMaintenanceCategory =
    maintenanceCategorySchema.safeParse(category)
  const isMaintenanceCategory = parsedMaintenanceCategory.success

  const {
    mutate: mutateGuest,
    data: guestData,
    isLoading: guestLoading,
    error: guestError,
    reset: guestReset,
  } = trpc.guest.useMutation()
  const {
    mutate: mutateMaintenance,
    data: maintenanceData,
    isLoading: maintenanceLoading,
    error: maintenanceError,
    reset: maintenanceReset,
  } = trpc.maintenance.useMutation()

  const error = (() => {
    if (isGuestCategory) return guestError
    if (isMaintenanceCategory) return maintenanceError
  })()

  const isLoading = (() => {
    if (isGuestCategory) return guestLoading
    if (isMaintenanceCategory) return maintenanceLoading
  })()

  const data = (() => {
    if (isGuestCategory) return guestData
    if (isMaintenanceCategory) return maintenanceData
  })()

  const handleGuestClick = (guest: Guest) => {
    if (!student) return
    if (!isGuestCategory) return
    mutateGuest({
      student,
      category: parsedGuestCategory.data,
      guest,
    })
  }

  const handleMaintenanceSubmit = () => {
    if (!student) return
    if (!isMaintenanceCategory) return
    mutateMaintenance({
      student,
      category: parsedMaintenanceCategory.data,
      text: maintenanceText,
    })
  }

  const handleReset = () => {
    guestReset()
    maintenanceReset()
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" message={error.message} onReset={handleReset} />
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box>
        <Loader message={t('filling_form')} />
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
              onReset={handleReset}
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
            {isGuestCategory ? (
              <SavedGuests
                onSubmit={handleGuestClick}
                disabled={!student || !category}
              />
            ) : isMaintenanceCategory ? (
              <MaintenanceInput
                text={maintenanceText}
                onChange={(text) => setMaintenanceText(text)}
                onSubmit={handleMaintenanceSubmit}
                disabled={!student || !category}
              />
            ) : null}
          </>
        )}
      </Box>
    </FadeIn>
  )
}
