import type { Metadata } from 'next'

import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Organizadores' }

export default function OrganizersPage() {
  return (
    <div className="flex flex-col gap-xl">
      <PageHeader eyebrow="Administração" title="Organizadores" />
      <EmptyState message="Nenhuma empresa organizadora para revisar ainda." />
    </div>
  )
}
