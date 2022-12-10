import { GridLoader } from 'react-spinners'

// components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FadeIn from '../../containers/FadeIn'

interface Props {
  message?: string
}

export default function Loader(props: Props) {
  return (
    <FadeIn duration={1000}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {props.message && (
          <Typography
            sx={{
              color: '#3f51b5',
              marginBottom: '1em',
            }}
          >
            {props.message}
          </Typography>
        )}
        <GridLoader color="#3f51b5" />
      </Box>
    </FadeIn>
  )
}
