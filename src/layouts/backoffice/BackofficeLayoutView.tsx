import { BackofficeNav } from '@/components/BackofficeNav'

import type { BackofficeLayoutViewProps } from './backoffice-layout.types'

export function BackofficeLayoutView({
  role,
  homePath,
  name,
  activePath,
  isLoggingOut,
  onLogout,
  children,
}: BackofficeLayoutViewProps) {
  return (
    <div className="md:grid md:grid-cols-[var(--sidebar-width)_1fr]">
      <BackofficeNav
        role={role}
        homePath={homePath}
        name={name}
        activePath={activePath}
        isLoggingOut={isLoggingOut}
        onLogout={onLogout}
      />
      <main className="min-w-0 px-md py-lg md:px-2xl md:py-2xl">{children}</main>
    </div>
  )
}
