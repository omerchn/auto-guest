import express from 'express'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/captchas', express.static(__dirname + '/../captchas'))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
