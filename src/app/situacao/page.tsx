'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { toast } from '@/lib/toast'
import { getApiErrorMessage } from '@/services/api/api-error.handlers'
import { legalPersonApi } from '@/services/legal-person/legal-person.api'
import type { GetLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import { organizationStore } from '@/stores/organization.store'
import { sessionStore } from '@/stores/session.store'

import type { SituacaoPageState } from './page.types'
import { PageView } from './PageView'

const INITIAL_STATE: SituacaoPageState = {
  load: { status: 'loading', isRetrying: false },
  legalPerson: null,
  logout: { isLoggingOut: false },
}

function SituacaoPage() {
  const router = useRouter()
  const [state, setState] = useState<SituacaoPageState>(INITIAL_STATE)
  const hasStartedRef = useRef(false)
  const isLoggingOutRef = useRef(false)
  const isHydrated = sessionStore.isHydrated
  const role = sessionStore.role
  const organization = organizationStore.organization
  const areaPath = sessionStore.areaPath

  const setLoad = (load: SituacaoPageState['load']) => {
    setState((current) => ({ ...current, load }))
  }

  const rejectWithoutAccess = async () => {
    await sessionStore.logout()
    toast.error('Esta conta não tem acesso ao backoffice.')
    router.replace('/login')
  }

  const loadStatus = async (shouldFetchOrganization: boolean) => {
    const legalPersonKey = sessionStore.profile?.legal_person?.legal_person_key
    if (!legalPersonKey) {
      await rejectWithoutAccess()
      return
    }
    let legalPerson: GetLegalPersonResponse
    try {
      const legalPersonRequest = legalPersonApi.getLegalPerson(legalPersonKey)
      const organizationRequest = shouldFetchOrganization
        ? organizationStore.fetchOrganization()
        : Promise.resolve()
      const [legalPersonResponse] = await Promise.all([legalPersonRequest, organizationRequest])
      legalPerson = legalPersonResponse
    } catch (error) {
      toast.error(getApiErrorMessage(error))
      setLoad({ status: 'error', isRetrying: false })
      return
    }
    if (!organizationStore.hasAccess) {
      await rejectWithoutAccess()
      return
    }
    setState((current) => ({ ...current, load: { status: 'ready', isRetrying: false }, legalPerson }))
  }

  useEffect(() => {
    if (!isHydrated) return
    if (role !== 'organizer' || organization?.organization_status === 'APPROVED') {
      router.replace(areaPath)
      return
    }
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    void loadStatus(!organization)
  })

  const handleRetry = () => {
    setLoad({ status: 'error', isRetrying: true })
    return loadStatus(true)
  }

  const handleLogout = async () => {
    if (isLoggingOutRef.current) return
    isLoggingOutRef.current = true
    setState((current) => ({ ...current, logout: { isLoggingOut: true } }))
    await sessionStore.logout()
    router.replace('/login')
  }

  return (
    <PageView
      status={state.load.status}
      isRetrying={state.load.isRetrying}
      organization={organization}
      legalPerson={state.legalPerson}
      isLoggingOut={state.logout.isLoggingOut}
      onLogout={handleLogout}
      onRetry={handleRetry}
    />
  )
}

export default observer(SituacaoPage)
