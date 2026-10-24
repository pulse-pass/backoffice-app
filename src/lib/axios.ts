import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { API_ERRORS } from '@/services/api/api.errors'
import { isExpectedApiError } from '@/services/api/api-error.handlers'
import { SESSION_ERRORS } from '@/services/session/session.errors'

declare module 'axios' {
  interface AxiosRequestConfig {
    retried?: boolean
  }
}

export interface SessionHandlers {
  refreshSession: () => Promise<void>
  onUnauthorized: () => void
}

const NO_REFRESH_PATHS = ['/auth/login', '/auth/refresh']
const REFRESH_LOCK = 'pulsepass_session_refresh'

let handlers: SessionHandlers | null = null
let refreshing: Promise<void> | null = null

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'pt-BR',
  },
})

const refreshOnce = (current: SessionHandlers): Promise<void> => {
  refreshing ??= navigator.locks
    .request<void>(REFRESH_LOCK, () => current.refreshSession())
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

const isRefreshable = (config: InternalAxiosRequestConfig, error: AxiosError): boolean =>
  !config.retried &&
  !NO_REFRESH_PATHS.includes(config.url ?? '') &&
  isExpectedApiError(error, [API_ERRORS.unauthorized])

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const current = handlers
  const config = error.config
  if (!current || !config || !isRefreshable(config, error)) throw error

  try {
    await refreshOnce(current)
  } catch (refreshError) {
    if (isExpectedApiError(refreshError, SESSION_ERRORS.refreshSession.rejected)) current.onUnauthorized()
    throw error
  }
  return await api.request({ ...config, retried: true })
})

export const registerSessionHandlers = (value: SessionHandlers) => {
  handlers = value
}

export default api
