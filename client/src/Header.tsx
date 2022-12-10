import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const headerAccent = '#0051ff82'

export default function Header() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '1em 0',
        backgroundColor: 'rgba(0, 133, 255, 0.02)',
      }}
    >
      <Typography
        sx={{
          marginBottom: '-.2em',
          color: 'transparent',
          '-webkit-text-stroke': `1px ${headerAccent}`,
        }}
        variant="h4"
      >
        האורח האוטומטי
      </Typography>
      <Typography
        sx={{
          color: headerAccent,
        }}
      >
        למעונות אוניברסיטת תל אביב
      </Typography>
    </Box>
  )
}
