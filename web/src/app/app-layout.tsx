import { Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiHeader, UiHeaderLink, UiLayout, UiThemeSwitch } from '@pubkey-ui/core'
import { ReactNode } from 'react'
import { WalletIcon } from './features/solana/solana-provider'

export function AppLayout({ children, links }: { children: ReactNode; links: UiHeaderLink[] }) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout
      header={
        <UiHeader
          opened={opened}
          toggle={toggle}
          links={links}
          profile={
            <Group>
              <UiThemeSwitch />
              <WalletIcon />
            </Group>
          }
        />
      }
    >
      {children}
    </UiLayout>
  )
}
