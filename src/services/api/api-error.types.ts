export interface ExtraFieldError {
  field: string
  error: string
}

export interface ErrorResponse {
  title: string
  message: string
  code: string
  extra_fields: ExtraFieldError[]
}

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  if (typeof value !== 'object' || value === null || !('message' in value)) return false
  return typeof value.message === 'string'
}
