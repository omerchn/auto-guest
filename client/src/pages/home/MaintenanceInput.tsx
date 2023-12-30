import { useTranslation } from 'react-i18next'
import json2mq from 'json2mq'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Textarea from '@mui/material/TextareaAutosize'
import FadeIn from '../../containers/FadeIn'

const MAX_CHARS = 256

interface Props {
  text: string
  onChange: (text: string) => void
  onSubmit: () => void
  disabled: boolean
}

export const MaintenanceInput = (props: Props) => {
  const { t } = useTranslation()
  const charsLeft = Math.max(MAX_CHARS - props.text.length, 0)
  const maxCharsReached = charsLeft === 0
  const canSubmit = !!props.text && !props.disabled && !maxCharsReached

  const handleClick = () => {
    if (!canSubmit) return
    props.onSubmit()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (maxCharsReached && text.length >= MAX_CHARS) return
    props.onChange(text)
  }

  const isMobile = useMediaQuery(
    json2mq({
      maxWidth: 600,
    })
  )

  return (
    <FadeIn duration={500}>
      <Box sx={{ width: '30em', maxWidth: '90vw' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', paddingTop: '.5em' }}
        >
          <Textarea
            value={props.text}
            onChange={handleChange}
            disabled={props.disabled}
            placeholder={t('maintenance.description')}
            minRows={10}
            style={{ fontSize: '1em', padding: '.5em' }}
          />
          <Box
            sx={{
              color: '#999',
              fontSize: '.85em',
              padding: '.25em',
              textAlign: 'start',
            }}
          >
            {t('maintenance.chars_left', { chars: charsLeft })}
          </Box>
        </Box>
        <Button
          variant="contained"
          disabled={!canSubmit}
          onClick={handleClick}
          sx={{ margin: '.5em 0', width: isMobile ? '100%' : 'auto' }}
        >
          {t('button.open_request')}
        </Button>
      </Box>
    </FadeIn>
  )
}
