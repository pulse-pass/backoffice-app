import axios from 'axios'

import type { ErrorResponse, ExpectedApiError } from './api-error.types'

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  if (typeof value !== 'object' || value === null || !('message' in value)) return false
  return typeof value.message === 'string'
}

export const isExpectedApiError = (error: unknown, expected: readonly ExpectedApiError[]): boolean => {
  if (!axios.isAxiosError(error) || error.response === undefined || !isErrorResponse(error.response.data)) {
    return false
  }
  const status = error.response.status
  const code = error.response.data.code
  return expected.some((item) => item.status === status && item.code === code)
}

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error) || error.response === undefined) {
    return 'Não foi possível falar com o servidor. Verifique a conexão e tente novamente.'
  }
  if (!isErrorResponse(error.response.data)) {
    return 'O servidor não conseguiu processar o pedido. Tente novamente em instantes.'
  }
  return error.response.data.message
}
