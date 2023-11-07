import { useState } from 'react'

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
  const [ModalOpen, setModalOpen] = useState(false)

  return (
    <Box>
      {props.student ? (
        <Box
          sx={{
            margin: '1em 0',
            marginTop: '.5em',
          }}
        >
          <Box>שלום, {props.student.fullName.split(' ')[0]}</Box>
          <Button onClick={() => setModalOpen(true)}>עריכת פרטי סטודנט</Button>
        </Box>
      ) : (
        <Box>
          <Button variant="outlined" onClick={() => setModalOpen(true)}>
            הזנת פרטי סטודנט
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
