import type { SubmitEvent } from 'react'

import type {
  CreateSessionFieldErrors,
  CreateSessionFieldKey,
  CreateSessionFormData,
} from '@/services/session/forms/create-session.form.types'

export interface LoginPageState {
  form: {
    data: CreateSessionFormData
    errors: CreateSessionFieldErrors
    touched: Partial<Record<CreateSessionFieldKey, boolean>>
  }
  submission: {
    isSubmitting: boolean
  }
}

export interface PageViewProps {
  formData: CreateSessionFormData
  errors: CreateSessionFieldErrors
  isSubmitting: boolean
  onChange: (key: CreateSessionFieldKey, value: string) => void
  onBlur: (key: CreateSessionFieldKey) => void
  registerField: (key: CreateSessionFieldKey) => (element: HTMLInputElement | null) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}
