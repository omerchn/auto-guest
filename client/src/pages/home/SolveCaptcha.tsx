import { useTranslation } from 'react-i18next'
import { trpc, apiUrl } from '../../lib/trpc'
import MuiAlert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Loader from '../../components/general/Loader'
import Alert from '../../components/general/Alert'

interface Props {
  pageId: string
  captchaImgPath: string
  onReset: () => void
}

export default function SolveCaptcha(props: Props) {
  const { t } = useTranslation()
  const { mutate, isLoading, error, data } = trpc.solve.useMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const answer = (
      e.currentTarget.querySelector('#answer') as HTMLInputElement
    ).value
    mutate({ pageId: props.pageId, answer })
  }

  if (error) {
    return (
      <Alert severity="error" message={error.message} onReset={props.onReset} />
    )
  }

  if (isLoading) {
    return <Loader message={t('inserting_code')} />
  }

  if (data) {
    if (data.type === 'success') {
      return (
        <Alert
          severity="success"
          message={data.message}
          onReset={props.onReset}
        />
      )
    }
    if (data.type === 'failure') {
      return (
        <Alert
          severity="warning"
          message={data.message}
          onReset={props.onReset}
        />
      )
    }
  }

  return (
    <>
      <MuiAlert
        severity="warning"
        sx={{
          marginBottom: '1em',
        }}
      >
        {t('insert_security_code')}
      </MuiAlert>
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
          {t('button.send')}
        </Button>
      </form>
    </>
  )
}
