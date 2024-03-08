import { UiContainer, UiDashboardGrid } from '@pubkey-ui/core'
import { IconDashboard } from '@tabler/icons-react'

export function DashboardFeature() {
  return (
    <UiContainer>
      <UiDashboardGrid links={[{ to: '/dashboard', label: 'Dashboard', icon: IconDashboard }]} />
    </UiContainer>
  )
}
