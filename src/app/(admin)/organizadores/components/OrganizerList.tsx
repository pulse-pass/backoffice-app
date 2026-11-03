import { type ReactNode, useEffect, useRef } from 'react'

import { Button } from '@/components/Button'
import { EmptyState } from '@/components/EmptyState'
import { OrganizerRow } from '@/components/OrganizerRow'
import { getBadgeStatus } from '@/services/organization/organization.handlers'
import type {
  ListInternalOrganizationsResponse,
  OrganizationStatus,
} from '@/services/organization/organization.types'
import { classNames } from '@/utils/class-name.handlers'
import { formatCNPJ } from '@/utils/cnpj.handlers'
import { formatDate } from '@/utils/date.handlers'

interface OrganizerListProps {
  status: OrganizationStatus
  search: string
  items: ListInternalOrganizationsResponse[]
  isLoading: boolean
  isLoadingMore: boolean
  hasError: boolean
  hasMore: boolean
  selectedKey: string | null
  isDetailLoading: boolean
  detailIds: string
  inlineDetail: ReactNode
  onSelect: (organization: ListInternalOrganizationsResponse) => void
  onLoadMore: () => void
  onRetry: () => void
}

const getEmptyMessage = (status: OrganizationStatus, search: string): string => {
  if (search) return `Nenhuma empresa encontrada para “${search}”.`
  switch (status) {
    case 'APPROVED':
      return 'Nenhuma empresa aprovada.'
    case 'DELETED':
      return 'Nenhuma empresa removida.'
    case 'PENDING':
      return 'Nenhuma empresa pendente.'
    case 'REJECTED':
      return 'Nenhuma empresa reprovada.'
  }
}

export function OrganizerList({
  status,
  search,
  items,
  isLoading,
  isLoadingMore,
  hasError,
  hasMore,
  selectedKey,
  isDetailLoading,
  detailIds,
  inlineDetail,
  onSelect,
  onLoadMore,
  onRetry,
}: OrganizerListProps) {
  const selectedItemRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!selectedKey || isDetailLoading) return
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    selectedItemRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: isReducedMotion ? 'auto' : 'smooth',
    })
  }, [selectedKey, isDetailLoading])

  if (isLoading && items.length === 0) {
    return (
      <div role="status" className="sr-only">
        Carregando
      </div>
    )
  }

  if (hasError) {
    return (
      <EmptyState
        title="Não foi possível carregar as empresas."
        message="Confira a conexão e tente de novo."
        action={
          <Button variant="dark" size="s" onClick={onRetry}>
            Tentar de novo
          </Button>
        }
      />
    )
  }

  if (items.length === 0) {
    return <EmptyState message={getEmptyMessage(status, search.trim())} />
  }

  return (
    <div className="flex flex-col gap-md">
      <ul
        role="list"
        aria-busy={isLoading || undefined}
        inert={isLoading}
        className={classNames('flex flex-col gap-xs', isLoading && 'opacity-60')}
      >
        {items.map((organization) => {
          const isSelected = organization.organization_key === selectedKey
          return (
            <li
              key={organization.organization_key}
              ref={isSelected ? selectedItemRef : undefined}
              className="flex scroll-my-md flex-col gap-xs"
            >
              <OrganizerRow
                name={organization.name}
                cnpj={formatCNPJ(organization.document_number)}
                createdAt={formatDate(organization.created_at)}
                status={getBadgeStatus(organization.organization_status)}
                isSelected={isSelected}
                detailIds={detailIds}
                onSelect={() => onSelect(organization)}
              />
              {isSelected && <div className="lg:hidden">{inlineDetail}</div>}
            </li>
          )
        })}
      </ul>
      {hasMore && (
        <Button
          variant="outline"
          loading={isLoadingMore}
          loadingLabel="Carregando"
          disabled={isLoading}
          onClick={onLoadMore}
          className="w-full"
        >
          Carregar mais
        </Button>
      )}
    </div>
  )
}
