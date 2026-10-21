import type { ReactNode } from 'react'

import { BackofficeLayout } from '@/layouts/backoffice/BackofficeLayout'

export default function OrganizerLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <BackofficeLayout role="organizer">{children}</BackofficeLayout>
}
