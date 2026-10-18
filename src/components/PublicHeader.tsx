import type { ReactNode } from 'react'

import { Logo } from './Logo'

interface PublicHeaderProps {
  action?: ReactNode
}

export function PublicHeader({ action }: PublicHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-md border-b border-border-subtle h-(--header-height) px-md md:px-3xl">
      <div className="flex items-center gap-md">
        <Logo />
        <span className="mono-eyebrow rounded-sm border border-border-strong px-xs py-2xs text-text-primary">
          Backoffice
        </span>
      </div>
      {action && <div className="hidden md:block">{action}</div>}
    </header>
  )
}
