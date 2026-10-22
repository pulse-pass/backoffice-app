'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { registerSessionHandlers } from '@/lib/axios'
import { sessionApi } from '@/services/session/session.api'
import { sessionStore } from '@/stores/session.store'

export function SessionInitializer() {
  const router = useRouter()

  useEffect(() => {
    registerSessionHandlers({
      refreshSession: () => sessionApi.refreshSession(),
      onUnauthorized: () => {
        const hadSession = sessionStore.profile !== null
        sessionStore.clear()
        if (hadSession) router.replace('/login')
      },
    })
  }, [router])

  useEffect(() => {
    sessionStore.hydrate()
  }, [])

  return null
}
