import type { ChangeEvent } from 'react'

import type { GetInternalLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import type {
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
}

export interface PageViewProps {
  filters: OrganizersPageState['filters']
  list: OrganizersPageState['list']
  selectedOrganization: ListInternalOrganizationsResponse | null
  detail: OrganizersPageState['detail']
  onStatusChange: (status: OrganizationStatus) => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelect: (organization: ListInternalOrganizationsResponse) => void
  onLoadMore: () => void
  onRetryList: () => void
  onRetryDetail: () => void
}
