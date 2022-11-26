const express = require('express')
const cors = require('cors')
const { start, solveCaptchaAndSubmit } = require('./pup')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/start', async (_, res) => {
  const pupId = await start()
  try {
    res
      .status(200)
      .json({ id: pupId, captchaImgPath: `/captchas/${pupId}.png` })
  } catch (err) {
    res.status(400).json({ err })
  }
})

app.post('/solve', async (req, res) => {
  const { id, answer } = req.body
  try {
    const msg = await solveCaptchaAndSubmit(id, answer)
    res.status(200).json({ OK: true, msg })
  } catch (err) {
    res.status(400).json({ OK: false, err })
  }
})

app.use('/captchas', express.static(__dirname + '/../captchas'))

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
