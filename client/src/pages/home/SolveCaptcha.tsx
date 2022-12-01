import { trpc } from '../../lib/trpc'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import Loader from '../../components/general/Loader'
import ErrorAlert from './components/ErrorAlert'
import SuccessAlert from './components/SuccessAlert'

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
        <Loader />
      ) : error ? (
        <ErrorAlert error={error} reset={props.reset} />
      ) : data ? (
        <SuccessAlert message={data} reset={props.reset} />
      ) : (
        <>
          <Alert
            severity="warning"
            sx={{
              marginBottom: '1em',
            }}
          >
            יש להזין קוד אבטחה
          </Alert>
          <img src={apiUrl + props.captchaImgPath} />
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
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
        </>
      )}
    </>
  )
}
