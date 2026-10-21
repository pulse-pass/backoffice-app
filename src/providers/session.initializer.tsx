'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { registerSessionHandlers } from '@/lib/axios'
import { sessionApi } from '@/services/session/session.api'
import type { SessionResponse } from '@/services/session/session.types'
import { sessionStore } from '@/stores/session.store'

export function SessionInitializer() {
  const router = useRouter()

  useEffect(() => {
    registerSessionHandlers({
      getAccessToken: () => sessionStore.accessToken,
      getRefreshToken: () => sessionStore.refreshToken,
      refreshAccessToken: async () => {
        const sentRefreshToken = sessionStore.refreshToken
        if (!sentRefreshToken) return null
        let response: SessionResponse
        try {
          response = await sessionApi.refreshSession({ refresh_token: sentRefreshToken })
        } catch (error) {
          if (sessionStore.refreshToken !== sentRefreshToken) return null
          throw error
        }
        if (sessionStore.refreshToken !== sentRefreshToken) return null
        sessionStore.setSession(response)
        return response.access_token
      },
      onUnauthorized: () => {
        sessionStore.clear()
        router.replace('/login')
      },
    })
  }, [router])

  useEffect(() => {
    sessionStore.hydrate()
  }, [])

  return null
}
