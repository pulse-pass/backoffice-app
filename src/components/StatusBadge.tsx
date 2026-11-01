import type { ReactNode } from 'react'

import { classNames } from '@/utils/class-name.handlers'

type StatusBadgeStatus = 'pending' | 'rejected'

interface StatusBadgeProps {
  status: StatusBadgeStatus
  className?: string
}

const STATUSES: Record<StatusBadgeStatus, { icon: ReactNode; label: string; classes: string }> = {
  pending: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="4" />
      </svg>
    ),
    label: 'Pendente',
    classes: 'border border-dashed border-border-inverse-strong text-text-inverse',
  },
  rejected: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 3 6 6M9 3 3 9" strokeLinecap="round" />
      </svg>
    ),
    label: 'Reprovado',
    classes: 'bg-feedback-danger text-text-primary',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const badge = STATUSES[status]

  return (
    <p
      className={classNames(
        'mono-eyebrow flex w-fit items-center gap-xs rounded-sm px-xs py-2xs',
        badge.classes,
        className,
      )}
    >
      <span aria-hidden="true">{badge.icon}</span>
      {badge.label}
    </p>
  )
}
