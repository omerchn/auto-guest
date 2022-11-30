import { trpc } from '../../lib/trpc'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import HashLoader from 'react-spinners/HashLoader'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LoopRounded from '@mui/icons-material/LoopRounded'

interface Props {
  id: string
  captchaImgPath: string
  reset: () => void
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function SolveCaptcha(props: Props) {
  const { mutate, isLoading, error, data } = trpc.solve.useMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const answer = (
      e.currentTarget.querySelector('#answer') as HTMLInputElement
    ).value
    mutate({ id: props.id, answer })
  }

  return (
    <>
      {isLoading ? (
        <HashLoader color="#3f51b5" />
      ) : error ? (
        <>
          <Alert severity="error">{error.message}</Alert>
          <IconButton
            style={{
              margin: '.5em',
            }}
            onClick={props.reset}
          >
            <LoopRounded />
          </IconButton>
        </>
      ) : data ? (
        <Alert severity="success">{data}</Alert>
      ) : (
        <Fade appear in timeout={200}>
          <Box>
            <img src={apiUrl + props.captchaImgPath} />
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '.5em',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                id="answer"
                variant="standard"
                dir="ltr"
                sx={{
                  input: {
                    textAlign: 'center',
                  },
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                style={{
                  margin: '.5em',
                }}
              >
                שליחה
              </Button>
            </form>
          </Box>
        </Fade>
      )}
    </>
  )
}
