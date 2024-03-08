import { useDisclosure } from '@mantine/hooks'
import { UiHeader, UiHeaderLink, UiLayout, UiThemeSwitch } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AppLayout({ children, links }: { children: ReactNode; links: UiHeaderLink[] }) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout header={<UiHeader opened={opened} toggle={toggle} links={links} profile={<UiThemeSwitch />} />}>
      {children}
    </UiLayout>
  )
}
