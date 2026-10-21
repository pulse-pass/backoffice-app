import type { SubmitEvent } from 'react'

import type {
  CreateLegalPersonFieldErrors,
  CreateLegalPersonFieldKey,
  CreateLegalPersonFormData,
} from '@/services/legal-person/forms/create-legal-person.form.types'

export interface CadastroPageState {
  form: {
    data: CreateLegalPersonFormData
    errors: CreateLegalPersonFieldErrors
    touched: Partial<Record<CreateLegalPersonFieldKey, boolean>>
  }
  submission: {
    isSubmitting: boolean
  }
}

export interface PageViewProps {
  formData: CreateLegalPersonFormData
  errors: CreateLegalPersonFieldErrors
  isSubmitting: boolean
  companyValid: boolean
  ownerValid: boolean
  onChange: (key: CreateLegalPersonFieldKey, value: string) => void
  onBlur: (key: CreateLegalPersonFieldKey) => void
  registerField: (key: CreateLegalPersonFieldKey) => (element: HTMLInputElement | null) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export interface SectionProps<T> {
  values: T
  errors: CreateLegalPersonFieldErrors
  onChange: (key: CreateLegalPersonFieldKey, value: string) => void
  onBlur: (key: CreateLegalPersonFieldKey) => void
  registerField: (key: CreateLegalPersonFieldKey) => (element: HTMLInputElement | null) => void
}
