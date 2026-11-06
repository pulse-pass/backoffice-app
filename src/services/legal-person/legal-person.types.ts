export type LegalPersonCompanyType = 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION'

export interface LegalPersonPhoneRequest {
  country_code: string
  area_code: string
  number: string
}

export interface LegalPersonAddressRequest {
  postal_code: string
  street: string
  number: string
  complement?: string
  neighborhood: string
}

export interface LegalPersonCollaboratorRequest {
  collaborator_role: 'OWNER'
  document_number: string
  name: string
  email: string
  password: string
}

export interface CreateLegalPersonRequest {
  document_number: string
  name: string
  email: string
  phone_number: LegalPersonPhoneRequest
  legal_person_company_type: LegalPersonCompanyType
  monthly_revenue_amount: number
  legal_person_address: LegalPersonAddressRequest
  legal_person_collaborators: LegalPersonCollaboratorRequest[]
}

export interface CreateLegalPersonResponse {
  person_key: string
  document_number: string
  name: string
  email: string
}

export interface LegalPersonOwnerResponse {
  person_key: string
  name: string
  document_number: string
  email: string
}

export interface GetLegalPersonResponse {
  legal_person_key: string
  name: string
  document_number: string
  email: string
  created_at: string
  owner: LegalPersonOwnerResponse
}

export interface PersonPhoneNumberResponse {
  country_code: string
  area_code: string
  number: string
}

export interface LegalPersonAddressResponse {
  legal_person_address_key: string
  postal_code: string
  street: string
  number: string
  complement: string | null
  neighborhood: string
}

export interface GetInternalLegalPersonResponse {
  legal_person_key: string
  name: string
  document_number: string
  email: string
  phone_numbers: PersonPhoneNumberResponse[]
  legal_person_company_type: LegalPersonCompanyType
  monthly_revenue_amount: number
  legal_person_address: LegalPersonAddressResponse
  created_at: string
  owner: LegalPersonOwnerResponse
}
