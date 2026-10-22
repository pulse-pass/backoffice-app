'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { sessionStore } from '@/stores/session.store'

function Home() {
  const router = useRouter()
  const isHydrated = sessionStore.isHydrated
  const areaPath = sessionStore.areaPath

  useEffect(() => {
    if (!isHydrated) return
    router.replace(areaPath)
  })

  return (
    <div role="status" className="sr-only">
      Carregando
    </div>
  )
}

export default observer(Home)
