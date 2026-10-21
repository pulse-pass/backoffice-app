import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = { title: 'Cadastro' }

export default function RegistrationLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
