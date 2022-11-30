import { useState } from 'react'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import GuestModal, { Guest } from '../../components/GuestModal'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'

interface Props {
  onSubmit: (data: Guest) => void
  disabled: boolean
}

export default function SavedGuests(props: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [savedGuests, setSavedGuests] = useLocalStorage<Array<Guest>>('guests')

  const handleSubmit = (data: Guest) => {
    setSavedGuests([...(savedGuests || []), data])
  }

  const handleDelete = (guestId: string) => {
    setSavedGuests(savedGuests?.filter((guest) => guest.id !== guestId))
  }

  return (
    <div>
      {savedGuests?.map((guest) => (
        <Paper
          key={guest.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '.5em',
          }}
        >
          <IconButton onClick={() => handleDelete(guest.id)}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
          <div
            style={{
              margin: '0 1em',
              display: 'inline',
            }}
          >
            {guest.fullName}
          </div>
          <Button
            variant="contained"
            disabled={props.disabled}
            onClick={() => props.onSubmit(guest)}
            sx={{
              margin: '1em',
            }}
          >
            פתיחת פנייה
          </Button>
        </Paper>
      ))}
      <Button
        variant="outlined"
        onClick={() => setModalOpen(true)}
        sx={{
          margin: '.5em',
        }}
      >
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
