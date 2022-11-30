import { useState } from 'react'

// components
import Button from '@mui/material/Button'
import StudentModal, { Student } from '../../components/StudentModal'

interface Props {
  student: Student | undefined
  setStudent: React.Dispatch<React.SetStateAction<Student | undefined>>
}

export default function SavedStudent(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        עריכת פרטי סטודנט
      </Button>
      <StudentModal
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={(data) => props.setStudent(data)}
        defaultValues={props.student}
      />
    </div>
  )
}
