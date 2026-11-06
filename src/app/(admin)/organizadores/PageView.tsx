import { useId } from 'react'

import { EmptyState } from '@/components/EmptyState'
import { PageHeader } from '@/components/PageHeader'
import { SearchField } from '@/components/SearchField'
import { Tabs } from '@/components/Tabs'
import type { OrganizationStatus } from '@/services/organization/organization.types'

import { OrganizerDetail } from './components/OrganizerDetail'
import { OrganizerList } from './components/OrganizerList'
import { StatusFilter } from './components/StatusFilter'
import type { PageViewProps } from './page.types'

const TABS_ID = 'organizers'

export function PageView({
  filters,
  list,
  selectedOrganization,
  detail,
  actions,
  rejectionReasons,
  onStatusChange,
  onSearchChange,
  onSelect,
  onLoadMore,
  onRetryList,
  onRetryDetail,
  onRejectionReasonChange,
  onRetryRejectionReasons,
  onApprove,
  onReject,
  onRequestRemoval,
  onCancelRemoval,
  onConfirmRemoval,
  tabPanelRef,
}: PageViewProps) {
  const sideDetailId = useId()
  const inlineDetailId = useId()
  const statusOptions: Array<{ value: OrganizationStatus; label: string }> = [
    { value: 'PENDING', label: 'Pendentes' },
    { value: 'APPROVED', label: 'Aprovados' },
    { value: 'REJECTED', label: 'Reprovados' },
    { value: 'DELETED', label: 'Removidos' },
  ]
  const renderDetail = (id: string) =>
    selectedOrganization && (
      <OrganizerDetail
        id={id}
        organization={selectedOrganization}
        person={detail.person}
        owner={detail.owner}
        isLoading={detail.isLoading}
        hasError={detail.hasError}
        actions={actions}
        rejectionReasons={rejectionReasons}
        onRetry={onRetryDetail}
        onRejectionReasonChange={onRejectionReasonChange}
        onRetryRejectionReasons={onRetryRejectionReasons}
        onApprove={onApprove}
        onReject={onReject}
        onRequestRemoval={onRequestRemoval}
        onCancelRemoval={onCancelRemoval}
        onConfirmRemoval={onConfirmRemoval}
      />
    )

  return (
    <div className="flex flex-col gap-xl">
      <div role="status" className="sr-only">
        {list.announcement}
      </div>
      <PageHeader eyebrow="Administração" title="Organizadores" />
      <div className="flex flex-col gap-md xl:flex-row xl:items-center xl:justify-between">
        <Tabs
          id={TABS_ID}
          label="Situação do cadastro"
          options={statusOptions}
          value={filters.status}
          className="hidden lg:flex"
          onChange={onStatusChange}
        />
        <div className="lg:hidden">
          <StatusFilter options={statusOptions} value={filters.status} onChange={onStatusChange} />
        </div>
        <SearchField
          label="Buscar por razão social ou CNPJ"
          placeholder="Razão social ou CNPJ"
          name="search"
          value={filters.search}
          className="xl:w-(--column-search)"
          onChange={onSearchChange}
        />
      </div>
      <div className="grid gap-lg lg:grid-cols-2 lg:items-start xl:grid-cols-[minmax(0,1fr)_var(--column-detail)]">
        <div
          ref={tabPanelRef}
          id={`${TABS_ID}-panel`}
          role="tabpanel"
          tabIndex={-1}
          aria-labelledby={`${TABS_ID}-tab-${filters.status}`}
        >
          <OrganizerList
            status={filters.status}
            search={list.appliedSearch}
            items={list.items}
            isLoading={list.isLoading}
            isLoadingMore={list.isLoadingMore}
            hasError={list.hasError}
            hasMore={list.hasMore}
            selectedKey={selectedOrganization?.organization_key ?? null}
            isDetailLoading={detail.isLoading}
            detailIds={`${sideDetailId} ${inlineDetailId}`}
            inlineDetail={renderDetail(inlineDetailId)}
            onSelect={onSelect}
            onLoadMore={onLoadMore}
            onRetry={onRetryList}
          />
        </div>
        <div className="hidden lg:block lg:self-stretch">
          {selectedOrganization && (
            <div
              tabIndex={0}
              className="sticky top-2xl max-h-[calc(100dvh-2*var(--spacing-2xl))] overflow-y-auto rounded-sm"
            >
              {renderDetail(sideDetailId)}
            </div>
          )}
          {!selectedOrganization && !list.hasError && list.items.length > 0 && (
            <EmptyState message="Selecione uma empresa para ver os dados." />
          )}
        </div>
      </div>
    </div>
  )
}
