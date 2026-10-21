'use client'

import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { sessionApi } from '@/services/session/session.api'
import type { SessionRole } from '@/services/session/session.types'
import { sessionStore } from '@/stores/session.store'

import type { BackofficeLayoutState } from './backoffice-layout.types'
import { BackofficeLayoutView } from './BackofficeLayoutView'

interface BackofficeLayoutProps {
  role: SessionRole
  children: ReactNode
}

const INITIAL_STATE: BackofficeLayoutState = {
  logout: { isLoggingOut: false },
}

export const BackofficeLayout = observer(function BackofficeLayout({
  role,
  children,
}: BackofficeLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<BackofficeLayoutState>(INITIAL_STATE)
  const isLoggingOutRef = useRef(false)

  useEffect(() => {
    if (!sessionStore.isHydrated) return
    if (!sessionStore.role) router.replace('/login')
    else if (sessionStore.role !== role) router.replace(sessionStore.areaPath)
  })

  const handleLogout = async () => {
    if (isLoggingOutRef.current) return
    isLoggingOutRef.current = true
    setState((current) => ({ ...current, logout: { isLoggingOut: true } }))
    if (sessionStore.refreshToken) {
      await sessionApi.deleteSession({ refresh_token: sessionStore.refreshToken }).catch(() => undefined)
    }
    sessionStore.clear()
    router.replace('/login')
  }

  if (!sessionStore.isHydrated || sessionStore.role !== role) {
    return (
      <div role="status" className="sr-only">
        Carregando
      </div>
    )
  }

  return (
    <BackofficeLayoutView
      role={role}
      homePath={sessionStore.areaPath}
      name={sessionStore.claims?.name}
      activePath={pathname}
      isLoggingOut={state.logout.isLoggingOut}
      onLogout={handleLogout}
    >
      {children}
    </BackofficeLayoutView>
  )
})
