import { makeAutoObservable } from 'mobx'

import { organizationApi } from '@/services/organization/organization.api'
import type { ListOrganizationsResponse } from '@/services/organization/organization.types'

class OrganizationStore {
  organization: ListOrganizationsResponse | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get hasAccess() {
    return this.organization !== null && this.organization.organization_status !== 'DELETED'
  }

  setOrganization(organization: ListOrganizationsResponse | null) {
    this.organization = organization
  }

  clear() {
    this.organization = null
  }

  async fetchOrganization() {
    const response = await organizationApi.listOrganizations()
    if (response.data.length === 0) this.setOrganization(null)
    else this.setOrganization(response.data[0])
  }
}

export const organizationStore = new OrganizationStore()
