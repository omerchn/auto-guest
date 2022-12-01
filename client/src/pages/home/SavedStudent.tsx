import { useState } from 'react'

// components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import StudentModal, { Student } from '../../components/StudentModal'

interface Props {
  student: Student | undefined
  setStudent: React.Dispatch<React.SetStateAction<Student | undefined>>
}

export default function SavedStudent(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      {props.student ? (
        <Box
          sx={{
            marginBottom: '1em',
          }}
        >
          <Box>שלום, {props.student.fullName.split(' ')[0]}</Box>
          <Button onClick={() => setOpen(true)}>עריכת פרטי סטודנט</Button>
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: '1em',
          }}
        >
          <Button variant="outlined" onClick={() => setOpen(true)}>
            הזנת פרטי סטודנט
          </Button>
        </Box>
      )}
      <StudentModal
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={(data) => props.setStudent(data)}
        defaultValues={props.student}
      />
    </Box>
  )
}
