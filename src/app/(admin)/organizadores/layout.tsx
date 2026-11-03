import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = { title: 'Organizadores' }

export default function OrganizersLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
