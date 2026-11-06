import type { PaginatedResponse } from '@/services/api/api.types'
import { BaseApi } from '@/services/api/base.api'

import type {
  ListInternalLegalPersonCollaboratorsParams,
  ListInternalLegalPersonCollaboratorsResponse,
  ListLegalPersonCollaboratorsParams,
  ListLegalPersonCollaboratorsResponse,
} from './legal-person-collaborator.types'

export class LegalPersonCollaboratorApi extends BaseApi {
  async listLegalPersonCollaborators(
    legalPersonKey: string,
    params: ListLegalPersonCollaboratorsParams,
  ): Promise<PaginatedResponse<ListLegalPersonCollaboratorsResponse>> {
    return await this.get<PaginatedResponse<ListLegalPersonCollaboratorsResponse>>(
      `/legal_persons/${legalPersonKey}/collaborators`,
      params,
    )
  }

  async listInternalLegalPersonCollaborators(
    legalPersonKey: string,
    params: ListInternalLegalPersonCollaboratorsParams,
  ): Promise<PaginatedResponse<ListInternalLegalPersonCollaboratorsResponse>> {
    return await this.get<PaginatedResponse<ListInternalLegalPersonCollaboratorsResponse>>(
      `/internal/legal_persons/${legalPersonKey}/collaborators`,
      params,
    )
  }
}

export const legalPersonCollaboratorApi = new LegalPersonCollaboratorApi()
