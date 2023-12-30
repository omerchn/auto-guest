import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// hooks
import { useLocalStorage } from '../../hooks/storage'

// components
import GuestModal, { Guest } from '../../components/GuestModal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import FadeIn from '../../containers/FadeIn'

interface Props {
  onSubmit: (data: Guest) => void
  disabled: boolean
}

export default function SavedGuests(props: Props) {
  const { t } = useTranslation()
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [modalOpen, setModalOpen] = useState(false)
  const [savedGuests, setSavedGuests] = useLocalStorage<Array<Guest>>('guests')

  const handleSubmit = (data: Guest) => {
    setSavedGuests([...(savedGuests || []), data])
  }

  const handleDelete = (guestId: string) => {
    setSavedGuests(savedGuests?.filter((guest) => guest.id !== guestId))
  }

  return (
    <FadeIn duration={500}>
      <Box>
        <Box
          ref={parent}
          sx={{
            width: 'calc(100vw - 2em)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {savedGuests?.map((guest) => (
            <Paper
              key={guest.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 'fit-content',
                margin: '.5em',
              }}
            >
              <IconButton onClick={() => handleDelete(guest.id)}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
              <Box
                style={{
                  margin: '0 1em',
                  display: 'inline',
                }}
              >
                {guest.fullName}
              </Box>
              <Button
                variant="contained"
                disabled={props.disabled}
                onClick={() => props.onSubmit(guest)}
                sx={{
                  margin: '1em',
                  whiteSpace: 'nowrap',
                }}
              >
                {t('button.open_request')}
              </Button>
            </Paper>
          ))}
        </Box>
        <Button
          variant="outlined"
          onClick={() => setModalOpen(true)}
          sx={{
            margin: '.5em',
          }}
        >
          {t('guest.add')}
        </Button>
        <GuestModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Box>
    </FadeIn>
  )
}
