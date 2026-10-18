import axios from 'axios'

import { isErrorResponse } from './api-error.types'

const NETWORK_ERROR_MESSAGE = 'Não foi possível falar com o servidor. Verifique a conexão e tente novamente.'
const UNKNOWN_ERROR_MESSAGE = 'O servidor não conseguiu processar o pedido. Tente novamente em instantes.'

export const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error) || error.response === undefined) return NETWORK_ERROR_MESSAGE
  return isErrorResponse(error.response.data) ? error.response.data.message : UNKNOWN_ERROR_MESSAGE
}
