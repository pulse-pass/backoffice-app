import type { PaginatedResponse } from '../api/api.types'
import { BaseApi } from '../api/base.api'
import type { ListOrganizationsResponse } from './organization.types'

export class OrganizationApi extends BaseApi {
  async listOrganizations(): Promise<PaginatedResponse<ListOrganizationsResponse>> {
    return await this.get<PaginatedResponse<ListOrganizationsResponse>>('/organizations')
  }
}

export const organizationApi = new OrganizationApi()
