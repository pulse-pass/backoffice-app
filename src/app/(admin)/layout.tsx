import type { ReactNode } from 'react'

import { BackofficeLayout } from '@/layouts/backoffice/BackofficeLayout'

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <BackofficeLayout role="admin">{children}</BackofficeLayout>
}
