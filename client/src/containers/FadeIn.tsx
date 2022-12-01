import { useId } from 'react'

// components
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'

interface Props {
  children: React.ReactNode
  duration: number
}

export default function FadeIn(props: Props) {
  const key = useId()
  return (
    <Fade appear in timeout={props.duration} key={key}>
      <Box>{props.children}</Box>
    </Fade>
  )
}
