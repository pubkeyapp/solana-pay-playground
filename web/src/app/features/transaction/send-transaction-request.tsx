import { Button } from '@mantine/core'
import { toastError, toastInfo } from '@pubkey-ui/core'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, TransactionSignature } from '@solana/web3.js'

import { useCallback } from 'react'

export function SendTransactionRequest({ reference }: { reference: PublicKey }) {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const networkConfiguration = 'devnet'

  const onClick = useCallback(async () => {
    if (!publicKey) {
      toastError({ message: `Wallet not connected!` })

      return
    }

    const signature: TransactionSignature = ''
    try {
      // Request the transaction from transaction request API
      const { data } = await fetch(
        `/api/transaction?network=${networkConfiguration}&reference=${reference.toBase58()}`,
        {
          method: 'post',
          body: JSON.stringify({
            account: publicKey.toString(),
          }),
        },
      ).then((res) => res.json())

      const response = data

      if ('error' in response) {
        console.error(`Failed to fetch transaction! ${response.error}`)
        toastError({ type: 'error', message: 'Failed to fetch transaction!', description: response.error })
        return
      }

      const message = response.message
      toastInfo({ type: 'info', message: 'Fetched transaction!', description: `message: ${message}` })

      // De-serialize the returned transaction
      const transaction = Transaction.from(Buffer.from(response.transaction, 'base64'))

      // Debug: log current and expected signers of the transaction
      // The API can return a partially signed transaction
      console.log('Fetched transaction', transaction)
      const currentSigners = [
        ...new Set(transaction.signatures.filter((k) => k.signature !== null).map((k) => k.publicKey.toBase58())),
      ]
      const expectedSigners = [
        ...new Set(
          transaction.instructions.flatMap((i) => i.keys.filter((k) => k.isSigner).map((k) => k.pubkey.toBase58())),
        ),
      ]
      console.log({ currentSigners, expectedSigners, transaction: response.transaction })

      // Send the transaction
      await sendTransaction(transaction, connection)
    } catch (error: any) {
      toastError({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature })
      console.error(`Transaction failed! ${error?.message}`, signature)
      return
    }
  }, [publicKey, networkConfiguration, reference, sendTransaction, connection])

  return (
    <Button onClick={onClick} disabled={!publicKey}>
      {publicKey ? 'Send with wallet' : 'Wallet not connected'}
    </Button>
  )
}
