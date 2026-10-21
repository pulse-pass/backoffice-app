import type { Metadata } from 'next'

import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Eventos' }

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-xl">
      <PageHeader eyebrow="Organizador" title="Eventos" />
      <EmptyState message="Nenhum evento por aqui ainda." />
    </div>
  )
}
