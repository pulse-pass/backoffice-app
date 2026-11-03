import type { PaginatedResponse } from '../api/api.types'
import { BaseApi } from '../api/base.api'
import type {
  ListInternalOrganizationsParams,
  ListInternalOrganizationsResponse,
  ListOrganizationsResponse,
} from './organization.types'

export class OrganizationApi extends BaseApi {
  async listOrganizations(): Promise<PaginatedResponse<ListOrganizationsResponse>> {
    return await this.get<PaginatedResponse<ListOrganizationsResponse>>('/organizations')
  }

  async listInternalOrganizations(
    params: ListInternalOrganizationsParams,
  ): Promise<PaginatedResponse<ListInternalOrganizationsResponse>> {
    return await this.get<PaginatedResponse<ListInternalOrganizationsResponse>>(
      '/internal/organizations',
      params,
    )
  }
}

export const organizationApi = new OrganizationApi()
