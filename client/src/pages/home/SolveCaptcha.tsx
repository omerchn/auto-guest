import { trpc } from '../../lib/trpc'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
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
        <CircularProgress />
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
        <>
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
              שלח
            </Button>
          </form>
        </>
      )}
    </>
  )
}
