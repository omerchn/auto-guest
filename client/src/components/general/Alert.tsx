// components
import MuiAlert, { AlertColor } from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LoopRounded from '@mui/icons-material/LoopRounded'
import FadeIn from '../../containers/FadeIn'

interface Props {
  message: string
  severity: AlertColor
  onReset?: () => void
}

export default function Alert(props: Props) {
  console.log(props)
  return (
    <FadeIn duration={200}>
      <MuiAlert severity={props.severity}>{props.message}</MuiAlert>
      {props.onReset && (
        <Tooltip title="אתחול">
          <IconButton
            style={{
              margin: '.5em',
            }}
            onClick={props.onReset}
          >
            <LoopRounded />
          </IconButton>
        </Tooltip>
      )}
    </FadeIn>
  )
}
