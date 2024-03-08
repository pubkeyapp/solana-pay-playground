import { UiHeaderLink, UiNotFound, UiThemeLink } from '@pubkey-ui/core'
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AppLayout } from './app-layout'

import { DashboardFeature } from './features/dashboard/dashboard-feature'

const links: UiHeaderLink[] = [
  // Header links
  { label: 'Dashboard', link: '/dashboard' },
]
const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/dashboard', element: <DashboardFeature /> },
  { path: '*', element: <UiNotFound /> },
]
export function AppRoutes() {
  const router = useRoutes(routes)

  return <AppLayout links={links}>{router}</AppLayout>
}

export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>
