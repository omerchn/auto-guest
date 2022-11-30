import { useState } from 'react'

// components
import GuestModal, { Guest } from '../../components/GuestModal'
import Button from '@mui/material/Button'

interface Props {
  onSubmit: (data: Guest) => void
}

export default function SavedGuests(props: Props) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>start</Button>
      <GuestModal
        open={open}
        handleClose={handleClose}
        onSubmit={props.onSubmit}
      />
    </div>
  )
}
