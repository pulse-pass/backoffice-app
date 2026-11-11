import type { SubmitEvent } from 'react'

import type {
  CreateLegalPersonFieldErrors,
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormData,
} from '@/services/legal-person/forms/create-legal-person.form.types'

export type FieldElement = HTMLInputElement | HTMLSelectElement

export type PostalCodeLookupStatus = 'idle' | 'loading' | 'found' | 'not_found' | 'unavailable'

export interface PostalCodeLookup {
  status: PostalCodeLookupStatus
  postalCode: string
}

export interface CadastroPageState {
  form: {
    data: CreateLegalPersonFormData
    errors: CreateLegalPersonFieldErrors
    touched: Partial<Record<CreateLegalPersonFieldKey, boolean>>
  }
  submission: {
    isSubmitting: boolean
  }
  postalCodeLookup: PostalCodeLookup
}

export interface PageViewProps {
  formData: CreateLegalPersonFormData
  errors: CreateLegalPersonFieldErrors
  isSubmitting: boolean
  postalCodeStatus: PostalCodeLookupStatus
  companyValid: boolean
  addressValid: boolean
  ownerValid: boolean
  onChange: (key: CreateLegalPersonFieldKey, value: string) => void
  onBlur: (key: CreateLegalPersonFieldKey) => void
  registerField: (key: CreateLegalPersonFieldKey) => (element: FieldElement | null) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export interface SectionProps<T> {
  values: T
  errors: CreateLegalPersonFieldErrors
  onChange: (key: CreateLegalPersonFieldKey, value: string) => void
  onBlur: (key: CreateLegalPersonFieldKey) => void
  registerField: (key: CreateLegalPersonFieldKey) => (element: FieldElement | null) => void
}
