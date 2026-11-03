export type OrganizationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED'

export interface ListOrganizationsResponse {
  organization_key: string
  legal_person_key: string
  name: string
  document_number: string
  organization_status: OrganizationStatus
  organization_rejection_reason: string | null
  organization_rejection_reason_description: string | null
  created_at: string
  updated_at: string
}

export interface ListInternalOrganizationsParams {
  organization_status: OrganizationStatus
  name?: string
  document_number?: string
  page: number
  page_size: number
}

export interface ListInternalOrganizationsResponse {
  organization_key: string
  legal_person_key: string
  name: string
  document_number: string
  organization_status: OrganizationStatus
  organization_rejection_reason: string | null
  organization_rejection_reason_description: string | null
  created_at: string
  updated_at: string
}
