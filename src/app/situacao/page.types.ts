import type { GetLegalPersonResponse } from '@/services/legal-person/legal-person.types'
import type { ListOrganizationsResponse } from '@/services/organization/organization.types'

export interface SituacaoPageState {
  load: {
    status: 'loading' | 'ready' | 'error'
    isRetrying: boolean
  }
  legalPerson: GetLegalPersonResponse | null
  logout: {
    isLoggingOut: boolean
  }
}

export interface PageViewProps {
  status: SituacaoPageState['load']['status']
  isRetrying: boolean
  organization: ListOrganizationsResponse | null
  legalPerson: GetLegalPersonResponse | null
  isLoggingOut: boolean
  onLogout: () => void
  onRetry: () => void
}
