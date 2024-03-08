import { UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes, ThemeLink } from './app-routes'
import { SolanaProvider } from './features/solana/solana-provider'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <UiThemeProvider link={ThemeLink}>
        <SolanaProvider>
          <AppRoutes />
        </SolanaProvider>
      </UiThemeProvider>
    </QueryClientProvider>
  )
}
