import type { FieldErrors } from '@/utils/form.handlers'

export type CompanyFormData = {
  document_number: string
  name: string
  email: string
  phone: string
}

export type OwnerFormData = {
  name: string
  document_number: string
  email: string
  password: string
}

export type CreateLegalPersonFormData = {
  company: CompanyFormData
  owner: OwnerFormData
}

export type CreateLegalPersonFormSection = keyof CreateLegalPersonFormData

export type CreateLegalPersonFieldKey = `company.${keyof CompanyFormData}` | `owner.${keyof OwnerFormData}`

export type CreateLegalPersonFieldErrors = FieldErrors<CreateLegalPersonFieldKey>
