import { Cluster, PublicKey } from '@solana/web3.js'
import express, { Request, Response } from 'express'
import { postImpl, PostRequest } from '../lib/transaction'

export function transactionRouter() {
  const router = express.Router()

  router.get('/', transactionGet())
  router.post('/', transactionPost())

  return router
}

export function transactionGet() {
  return async (req: Request, res: Response) => {
    return res.status(200).json({
      label: 'My Store',
      icon: 'https://solanapay.com/src/img/branding/Solanapay.com/downloads/gradient.svg',
    })
  }
}

export function transactionPost() {
  return async (req: Request, res: Response) => {
    const { account } = req.body as PostRequest
    if (!account) {
      return res.status(400).json({ error: 'No account provided' })
    }

    const network = req.query.network as Cluster
    if (!network) {
      return res.status(400).json({ error: 'No network provided' })
    }

    const reference = req.query.reference as string
    if (!reference) {
      return res.status(400).json({ error: 'No reference provided' })
    }

    try {
      console.log({
        account,
        network,
        reference,
      })
      const postResponse = await postImpl(network, new PublicKey(account), new PublicKey(reference))
      return res.status(200).json(postResponse)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Error creating transaction' })
    }
  }
}
