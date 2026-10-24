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

export interface ExpectedApiError {
  status: number
  code: string
}
