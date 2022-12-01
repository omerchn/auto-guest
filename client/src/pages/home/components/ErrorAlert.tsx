import { TRPCClientErrorBase } from '@trpc/client'

// components
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LoopRounded from '@mui/icons-material/LoopRounded'
import FadeIn from '../../../containers/FadeIn'

interface Props {
  error: TRPCClientErrorBase<any>
  reset: () => void
}

export default function ErrorAlert(props: Props) {
  return (
    <FadeIn duration={200}>
      <Alert severity="error">{props.error.message}</Alert>
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
