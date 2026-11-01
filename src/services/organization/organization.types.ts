export type OrganizationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED'

export interface ListOrganizationsResponse {
  organization_key: string
  legal_person_key: string
  name: string
  document_number: string
  status: OrganizationStatus
  rejection_reason: string | null
  rejection_reason_description: string | null
  created_at: string
  updated_at: string
}
