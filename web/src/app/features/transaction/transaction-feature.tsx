import { Paper } from '@mantine/core'
import { UiContainer, UiStack } from '@pubkey-ui/core'
import { Keypair } from '@solana/web3.js'
import { useMemo } from 'react'
import { SendTransactionRequest } from './send-transaction-request'
import { TransactionRequestQR } from './transaction-request-qr'
import { useTransactionListener } from './use-transaction-listener'

export function TransactionFeature() {
  // Generate a public key that will be added to the transaction
  // so we can listen for it
  const reference = useMemo(() => Keypair.generate().publicKey, [])

  // Listen for transactions with the reference
  useTransactionListener(reference)

  return (
    <UiContainer>
      <UiStack align="center" gap="xl">
        {/* Button to send a transaction request */}
        <SendTransactionRequest reference={reference} />
        {/* QR code for a transaction request */}
        <Paper radius="lg" bg="white">
          <TransactionRequestQR reference={reference} />
        </Paper>
      </UiStack>
    </UiContainer>
  )
}
