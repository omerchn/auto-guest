import './App.scss'
import { useGuestRequest } from './lib/react-query'

function App() {
  const {
    isStartLoading,
    startError,
    captchaImg,
    solveCaptcha,
    isSolveLoading,
    solveError,
    solveMsg,
  } = useGuestRequest()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const answer = (
      e.currentTarget.querySelector('#answer') as HTMLInputElement
    ).value
    solveCaptcha(answer)
  }
  return (
    <div className="App">
      {startError ? (
        <div style={{ color: 'red' }}>{(startError as any).message}</div>
      ) : isStartLoading ? (
        <div>loading...</div>
      ) : !solveError ? (
        <>
          <img src={captchaImg} />
          <form onSubmit={handleSubmit}>
            <input type="text" name="answer" id="answer" />
            <button type="submit">submit</button>
          </form>
        </>
      ) : null}
      {isSolveLoading && <div>solve loading...</div>}
      {solveError && (
        <div style={{ color: 'red' }}>
          {(solveError as any).response.data.err}
        </div>
      )}
      {solveMsg && (
        <div
          style={{
            color: 'green',
          }}
        >
          {solveMsg}
        </div>
      )}
    </div>
  )
}

export default App
