import { AnchorProvider } from '@coral-xyz/anchor'
import { WalletModalProvider, WalletMultiButton, WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletError } from '@solana/wallet-adapter-base'
import {
  AnchorWallet,
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'

import { ReactNode, useCallback } from 'react'

export const WalletButton = WalletMultiButton
export const WalletIcon = WalletMultiIcon

export function SolanaProvider({ children }: { children: ReactNode }) {
  const endpoint = clusterApiUrl('devnet')

  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useAnchorProvider() {
  const { connection } = useConnection()
  const wallet = useWallet()

  return new AnchorProvider(connection, wallet as AnchorWallet, { commitment: 'confirmed' })
}
