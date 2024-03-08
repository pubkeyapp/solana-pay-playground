import express, { Request, Response } from 'express'
import { transactionRouter } from './features/transaction.routes'
import { uptimeRoute } from './features/uptime.route'

export function serverRouter(): express.Router {
  const router = express.Router()

  router.use('/transaction', transactionRouter())

  router.use('/uptime', uptimeRoute())
  router.use('*', (req: Request, res: Response) => res.status(404).send('Not Found'))

  return router
}
