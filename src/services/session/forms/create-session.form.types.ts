import type { FieldErrors } from '@/utils/form.handlers'

export type CredentialsFormData = {
  document_number: string
  password: string
}

export type CreateSessionFormData = {
  credentials: CredentialsFormData
}

export type CreateSessionFormSection = keyof CreateSessionFormData

export type CreateSessionFieldKey = `credentials.${keyof CredentialsFormData}`

export type CreateSessionFieldErrors = FieldErrors<CreateSessionFieldKey>
