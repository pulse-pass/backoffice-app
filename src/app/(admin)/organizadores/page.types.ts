import type { ChangeEvent, Ref } from 'react'

import type { GetInternalLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import type {
  ListInternalOrganizationRejectionReasonsResponse,
  ListInternalOrganizationsResponse,
  OrganizationStatus,
} from '@/services/organization/organization.types'

export interface OrganizersPageState {
  filters: {
    status: OrganizationStatus
    search: string
  }
  list: {
    items: ListInternalOrganizationsResponse[]
    page: number
    hasMore: boolean
    isLoading: boolean
    isLoadingMore: boolean
    hasError: boolean
    appliedSearch: string
    announcement: string
  }
  selection: {
    organizationKey: string | null
  }
  detail: {
    legalPerson: GetInternalLegalPersonResponse | null
    isLoading: boolean
    hasError: boolean
  }
  actions: {
    rejectionReason: string
    rejectionReasonError: string | null
    isConfirmingRemoval: boolean
    pendingAction: 'approve' | 'reject' | 'delete' | null
    pendingOrganizationKey: string | null
  }
  rejectionReasons: {
    items: ListInternalOrganizationRejectionReasonsResponse[]
    isLoading: boolean
    hasError: boolean
    hasLoaded: boolean
  }
}

export interface PageViewProps {
  filters: OrganizersPageState['filters']
  list: OrganizersPageState['list']
  selectedOrganization: ListInternalOrganizationsResponse | null
  detail: OrganizersPageState['detail']
  actions: OrganizersPageState['actions']
  rejectionReasons: OrganizersPageState['rejectionReasons']
  onStatusChange: (status: OrganizationStatus) => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelect: (organization: ListInternalOrganizationsResponse) => void
  onLoadMore: () => void
  onRetryList: () => void
  onRetryDetail: () => void
  onRejectionReasonChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onRetryRejectionReasons: () => void
  onApprove: () => void
  onReject: () => void
  onRequestRemoval: () => void
  onCancelRemoval: () => void
  onConfirmRemoval: () => void
  tabPanelRef: Ref<HTMLDivElement>
}

export interface OrganizerActionsProps {
  actions: OrganizersPageState['actions']
  rejectionReasons: OrganizersPageState['rejectionReasons']
  onRejectionReasonChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onRetryRejectionReasons: () => void
  onApprove: () => void
  onReject: () => void
  onRequestRemoval: () => void
  onCancelRemoval: () => void
  onConfirmRemoval: () => void
}
