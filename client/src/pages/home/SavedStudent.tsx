import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import StudentModal from '../../components/StudentModal'
import { Student } from '../../components/StudentModal/types'

interface Props {
  student: Student | undefined
  onChange: (student: Student) => void
}

export default function SavedStudent(props: Props) {
  const { t } = useTranslation()
  const [ModalOpen, setModalOpen] = useState(false)

  const name = props.student?.fullName.split(' ')[0]

  return (
    <Box>
      {props.student ? (
        <Box
          sx={{
            margin: '1em 0',
            marginTop: '.5em',
          }}
        >
          <Box>{t('student.greeting', { name })}</Box>
          <Button onClick={() => setModalOpen(true)}>
            {t('student.edit_details')}
          </Button>
        </Box>
      ) : (
        <Box>
          <Button variant="outlined" onClick={() => setModalOpen(true)}>
            {t('student.insert_details')}
          </Button>
        </Box>
      )}
      <StudentModal
        open={ModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={props.onChange}
        defaultValues={props.student}
      />
    </Box>
  )
}
