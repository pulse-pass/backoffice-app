'use client'

import { observer } from 'mobx-react-lite'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import type { SessionRole } from '@/services/session/session.types'
import { organizationStore } from '@/stores/organization.store'
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

  const isHydrated = sessionStore.isHydrated
  const sessionRole = sessionStore.role
  const areaPath = sessionStore.areaPath
  const isAreaOpen =
    sessionRole !== 'organizer' || organizationStore.organization?.organization_status === 'APPROVED'

  useEffect(() => {
    if (!isHydrated) return
    if (!sessionRole) router.replace('/login')
    else if (sessionRole !== role || !isAreaOpen) router.replace(areaPath)
  })

  const handleLogout = async () => {
    if (isLoggingOutRef.current) return
    isLoggingOutRef.current = true
    setState((current) => ({ ...current, logout: { isLoggingOut: true } }))
    await sessionStore.logout()
    router.replace('/login')
  }

  if (!isHydrated || sessionRole !== role || !isAreaOpen) {
    return (
      <div role="status" className="sr-only">
        Carregando
      </div>
    )
  }

  return (
    <BackofficeLayoutView
      role={role}
      homePath={areaPath}
      name={sessionStore.profile?.name}
      companyName={sessionStore.profile?.legal_person?.name}
      activePath={pathname}
      isLoggingOut={state.logout.isLoggingOut}
      onLogout={handleLogout}
    >
      {children}
    </BackofficeLayoutView>
  )
})
