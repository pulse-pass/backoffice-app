import type { PaginatedResponse } from '../api/api.types'
import { BaseApi } from '../api/base.api'
import type {
  ListInternalOrganizationRejectionReasonsParams,
  ListInternalOrganizationRejectionReasonsResponse,
  ListInternalOrganizationsParams,
  ListInternalOrganizationsResponse,
  ListOrganizationsResponse,
  UpdateInternalOrganizationRequest,
  UpdateInternalOrganizationResponse,
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

  async updateInternalOrganization(
    organizationKey: string,
    data: UpdateInternalOrganizationRequest,
  ): Promise<UpdateInternalOrganizationResponse> {
    return await this.patch<UpdateInternalOrganizationResponse>(
      `/internal/organizations/${organizationKey}`,
      data,
    )
  }

  async deleteInternalOrganization(organizationKey: string): Promise<void> {
    await this.delete<void>(`/internal/organizations/${organizationKey}`)
  }

  async listInternalOrganizationRejectionReasons(
    params: ListInternalOrganizationRejectionReasonsParams,
  ): Promise<PaginatedResponse<ListInternalOrganizationRejectionReasonsResponse>> {
    return await this.get<PaginatedResponse<ListInternalOrganizationRejectionReasonsResponse>>(
      '/internal/organization_rejection_reasons',
      params,
    )
  }
}

export const organizationApi = new OrganizationApi()
