import { useState } from 'react'

// components
import GuestModal, { Guest } from '../../components/GuestModal'
import Button from '@mui/material/Button'

interface Props {
  onSubmit: (data: Guest) => void
}

export default function SavedGuests(props: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [savedGuests, SavedGuests] = useState([])

  const handleSubmit = (data: Guest) => {
    console.log(data)
  }

  return (
    <div>
      <Button variant="outlined" onClick={() => setModalOpen(true)}>
        הוספת אורח
      </Button>
      <GuestModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
