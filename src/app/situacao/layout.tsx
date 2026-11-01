import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = { title: 'Situação do cadastro' }

export default function SituacaoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children
}
