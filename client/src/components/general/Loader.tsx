import { HashLoader } from 'react-spinners'

// components
import Box from '@mui/material/Box'
import FadeIn from '../../containers/FadeIn'

export default function Loader() {
  return (
    <FadeIn duration={1000}>
      <Box
        sx={{
          margin: '1em 0',
        }}
      >
        <HashLoader color="#3f51b5" />
      </Box>
    </FadeIn>
  )
}
