'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { sessionStore } from '@/stores/session.store'

function Home() {
  const router = useRouter()
  useEffect(() => {
    if (!sessionStore.isHydrated) return
    router.replace(sessionStore.areaPath)
  })

  return (
    <div role="status" className="sr-only">
      Carregando
    </div>
  )
}

export default observer(Home)
