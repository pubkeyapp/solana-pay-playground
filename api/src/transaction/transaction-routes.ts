import {
  Cluster,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import { Express } from 'express'

export function transactionRoutes(app: Express) {
  const base = '/api/transaction'

  // Response for GET request
  app.get(base, (req, res) => {
    console.log(`GET ${base}`, req.query)

    console.log('User-Agent', req.headers['user-agent'])
    return res.status(200).json({
      label: 'My Store',
      icon: 'https://solanapay.com/src/img/branding/Solanapay.com/downloads/gradient.svg',
    })
  })

  app.post(`${base}`, async (req, res) => {
    console.log(`POST ${base}`, req.body)
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
  })
}

export type PostRequest = {
  account: string
}

export type PostResponse = {
  transaction: string
  message: string
  network: Cluster
}

// Main body of the POST request, this returns the transaction
async function postImpl(network: Cluster, account: PublicKey, reference: PublicKey): Promise<PostResponse> {
  // Can also use a custom RPC here
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

  // Create any transaction
  const transaction = new Transaction({
    feePayer: account,
    blockhash,
    lastValidBlockHeight,
  })

  const transferInstruction = SystemProgram.transfer({
    fromPubkey: account,
    toPubkey: Keypair.generate().publicKey,
    lamports: LAMPORTS_PER_SOL / 1000,
  })

  // Add reference as a key to the instruction
  // This allows us to listen for this transaction
  transferInstruction.keys.push({
    pubkey: reference,
    isSigner: false,
    isWritable: false,
  })

  transaction.add(transferInstruction)

  // Serialize the transaction and convert to base64 to return it
  const serializedTransaction = transaction.serialize({
    requireAllSignatures: false, // account is a missing signature
  })
  const base64 = serializedTransaction.toString('base64')

  // Return the serialized transaction
  return {
    transaction: base64,
    message: 'Thank you for your purchase!',
    network,
  }
}
