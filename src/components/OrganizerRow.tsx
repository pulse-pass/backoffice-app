import { classNames } from '@/utils/class-name.handlers'

import { StatusBadge, type StatusBadgeStatus } from './StatusBadge'

interface OrganizerRowProps {
  name: string
  cnpj: string
  createdAt: string
  status: StatusBadgeStatus
  isSelected: boolean
  detailIds: string
  onSelect: () => void
}

export function OrganizerRow({
  name,
  cnpj,
  createdAt,
  status,
  isSelected,
  detailIds,
  onSelect,
}: OrganizerRowProps) {
  return (
    <button
      type="button"
      aria-expanded={isSelected}
      aria-controls={isSelected ? detailIds : undefined}
      className={classNames(
        'motion-color flex min-h-11 w-full cursor-pointer flex-wrap items-center justify-between gap-x-md gap-y-sm rounded-sm border-2 bg-bg-surface p-md text-left select-none',
        isSelected
          ? 'border-accent-selected'
          : 'border-border-subtle hover:border-border-strong hover:bg-fill-subtle',
      )}
      onClick={onSelect}
    >
      <span className="flex min-w-0 flex-col gap-2xs">
        <span className="title-s break-words text-text-primary">{name}</span>
        <span className="mono-s text-text-secondary">{cnpj}</span>
      </span>
      <span className="flex min-w-0 flex-wrap items-center gap-x-sm gap-y-xs">
        <span className="mono-s text-text-secondary">Criado em {createdAt}</span>
        <StatusBadge status={status} />
        <span
          className={classNames(
            'motion-color hidden size-6 shrink-0 items-center justify-center lg:flex rounded-sm',
            isSelected ? 'bg-bg-inverse text-text-inverse' : 'text-text-secondary',
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </span>
    </button>
  )
}
