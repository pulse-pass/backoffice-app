import type { ListLegalPersonCollaboratorsResponse } from '@/services/legal-person-collaborator/legal-person-collaborator.types'
import type { ListOrganizationsResponse } from '@/services/organization/organization.types'
import type { GetPersonResponse } from '@/services/person/person.types'

export interface SituacaoPageState {
  load: {
    status: 'loading' | 'ready' | 'error'
    isRetrying: boolean
  }
  person: GetPersonResponse | null
  owner: ListLegalPersonCollaboratorsResponse | null
  logout: {
    isLoggingOut: boolean
  }
}

export interface PageViewProps {
  status: SituacaoPageState['load']['status']
  isRetrying: boolean
  organization: ListOrganizationsResponse | null
  person: GetPersonResponse | null
  owner: ListLegalPersonCollaboratorsResponse | null
  isLoggingOut: boolean
  onLogout: () => void
  onRetry: () => void
}
