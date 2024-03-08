import { UiContainer, UiDashboardGrid } from '@pubkey-ui/core'
import { IconDashboard, IconSend } from '@tabler/icons-react'

export function DashboardFeature() {
  return (
    <UiContainer>
      <UiDashboardGrid
        links={[
          { to: '/dashboard', label: 'Dashboard', icon: IconDashboard },
          { to: '/transaction', label: 'Transaction', icon: IconSend },
        ]}
      />
    </UiContainer>
  )
}
