// components
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LoopRounded from '@mui/icons-material/LoopRounded'
import FadeIn from '../../../containers/FadeIn'

interface Props {
  message: string
  reset: () => void
}

export default function SuccessAlert(props: Props) {
  return (
    <FadeIn duration={200}>
      <Alert severity="success">{props.message}</Alert>
      <Tooltip title="אתחול">
        <IconButton
          style={{
            margin: '.5em',
          }}
          onClick={props.reset}
        >
          <LoopRounded />
        </IconButton>
      </Tooltip>
    </FadeIn>
  )
}
