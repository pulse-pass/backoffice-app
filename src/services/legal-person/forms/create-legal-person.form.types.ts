import type { FieldErrors } from '@/utils/form.handlers'

export type CompanyFormData = {
  document_number: string
  name: string
  email: string
  phone: string
  company_type: string
  monthly_revenue: string
}

export type AddressFormData = {
  postal_code: string
  street: string
  number: string
  complement: string
  neighborhood: string
}

export type OwnerFormData = {
  name: string
  document_number: string
  email: string
  password: string
}

export type CreateLegalPersonFormData = {
  company: CompanyFormData
  address: AddressFormData
  owner: OwnerFormData
}

export type CreateLegalPersonFormSection = keyof CreateLegalPersonFormData

export type CreateLegalPersonFieldKey =
  `company.${keyof CompanyFormData}` | `address.${keyof AddressFormData}` | `owner.${keyof OwnerFormData}`

export type CreateLegalPersonFieldErrors = FieldErrors<CreateLegalPersonFieldKey>
