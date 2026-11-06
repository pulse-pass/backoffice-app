import type { LegalPersonCompanyType } from '@/services/legal-person/legal-person.types'

export type PersonType = 'LEGAL' | 'NATURAL'

export interface NaturalPersonResponse {
  email: string
}

export interface PersonLegalPersonResponse {
  email: string
}

export interface GetPersonResponse {
  person_key: string
  person_type: PersonType
  name: string
  document_number: string
  created_at: string
  legal_person: PersonLegalPersonResponse | null
  natural_person: NaturalPersonResponse | null
}

export interface PersonPhoneNumberResponse {
  country_code: string
  area_code: string
  number: string
}

export interface PersonAddressResponse {
  legal_person_address_key: string
  postal_code: string
  street: string
  number: string
  complement: string | null
  neighborhood: string
}

export interface PersonInternalLegalPersonResponse extends PersonLegalPersonResponse {
  legal_person_company_type: LegalPersonCompanyType
  monthly_revenue_amount: number
  legal_person_address: PersonAddressResponse
}

export interface GetInternalPersonResponse {
  person_key: string
  person_type: PersonType
  name: string
  document_number: string
  created_at: string
  phone_numbers: PersonPhoneNumberResponse[]
  legal_person: PersonInternalLegalPersonResponse | null
  natural_person: NaturalPersonResponse | null
}
