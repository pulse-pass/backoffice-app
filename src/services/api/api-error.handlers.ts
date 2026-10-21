import axios from 'axios'

import { isErrorResponse } from './api-error.types'

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error) || error.response === undefined) {
    return 'Não foi possível falar com o servidor. Verifique a conexão e tente novamente.'
  }
  if (!isErrorResponse(error.response.data)) {
    return 'O servidor não conseguiu processar o pedido. Tente novamente em instantes.'
  }
  return error.response.data.message
}
