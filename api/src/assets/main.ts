import express from 'express'
import { transactionRoutes } from './transaction/transaction-routes'

const host = process.env.HOST ?? '0.0.0.0'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.use(express.json())

transactionRoutes(app)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
