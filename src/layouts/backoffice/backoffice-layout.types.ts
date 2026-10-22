import type { ReactNode } from 'react'

import type { SessionRole } from '@/services/session/session.types'

export interface BackofficeLayoutState {
  logout: {
    isLoggingOut: boolean
  }
}

export interface BackofficeLayoutViewProps {
  role: SessionRole
  homePath: string
  name?: string
  companyName?: string
  activePath: string
  isLoggingOut: boolean
  onLogout: () => void
  children: ReactNode
}
