import type { ReactNode } from 'react'

import { classNames } from '@/utils/class-name.handlers'

export type StatusBadgeStatus = 'pending' | 'approved' | 'rejected' | 'deleted'

interface StatusBadgeProps {
  status: StatusBadgeStatus
  inverse?: boolean
  className?: string
}

interface BadgeDefinition {
  icon: ReactNode
  label: string
  classes: string
  inverseClasses: string
}

const STATUSES: Record<StatusBadgeStatus, BadgeDefinition> = {
  pending: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="4" />
      </svg>
    ),
    label: 'Pendente',
    classes: 'border border-dashed border-border-strong bg-fill-subtle text-text-primary',
    inverseClasses: 'border border-dashed border-border-inverse-strong text-text-inverse',
  },
  approved: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m2.5 6.5 2.5 2.5 4.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Aprovado',
    classes: 'bg-bg-inverse text-text-inverse',
    inverseClasses: 'bg-bg-page text-text-primary',
  },
  rejected: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 3 6 6M9 3 3 9" strokeLinecap="round" />
      </svg>
    ),
    label: 'Reprovado',
    classes: 'bg-feedback-danger text-text-primary',
    inverseClasses: 'bg-feedback-danger text-text-primary',
  },
  deleted: {
    icon: (
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h6" strokeLinecap="round" />
      </svg>
    ),
    label: 'Removido',
    classes: 'border border-border-strong text-text-primary',
    inverseClasses: 'border border-border-inverse-strong text-text-inverse',
  },
}

export function StatusBadge({ status, inverse = false, className }: StatusBadgeProps) {
  const badge = STATUSES[status]

  return (
    <span
      className={classNames(
        'mono-eyebrow flex w-fit items-center gap-xs rounded-sm px-xs py-2xs',
        inverse ? badge.inverseClasses : badge.classes,
        className,
      )}
    >
      <span aria-hidden="true">{badge.icon}</span>
      {badge.label}
    </span>
  )
}
