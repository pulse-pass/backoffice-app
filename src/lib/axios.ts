import axios, { type AxiosError } from 'axios'

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
const REFRESH_REJECTED_STATUSES = [400, 401]

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
  refreshing ??= current.refreshSession().finally(() => {
    refreshing = null
  })
  return refreshing
}

const isRefreshRejected = (error: unknown): boolean =>
  axios.isAxiosError(error) && REFRESH_REJECTED_STATUSES.includes(error.response?.status ?? 0)

api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const current = handlers
  const config = error.config
  if (
    !current ||
    !config ||
    error.response?.status !== 401 ||
    config.retried ||
    NO_REFRESH_PATHS.includes(config.url ?? '')
  ) {
    throw error
  }

  try {
    await refreshOnce(current)
  } catch (refreshError) {
    if (isRefreshRejected(refreshError)) current.onUnauthorized()
    throw error
  }
  return await api.request({ ...config, retried: true })
})

export const registerSessionHandlers = (value: SessionHandlers) => {
  handlers = value
}

export default api
